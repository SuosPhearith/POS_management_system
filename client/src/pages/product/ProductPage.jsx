import React, { useEffect, useState } from 'react';
import ProductTable from '../../components/product/ProductTable';
import { Button, Spin, message } from 'antd';
import Search from '../../components/search/Search';
import style from './ProductPage.module.css';
import ProuductModal from '../../components/product/ProductModal';
import errroHandler from '../../utils/ErrorHandler';
import request from '../../services/request';
import ListCategory from "../../components/product/ListCategory";
import CategoryModal from '../../components/category/CategoryModal';
import ProuductAddModal from '../../components/product/ProductAddModal';

const ProductPage = () => {
  const productForm = {
    id: "",
    box_code: "",
    unit_code: "",
    name: "",
    order_quantity: "",
    category_id: null,
    unit_quantity: "",
    purchase_price: "",
    product_price: "",
    unit_price: "",
    special_price: "",
    discount_per: "",
    reorder_level: "",
    description: "",
    file: "",
    supplier_id: null,
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryCategory, setSearchQueryCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(productForm)
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem('id');
  const categoryForm = { id: "", name: "", order: "", description: "", file: "" };
  const [categories, setCategories] = useState([]);
  const [isModalOpenCat, setIsModalOpenCat] = useState(false);
  const [formCat, setFormCat] = useState(categoryForm);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const productAddForm = {
    id: "",
    name: "",
    purchase_price: "",
    product_price: "",
    unit_price: "",
    special_price: "",
    order_quantity: "",
    supplier_id: null
  }
  const [formAdd, setFormAdd] = useState(productAddForm);

  useEffect(() => {
    getList();
    getListCategory();
  }, [])

  // GetList product function
  const getList = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "products/getList");
      setProducts(response.products);
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  }
  // GetList category function
  const getListCategory = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "categories/getList");
      setCategories(response.categories);
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  }

  // Insert function category
  const insertCategory = async () => {
    if (validateError()) return;
    try {
      setLoading(true);
      let categoryData = new FormData();
      categoryData.append("name", formCat.name);
      categoryData.append("description", formCat.description);
      categoryData.append("sort_order", formCat.order);
      categoryData.append("file", formCat.file);
      const response = await request("POST", "categories/create", categoryData);
      message.success(response.message);
      handleCancelFormCat();
      getListCategory();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  }

  const handleCancelFormCat = () => {
    setFormCat({ id: "", name: "", order: "", description: "", file: "" });
    setIsModalOpenCat(false);
  }
  // Insert function product
  const insertProduct = async () => {
    if (validateErrorInsert()) return;
    try {
      setLoading(true);
      let productData = new FormData();
      productData.append("box_code", form.box_code);
      productData.append("unit_code", form.unit_code);
      productData.append("name", form.name);
      productData.append("order_quantity", form.order_quantity);
      productData.append("category_id", form.category_id);
      productData.append("unit_quantity", form.unit_quantity);
      productData.append("purchase_price", form.purchase_price);
      productData.append("product_price", form.product_price);
      productData.append("unit_price", form.unit_price);
      productData.append("special_price", form.special_price);
      productData.append("discount_per", form.discount_per);
      productData.append("description", form.description);
      productData.append("supplier_id", form.supplier_id);
      productData.append("user_id", id);
      productData.append("file", form.file);
      const response = await request("POST", "products/create", productData);
      message.success(response.message);
      handleCancelForm();
      getList();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  }

  // Update function product
  const updateProduct = async () => {
    if (validateErrorInsert()) return;
    try {
      setLoading(true);
      let productData = new FormData();
      productData.append("box_code", form.box_code);
      productData.append("unit_code", form.unit_code);
      productData.append("name", form.name);
      productData.append("category_id", form.category_id);
      productData.append("purchase_price", form.purchase_price);
      productData.append("product_price", form.product_price);
      productData.append("unit_price", form.unit_price);
      productData.append("special_price", form.special_price);
      productData.append("discount_per", form.discount_per);
      productData.append("description", form.description);
      productData.append("supplier_id", form.supplier_id);
      productData.append("user_id", id);
      productData.append("file", form.file);
      const response = await request("PUT", `products/update/${form.id}`, productData);
      message.success(response.message);
      handleCancelForm();
      getList();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  }
  // Handle update 
  const handleUpdate = (
    id,
    box_code,
    unit_code,
    name,
    category_id,
    purchase_price,
    product_price,
    unit_price,
    special_price,
    discount_per,
    description,
    user_id,
    image
  ) => {
    setForm(
      {
        id: id,
        box_code: box_code,
        unit_code: unit_code,
        name: name,
        category_id: category_id,
        purchase_price: purchase_price,
        product_price: product_price,
        unit_price: unit_price,
        special_price: special_price,
        discount_per: discount_per,
        description: description,
        file: image,
      }
    )
    setIsModalOpen(true);
  }

  // Delete function

  const handleDelete = async (id) => {
    if (!id) {
      message.error("មិនមានID!");
      return;
    }
    try {
      setLoading(true);
      const response = await request("DELETE", `products/delete/${id}`);
      message.success(response.message);
      handleCancelForm();
      getList();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  }

  // Add stock product function

  const addStock = async () => {
    if (validateAdd()) return;
    try {
      setLoading(true);
      let addData = {
        purchase_price: formAdd.purchase_price,
        product_price: formAdd.product_price,
        unit_price: formAdd.unit_price,
        special_price: formAdd.special_price,
        order_quantity: formAdd.order_quantity,
        supplier_id: formAdd.supplier_id,
        user_id: id,
      }
      const response = await request("PUT", `products/add/${formAdd.id}`, addData);
      message.success(response.message);
      handleCancelFormAdd();
      getList();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  }

  // Handle add product
  const handleAdd = (id, name, purchase_price, product_price, unit_price, special_price) => {
    setFormAdd(
      {
        id,
        name,
        purchase_price,
        product_price,
        unit_price,
        special_price,
        order_quantity: "",
        supplier_id: null
      }
    )
    setIsModalOpenAdd(true);
  }


  // handle submit
  const handleSubmit = () => {
    if (!form.id || form.id === "") {
      insertProduct();
    } else {
      updateProduct();
    }
  }
  // handle submit
  const handleSubmitCat = () => {
    insertCategory();
  }

  // handle submit add
  const handleSubmitAdd = () => {
    addStock();
  }

  // handle cancel form 
  const handleCancelForm = () => {
    setIsModalOpen(false);
    setForm({
      id: "",
      box_code: "",
      unit_code: "",
      name: "",
      order_quantity: "",
      category_id: null,
      unit_quantity: "",
      purchase_price: "",
      product_price: "",
      unit_price: "",
      special_price: "",
      discount_per: "",
      reorder_level: "",
      description: "",
      file: "",
      supplier_id: null,
    });
  }

  // handle cancel form add
  const handleCancelFormAdd = () => {
    setIsModalOpenAdd(false);
    setFormAdd(
      {
        id: "",
        name: "",
        purchase_price: "",
        product_price: "",
        unit_price: "",
        special_price: "",
        order_quantity: "",
        supplier_id: null
      }
    )
  }

  // Handle search query change
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  }

  // Handle search category change
  const handleSearchCategory = (e) => {
    const { value } = e.target;
    setSearchQueryCategory(value);
  }

  // Filter product based on search query
  const filteredProducts = products.filter(product => {
    const name = String(product.name);
    const ProductId = String(product.id);
    const description = String(product.description);
    const catName = String(product.category_name);
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      catName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ProductId.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }
  );
  // filter category base on search query
  const filteredCategory = categories.filter(category =>
    category.name.toLowerCase().includes(searchQueryCategory.toLowerCase())
  );

  const handleSearchByCategory = (name) => {
    setSearchQuery(name);
  }

  const validateError = () => {
    if (!formCat.name || formCat.name.length < 3) {
      message.error("សូមបញ្ចូលឈ្មោះប្រភេទទំនិញយ៉ាងតិច៣អក្សរ!");
      return true;
    }
  }
  const validateErrorInsert = () => {
    if (id === "") {
      message.error("សូមបញ្ជូលកូដ!");
      return true;
    }
    if (form.name === "" || form.name < 3) {
      message.error("សូមបញ្ជូលឈ្មោះលើសពី៣អក្សរ!");
      return true;
    }
    if (!form.id || form.id === "") {
      if (form.order_quantity === "") {
        message.error("សូមបញ្ជូលចំនួនទិញចូលដំ!");
        return true;
      }
      if (form.unit_quantity === "") {
        message.error("សូមបញ្ជូលចំនួនទំនិញក្នុងមួយដំ!");
        return true;
      }
      if (form.supplier_id === "" || form.supplier_id === null) {
        message.error("សូមជ្រើសរើសអ្នកនាំចូល!");
        return true;
      }
    }
    if (form.purchase_price === "") {
      message.error("សូមបញ្ជូលតម្លៃទិញចូលក្នុងមួយដំ!");
      return true;
    }
    if (form.product_price === "") {
      message.error("សូមបញ្ជូលតម្លៃលក់ដំ!");
      return true;
    }
    if (form.unit_price === "") {
      message.error("សូមបញ្ជូលតម្លៃលក់រាយ!");
      return true;
    }
    if (form.special_price === "") {
      message.error("សូមបញ្ជូលតម្លៃលក់ពិសេស!");
      return true;
    }
    if (form.category_id === "" || form.category_id === null) {
      message.error("សូមជ្រើសរើសប្រភេទទំនិញ!");
      return true;
    }

    return false;
  }

  const validateAdd = () => {
    if (formAdd.name === "" || formAdd.name < 3) {
      message.error("សូមបញ្ជូលឈ្មោះលើសពី៣អក្សរ!");
      return true;
    }
    if (id === "") {
      message.error("សូមបញ្ជូលកូដ!");
      return true;
    }
    if (formAdd.order_quantity === "") {
      message.error("សូមបញ្ជូលចំនួនទិញចូលបន្ថែម!");
      return true;
    }
    if (formAdd.purchase_price === "") {
      message.error("សូមបញ្ជូលតម្លៃទិញចូលក្នុងមួយដំ!");
      return true;
    }
    if (formAdd.product_price === "") {
      message.error("សូមបញ្ជូលតម្លៃលក់ដំ!");
      return true;
    }
    if (formAdd.unit_price === "") {
      message.error("សូមបញ្ជូលតម្លៃលក់រាយ!");
      return true;
    }
    if (formAdd.special_price === "") {
      message.error("សូមបញ្ជូលតម្លៃលក់ពិសេស!");
      return true;
    }
    if (formAdd.supplier_id === "" || formAdd.supplier_id === null) {
      message.error("សូមជ្រើសរើសអ្នកនាំចូល!");
      return true;
    }
    return false;
  }
  return (
    <Spin spinning={loading}>
      <main className={style.main}>
        <div className={style.header}>
          <div className={style.search}>
            <Search searchQuery={searchQueryCategory} handleSearch={handleSearchCategory} />
            <Search searchQuery={searchQuery} handleSearch={handleSearch} />
          </div>
          <div className={style.create}>
            <Button className={style.btn} type='primary' onClick={() => setIsModalOpenCat(true)} >បង្កើតប្រភេទទំនិញថ្មី</Button>
            <Button className={style.btn} type='primary' onClick={() => setIsModalOpen(true)} >បង្កើតទំនិញថ្មី</Button>
          </div>
        </div>
        <div style={{ width: "100%", display: 'flex', justifyContent: "space-between" }}>
          <div style={{ width: '15%' }}>
            <ListCategory categories={filteredCategory} handleSearchByCategory={handleSearchByCategory} />
          </div>
          <div style={{ width: "83%" }}>
            <ProductTable
              categories={filteredProducts}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              handleAdd={handleAdd}
            />
          </div>
        </div>
      </main>
      <ProuductModal
        isModalOpen={isModalOpen}
        handleSubmit={handleSubmit}
        handleCancelForm={handleCancelForm}
        form={form}
        setForm={setForm}
      />
      <CategoryModal
        isModalOpen={isModalOpenCat}
        handleSubmit={handleSubmitCat}
        handleCancelForm={handleCancelFormCat}
        form={formCat}
        setForm={setFormCat}
      />
      <ProuductAddModal
        isModalOpenAdd={isModalOpenAdd}
        handleSubmitAdd={handleSubmitAdd}
        handleCancelFormAdd={handleCancelFormAdd}
        formAdd={formAdd}
        setFormAdd={setFormAdd}
      />
    </Spin>
  );
}

export default ProductPage;
