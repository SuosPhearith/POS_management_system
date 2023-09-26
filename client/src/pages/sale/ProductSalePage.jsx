import React, { useEffect, useState, useRef } from "react";
import style from "./SalePage.module.css";
import Search from "../../components/search/Search";
import request from "../../services/request";
import errorhandler from "../../utils/ErrorHandler";
import SaleTable from "../../components/sale/SaleTable";
import ListProduct from "../../components/sale/ListProduct";
import ListCategory from "../../components/sale/ListCategory";
import CreaeteCustomerModal from "../../components/sale/CreaeteCustomerModal";
import InputNumber from "../../components/usefull/NumericInput";
import InputNumberFloat from "../../components/usefull/NumbericInputFloat";
import { Button, Input, Select, Spin, Radio, message, Checkbox } from "antd";

const SalePage = () => {
  // globle
  const inputNumberRef = useRef();
  const [categories, setCategories] = useState([]);
  const [customerId, setCustomerId] = useState(3);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [totalRiel, setTotalRiel] = useState(0);
  const [totalDollar, setTotalDollar] = useState(0);
  const [items, setItems] = useState({
    user_id: localStorage.getItem("id"),
    customer_id: customerId,
    payment_type_id: "1",
    saleType: "product",
    debt: false,
    deposit: 0,
    description: "",
  });
  const [item, setItem] = useState({
    product_id: "",
    unit_code: "",
    name: "",
    cashType: "",
    quantity: "",
    price: "",
    description: "",
  });
  const [saleItems, setSaleItems] = useState([]);
  useEffect(() => {
    getListCustomer();
    getListCategory();
    getListProduct();
    getExchangeRate();
  }, []);
  // Handle search query change
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };
  // Filter product based on search query
  const filteredProducts = products.filter((product) => {
    const name = String(product.name);
    const ProductId = String(product.id);
    const description = String(product.description);
    const catName = String(product.category_name);
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      catName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ProductId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  // Handle search by category
  const handleSearchByCategory = (name) => {
    setSearchQuery(name);
  };

  useEffect(() => {
    console.log("inputNumberRef:", inputNumberRef);
    inputNumberRef?.current?.focus();
  }, [saleItems]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddItems();
    }
  };
  const totalRielTrimmed = () => {
    return parseFloat(totalRiel).toFixed(2);
  };
  const totalDollarTrimmed = () => {
    return parseFloat(totalDollar).toFixed(2);
  };
  const onChange = (e) => {
    setItems({
      ...items,
      debt: e.target.checked,
    });
  };
  // End globle

  // exchangeRate
  const [exchangeRate, setExchangeRate] = useState("");
  const getExchangeRate = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "exchangeRate/get");
      setExchangeRate(response.data[0].riel);
    } catch (error) {
      errorhandler(error);
    } finally {
      setLoading(false);
    }
  };
  // End excahngerate

  // Customer
  const [customers, setcustomers] = useState([]);
  const [isModalOpenCustomer, setIsModalOpenCustomer] = useState(false);
  const [customerForm, setCustomerForm] = useState({
    id: "",
    name: "",
    contact: "",
    address: "",
    file: "",
  });
  // get list customer
  const getListCustomer = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "customers/getList");
      const customers = response.customers;
      const data = customers.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      }));
      setcustomers(data);
    } catch (error) {
      errorhandler(error);
    } finally {
      setLoading(false);
    }
  };
  // handle Cancel Form Customer
  const handleCancelFormCustomer = () => {
    setCustomerForm({
      id: "",
      name: "",
      contact: "",
      address: "",
      file: "",
    });
    setIsModalOpenCustomer(false);
  };
  // Insert custmer function
  const insertCustomer = async () => {
    if (validateCustomer()) return;
    try {
      setLoading(true);
      let custmerData = new FormData();
      custmerData.append("name", customerForm.name);
      custmerData.append("contact", customerForm.contact);
      custmerData.append("address", customerForm.address);
      custmerData.append("file", customerForm.file);
      const response = await request("POST", "customers/create", custmerData);
      message.success(response.message);
      getListCustomer();
      handleCancelFormCustomer();
    } catch (error) {
      errorhandler(error);
    } finally {
      setLoading(false);
    }
  };
  // handle Submit Customer
  const handleSubmitCustomer = () => {
    // code
    insertCustomer();
  };
  const validateCustomer = () => {
    if (!customerForm.name || customerForm.name.length < 2) {
      message.error("សូមបញ្ចូលឈ្មោះលើសពី២អក្សរ!");
      return true;
    }
    if (!customerForm.contact || customerForm.contact.length < 8) {
      message.error("សូមបញ្ជាក់លេខទំនាក់ទំនងម្តងទៀត!");
      return true;
    }
    return false;
  };
  // End customer

  // GetList category function
  const getListCategory = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "categories/getList");
      setCategories(response.categories);
    } catch (error) {
      errorhandler(error);
    } finally {
      setLoading(false);
    }
  };
  // GetList product function
  const getListProduct = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "products/getList");
      setProducts(response.products);
    } catch (error) {
      errorhandler(error);
    } finally {
      setLoading(false);
    }
  };
  const getProduct = (
    product_id,
    unit_code,
    name,
    cashType,
    unit_price,
    product_price,
    special_price,
    description
  ) => {
    inputNumberRef.current.focus();
    if (item.name !== name) {
      setItem({ ...item, quantity: 0 });
    }
    setItem((prevItem) => ({
      ...prevItem,
      product_id: product_id,
      unit_code: unit_code,
      name: name,
      cashType: cashType,
      quantity: prevItem.quantity + 1,
      price: product_price,
      description: description,
    }));
  };
  const findLabel = () => {
    const valueToFind = String(customerId);
    const selectedCategory = customers.find(
      (item) => item.value === valueToFind
    );
    return selectedCategory ? selectedCategory.label : null; // Return the label if found, otherwise an empty string
  };
  const handleSelectChangeCustomer = (value) => {
    setCustomerId(value);
  };
  const selectStyle = {
    fontSize: "15px",
    width: "250px",
  };

  const radioStyle = {
    marginTop: "15px",
    marginBottom: "15px",
  };

  // add items
  const handleClearItem = () => {
    setItem({
      product_id: "",
      unit_code: "",
      name: "",
      cashType: "",
      quantity: "",
      price: "",
    });
  };
  const handleAddItems = () => {
    if (validateAddItems()) return;
    setSaleItems([
      ...saleItems,
      { ...item, sub_total: item.price * item.quantity },
    ]);
    handleClearItem();
  };
  useEffect(() => {
    const calculateTotals = () => {
      let totalRiel = 0;
      let totalDollar = 0;
      let hasError = false; // Flag to track errors

      saleItems.forEach((item) => {
        if (item.cashType === "riel") {
          totalRiel += item.price * item.quantity;
        } else if (item.cashType === "dollar") {
          totalDollar += item.price * item.quantity;
        } else {
          hasError = true; // Set the flag to true for error
        }
      });

      if (hasError) {
        message.error("ទំនិញមានបញ្ហា!");
      }

      let totalKhmer = totalRiel + totalDollar * exchangeRate;
      let totalUsa = totalDollar + totalRiel / exchangeRate;
      const roundedNumber = totalUsa.toFixed(2);
      setTotalDollar(roundedNumber);
      setTotalRiel(totalKhmer);
    };

    calculateTotals();
  }, [saleItems, exchangeRate]);
  // delete function
  const deleteItem = (id) => {
    // Use filter to create a new array without the item to delete
    const updatedSaleItems = saleItems.filter((item) => item.product_id !== id);
    // Update the state with the new array
    setSaleItems(updatedSaleItems);
  };
  // handle delete item
  const handleDeleteItems = (id) => {
    deleteItem(id);
  };
  // handle edit item
  const handleEditItems = (record) => {
    const { product_id } = record;
    setItem(record);
    deleteItem(product_id);
  };

  // check product is already added
  const validateAddItems = () => {
    if (item.cashType !== "riel" && item.cashType !== "dollar") {
      message.error("ទំនិញមានបញ្ហា!");
      return true;
    }
    if (item.quantity === "" || item.quantity <= 0) {
      message.error("សូមបញ្ជាក់ការបញ្ចូល!");
      return true;
    }
    if (item.price === "" || item.price < 0) {
      message.error("សូមបញ្ជាក់ការបញ្ចូល!");
      return true;
    }
    if (item.product_id === "" || item.name === "") {
      message.error("សូមបញ្ជាក់ការបញ្ចូល!");
      return true; // Validation fails, return true
    }

    if (saleItems.some((value) => value.product_id === item.product_id)) {
      message.error("ទំនិញបានបញ្ចូលម្តងហើយ");
      return true; // Validation fails, return true
    }

    return false; // Validation succeeds, return false
  };

  // end of add items

  // creaate invoice
  const handleCreateInvoice = async () => {
    if (validateCreateInvoice()) return;
    try {
      setLoading(true);
      let productData = {
        user_id: items.user_id,
        customer_id: customerId,
        payment_type_id: items.payment_type_id,
        saleType: items.saleType,
        debt: items.debt,
        deposit: items.deposit,
        description: items.description,
        products: saleItems,
      };
      const response = await request("POST", "sales/create", productData);
      message.success(response.message);
      handleCancelForm();
    } catch (error) {
      errorhandler(error);
    } finally {
      setLoading(false);
    }
  };
  const handleCancelForm = () => {
    setItems({
      user_id: localStorage.getItem("id"),
      customer_id: customerId,
      payment_type_id: "1",
      saleType: "unit",
      debt: false,
      deposit: 0,
      description: "",
    });
    setItem({
      product_id: "",
      unit_code: "",
      name: "",
      cashType: "",
      quantity: "",
      price: "",
      description: "",
    });
    setCustomerId(3);
    setSaleItems([]);
  };
  const validateCreateInvoice = () => {
    if (saleItems.length === 0) {
      message.error("សូមបញ្ចូលទំនិញ!");
      return true;
    }
    if (!items.user_id) {
      message.error("សូមបញ្ចូលអ្នកលក់!");
      return true;
    }
    if (!items.customer_id) {
      message.error("សូមបញ្ចូលអ្នកទិញ!");
      return true;
    }
    if (!items.payment_type_id) {
      message.error("សូមបញ្ចូលប្រភេទបងប្រាក់!");
      return true;
    }
    if (!items.saleType) {
      message.error("សូមបញ្ចូលប្រភេទលក់!");
      return true;
    }
    if (items.deposit > totalDollar) {
      message.error("សូមបញ្ចូលប្រាក់កក់អោយបាបត្រឹមត្រូវ!");
      return true;
    }
    return false;
  };
  // end of create invoice
  return (
    <>
      <Spin spinning={loading}>
        <main className={style.main}>
          <div className={style.header}>
            <div className={style.information}>
              <h3>POS / លក់ដំ</h3>
            </div>
            <div className={style.search}>
              <Search searchQuery={searchQuery} handleSearch={handleSearch} />
            </div>
          </div>
          <div className={style.saleWrapper}>
            <div className={style.saleSide}>
              <div className={style.customer}>
                <div className={style.customerName}>
                  <div>ឈ្មោះអតិថិជន:</div>
                  <div>
                    <Select
                      value={findLabel()}
                      onChange={handleSelectChangeCustomer}
                      showSearch
                      style={selectStyle}
                      placeholder="ជ្រើសរើសឈ្មោះអតិថិជន"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={customers}
                    />
                  </div>
                </div>
                <div className={style.newCustomer}>
                  <Button
                    onClick={() => setIsModalOpenCustomer(true)}
                    type="primary"
                  >
                    បង្កើតអតិថិជនថ្មី
                  </Button>
                </div>
              </div>
              <div className={style.productDetail}>
                <div className={style.productDetailWrapper}>
                  <div className={style.detailContailer}>
                    <div className={style.inforProduct}>បាកូដទំនិញ:</div>
                    <Input
                      ref={inputNumberRef}
                      value={item.unit_code}
                      className={style.inputAnt}
                      placeholder="បាកូដទំនិញ"
                      onPressEnter={handleKeyPress}
                    />
                  </div>
                  <div className={style.detailContailer}>
                    <div className={style.inforProduct}>ឈ្មោះទំនិញ:</div>
                    <Input
                      value={item.name}
                      className={style.inputAnt}
                      placeholder="ឈ្មោះទំនិញ"
                    />
                  </div>
                  <div className={style.detailContailer}>
                    <div className={style.inforProduct}>តម្លៃទំនិញ:</div>
                    <InputNumberFloat
                      value={item.price}
                      onChange={(e) =>
                        setItem({ ...item, price: e.target.value })
                      }
                      className={style.inputAnt}
                      placeholder="តម្លៃទំនិញ"
                      onPressEnter={handleKeyPress}
                    />
                  </div>
                  <div className={style.detailContailer}>
                    <div className={style.inforProduct}>ចំនួនទិញ:</div>
                    <InputNumber
                      value={item.quantity}
                      onChange={(e) =>
                        setItem({ ...item, quantity: e.target.value })
                      }
                      className={style.inputAnt}
                      placeholder="ចំនួនទិញ"
                      onPressEnter={handleKeyPress}
                    />
                  </div>
                  <div className={style.detailContailer}>
                    <div className={style.inforProduct}></div>
                    <Radio.Group value={item.cashType} style={radioStyle}>
                      <Radio value="riel">៛</Radio>
                      <Radio value="dollar">$</Radio>
                    </Radio.Group>
                    <Button onClick={() => handleAddItems()} type="primary">
                      បញ្ចូល
                    </Button>
                  </div>
                </div>
              </div>
              <div className={style.addTable}>
                <SaleTable
                  saleItems={saleItems}
                  handleDeleteItems={handleDeleteItems}
                  handleEditItems={handleEditItems}
                />
              </div>
              <div className={style.payWrapper}>
                <div className={style.payInfo}>
                  <div>
                    អត្រាប្តូរប្រាក់:{" "}
                    <span style={{ color: "blue" }}>1$ = {exchangeRate}៛</span>
                  </div>
                  <div className={style.total}>
                    ប្រាក់សរុប:
                    <Input
                      value={totalRielTrimmed()}
                      style={{ width: "100px" }}
                      placeholder="ប្រាក់សរុប៛"
                    />
                    ៛
                  </div>
                  <div className={style.total}>
                    ប្រាក់សរុប:
                    <Input
                      value={totalDollarTrimmed()}
                      style={{ width: "100px" }}
                      placeholder="ប្រាក់សរុប$"
                    />
                    $
                  </div>
                </div>
                <div className={style.payInfo}>
                  <div className={style.description}>
                    <div className={style.subDes}>ពិពណ៌នាការទិញ:</div>
                    <Input
                      value={items.description}
                      onChange={(e) => {
                        setItems({ ...items, description: e.target.value });
                      }}
                      placeholder="ពិពណ៌នាការទិញ"
                    />
                  </div>
                  <Checkbox onChange={onChange} checked={items.debt}>
                    <div className={style.checkboxFont}>ជំពាក់</div>
                  </Checkbox>
                  <div className={style.total}>
                    ប្រាក់កក់មុន:
                    <InputNumberFloat
                      value={items.deposit}
                      onChange={(e) => {
                        setItems({ ...items, deposit: e.target.value });
                      }}
                      style={{ width: "100px" }}
                      placeholder="ប្រាក់កក់$"
                    />
                    $
                  </div>
                </div>
                <div className={style.payInfoPrint}>
                  <div className={style.btnPrint}>
                    <Button
                      onClick={() => handleCreateInvoice()}
                      type="primary"
                    >
                      រក្សាទុក
                    </Button>
                    <Button type="primary">Print receipt</Button>
                    <Button type="primary">Print invoice</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.productSide}>
              <ListCategory
                categories={categories}
                handleSearchByCategory={handleSearchByCategory}
              />
              <ListProduct
                products={filteredProducts}
                getProduct={getProduct}
              />
            </div>
          </div>
          <CreaeteCustomerModal
            isModalOpenCustomer={isModalOpenCustomer}
            handleCancelFormCustomer={handleCancelFormCustomer}
            handleSubmitCustomer={handleSubmitCustomer}
            customerForm={customerForm}
            setCustomerForm={setCustomerForm}
          />
        </main>
      </Spin>
    </>
  );
};

export default SalePage;
