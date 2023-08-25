const db = require("../config/db");
const executeQuery = db.executeQuery;
const asyncHandler = require("express-async-handler");
const currentDate = require("../utils/currentDate");

const createProduct = asyncHandler(async (req, res, next) => {

    const connection = await db.pool.getConnection();
    try {
        const { box_code, unit_code, name, order_quantity, category_id, unit_quantity, purchase_price, product_price, unit_price, special_price, discount_per, reorder_level, description, image, supplier_id, user_id } = req.body;
        if (!supplier_id) {
            res.status(400);
            throw new Error("Please input supplier_id");
        }
        if (!user_id) {
            res.status(400);
            throw new Error("Please input user_id");
        }
        if (!category_id) {
            res.status(400);
            throw new Error("Please input category");
        }
        if (!name) {
            res.status(400);
            throw new Error("Please input name!");
        }
        if (!order_quantity) {
            res.status(400);
            throw new Error("Please input quantity!");
        }
        if (!unit_quantity) {
            res.status(400);
            throw new Error("Please input unit_quantity!");
        }
        if (!product_price || !unit_price || !special_price || !purchase_price) {
            res.status(400);
            throw new Error("Please input price for sale!");
        }
        const queryCheck = "select * from products where name = ?";
        const check = await executeQuery(queryCheck, [name]);
        if (check.length > 0) {
            res.status(400);
            throw new Error("This name is already exist!");
        }
        // Insert into two table at once if query 1 success but query 2 not success is not commit all
        await connection.beginTransaction();
        // Insert into table products
        const queryCreateProduct = "insert into products (box_code, unit_code, name, order_quantity, quantity, category_id, unit_quantity"
            + ", purchase_price, product_price, unit_price, special_price, discount_per, reorder_level, description, image, user_id)"
            + " values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        const quantity = order_quantity * unit_quantity;
        const valuesProduct = [box_code, unit_code, name, order_quantity, quantity, category_id, unit_quantity, purchase_price, product_price, unit_price, special_price, discount_per, reorder_level, description, image, user_id];
        const [productResult] = await connection.query(queryCreateProduct, valuesProduct);
        // Retrieve the auto-generated product_id
        const product_id = productResult.insertId;
        if (!product_id) {
            res.status(400);
            throw new Error("Please input product_id");
        }
        // Insert into table recieceproducts
        const sub_total = order_quantity * purchase_price;
        const queryCreateRecieveProduct = "insert into receiveproducts (product_id, quantity, purchase_price, unit_price, product_price, special_price, sub_total, supplier_id, user_id) values (?,?,?,?,?,?,?,?,?)";
        const valuesRecieveProduct = [product_id, order_quantity, purchase_price, unit_price, product_price, special_price, sub_total, supplier_id, user_id];
        await connection.query(queryCreateRecieveProduct, valuesRecieveProduct);
        // commit this code to database
        await connection.commit();
        res.json({
            message: "Product created successfully!"
        })

    } catch (error) {
        await connection.rollback();
        next(error);
    } finally {
        connection.release();
    }
})

const getListProduct = asyncHandler(async (req, res, next) => {
    try {
        const queryGetList = "select * from products";
        const getList = await executeQuery(queryGetList);
        res.json({
            products: getList
        })
    } catch (error) {
        next(error);
    }
})

const updateProduct = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const { box_code, unit_code, name, category_id, purchase_price, product_price, unit_price, special_price, discount_per, reorder_level, description, image, user_id } = req.body;
        if (!user_id) {
            res.status(400);
            throw new Error("Please input user_id");
        }
        if (!category_id) {
            res.status(400);
            throw new Error("Please input category!");
        }
        if (!name) {
            res.status(400);
            throw new Error("Please input name!");
        }
        if (!product_price || !unit_price || !special_price || !purchase_price) {
            res.status(400);
            throw new Error("Please input price for sale!");
        }
        const queryCheck = "select * from products where id = ?";
        const check = await executeQuery(queryCheck, [id]);
        if (check.length === 0) {
            res.status(400);
            throw new Error("ID not found!");
        }
        const queryCheckName = "select * from products where name = ? and id != ?";
        const checkName = await executeQuery(queryCheckName, [name, id]);
        if (checkName.length > 0) {
            res.status(400);
            throw new Error("Name is already exist!");
        }
        const queryUpdate = "update products set  box_code = ?, unit_code = ?, name = ?, category_id = ?,"
            + " purchase_price = ?, product_price = ?, unit_price = ?, special_price = ?, discount_per = ?, reorder_level = ?,"
            + " description = ?, image = ?, updated_date = ?, user_id = ? where id = ?";
        const values = [box_code, unit_code, name, category_id, purchase_price, product_price, unit_price, special_price,
            discount_per, reorder_level, description, image, currentDate, user_id, id];

        const update = await executeQuery(queryUpdate, values);

        if (update.affectedRows > 0) {
            res.json({
                message: "Product updated successfully"
            })
        } else {
            res.status(500);
        }
    } catch (error) {
        next(error);
    }
})

const deleteProduct = asyncHandler(async (req, res, next) => {
    try {
        const id = req.params.id;
        const queryCheck = "select * from products where id = ?";
        const check = await executeQuery(queryCheck, [id]);
        if (check.length === 0) {
            res.status(400);
            throw new Error("ID not found!");
        }
        const queryRemove = "delete from products where id = ?";
        const remove = await executeQuery(queryRemove, [id]);
        if (remove) {
            res.json({
                message: "Products remove successfully!"
            })
        }
    } catch (error) {
        next(error);
    }
})

const addStock = asyncHandler(async (req, res, next) => {
    const connection = await db.pool.getConnection();
    try {
        const id = req.params.id;
        const {order_quantity,purchase_price, unit_price, product_price, special_price, supplier_id, user_id} = req.body;
        const queryCheck = "select * from products where id = ?";
        const check = await executeQuery(queryCheck, [id]);
        if (check.length === 0) {
            res.status(400);
            throw new Error("ID not found!");
        }

        const querySelect = "select order_quantity, quantity, unit_quantity from products where id = ?";
        const select = await executeQuery(querySelect,[id]);
        const old_order_quantity = select[0].order_quantity;
        const old_unit_quantity = select[0].unit_quantity;
        const old_quantity = select[0].quantity;

        const new_order_quantity = parseInt(old_order_quantity) + parseInt(order_quantity);
        const new_quantity = old_quantity + ( order_quantity * old_unit_quantity );
        const new_sub_total = order_quantity * purchase_price;
        
        await connection.beginTransaction();

        const valuesUpdate = [ new_order_quantity, new_quantity, purchase_price, unit_price, product_price, special_price, currentDate, user_id, id];
        const queryUpate = "update products set order_quantity = ?, quantity = ?, purchase_price = ?, unit_price = ?, product_price = ?, special_price = ?, updated_date = ?, user_id = ? where id = ?";
        await connection.query(queryUpate,valuesUpdate);

        const queryCreateRecieveProduct = "insert into receiveproducts (product_id, quantity, purchase_price, unit_price, product_price, special_price, sub_total, supplier_id, user_id) values (?,?,?,?,?,?,?,?,?)";
        const valuesRecieveProduct = [id, order_quantity, purchase_price, unit_price, product_price, special_price, new_sub_total, supplier_id, user_id];
        await connection.query(queryCreateRecieveProduct, valuesRecieveProduct);

        await connection.commit();

        res.json({
            message: "Stock added successfully!"
        })


    } catch (error) {
        await connection.rollback();
        next(error);
    } finally {
        connection.release();
    }
})


module.exports = {
    createProduct,
    getListProduct,
    updateProduct,
    deleteProduct,
    addStock
}