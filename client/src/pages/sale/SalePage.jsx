import React, { useEffect, useState, useRef, useContext } from "react";
import style from "./SalePage.module.css";
import Search from "../../components/search/Search";
import request from "../../services/request";
import errorhandler from "../../utils/ErrorHandler";
import SaleTable from "../../components/sale/SaleTable";
import ListProduct from "../../components/sale/ListProduct";
import ListCategory from "../../components/sale/ListCategory";
import CreaeteCustomerModal from "../../components/sale/CreaeteCustomerModal";
import InputNumberFloat from "../../components/usefull/NumbericInputFloat";
import InvoicePrint from "../../components/print/ReceiptPrint";
import {
  Button,
  Input,
  Select,
  Spin,
  Radio,
  message,
  Checkbox,
  Space,
} from "antd";
import { adminLayoutContext } from "../../layouts/admin/AdminLayout";
import { managerLayoutContext } from "../../layouts/manager/ManagerLayout";
import { salerLayoutContext } from "../../layouts/saler/SalerLayout";

import "./SalePage.css";
const SalePage = () => {
  // globle
  const userRole = localStorage.getItem("role");
  const contextToUse =
    userRole === "admin"
      ? adminLayoutContext
      : userRole === "manager"
      ? managerLayoutContext
      : salerLayoutContext;
  const { print, setPrint } = useContext(contextToUse);
  const inputNumberRef = useRef();
  const inputQuantityRef = useRef();
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
    saleType: "unit",
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
    const unit_code = String(product.unit_code);
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      catName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ProductId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit_code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Handle search by category
  const handleSearchByCategory = (name) => {
    setSearchQuery(name);
  };
  // Scan barcode
  const [scanText, setScanText] = useState("");
  const filteredScan = products.filter((product) => {
    const unit_code = String(product.unit_code);
    return unit_code.toLowerCase() === scanText.toLowerCase();
  });

  useEffect(() => {
    if (filteredScan.length === 1) {
      setItem({
        product_id: filteredScan[0].id,
        unit_code: filteredScan[0].unit_code,
        name: filteredScan[0].name,
        cashType: filteredScan[0].cashType,
        quantity: 1,
        price: filteredScan[0].unit_price,
        description: filteredScan[0].description,
      });
      inputQuantityRef?.current?.focus();
      // inputNumberRef?.current?.focus();
      setScanText("");
    }
    // eslint-disable-next-line
  }, [scanText]);

  // end Scan

  useEffect(() => {
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
  const handlePrintInvoice = () => {
    window.print();
    setPrint(false);
  };
  const handleOpenPrint = async () => {
    if (validateCreateInvoice()) {
      return;
    }
    localStorage.setItem("dataForPrint", "[]");
    await handleCreateInvoice(); // Wait for handleCreateInvoice to complete
    setPrint(true);
  };

  const handleCancelPrint = () => {
    setPrint(false);
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
    box_code,
    name,
    cashType,
    unit_price,
    product_price,
    special_price,
    description
  ) => {
    inputQuantityRef.current.focus();
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
      price: unit_price,
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
    width: "150px",
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
      let roundedNumber = totalUsa.toFixed(2);
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
        deposit: items.deposit * 1,
        description: items.description,
        products: saleItems,
      };
      const response = await request("POST", "sales/create", productData);
      // message.success(response.message);
      const dataString = JSON.stringify(response.Invoice);
      localStorage.setItem("dataForPrint", dataString);
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
    if (items.deposit * 1 > totalDollar * 1) {
      message.error("សូមបញ្ចូលប្រាក់កក់អោយបាបត្រឹមត្រូវ!");
      return true;
    }
    return false;
  };
  // end of create invoice
  const handleEditQuantity = (e) => {
    const { value } = e.target;
    const numericValue = value.replace(/\D/g, "");
    setItem({ ...item, quantity: numericValue });
  };
  return (
    <>
      <Spin spinning={loading}>
        {print ? (
          <InvoicePrint
            handlePrintInvoice={handlePrintInvoice}
            handleCancelPrint={handleCancelPrint}
          />
        ) : (
          <main className={style.main}>
            <div className={style.header}>
              <div className={style.information}>
                <h3>POS / លក់រាយ</h3>
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
                    <Space>
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

                      <Input
                        value={scanText}
                        onChange={(e) => setScanText(e.target.value)}
                        ref={inputNumberRef}
                        onPressEnter={handleKeyPress}
                        placeholder="ស្កែនបាកូដ"
                      />
                    </Space>
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
                      <Input
                        type="number"
                        ref={inputQuantityRef}
                        value={item.quantity}
                        onChange={(e) => handleEditQuantity(e)}
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
                      <span style={{ color: "blue" }}>
                        1$ = {exchangeRate}៛
                      </span>
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
                      <Button onClick={() => handleOpenPrint()} type="primary">
                        Print receipt
                      </Button>
                      <Button
                        onClick={() => handleCancelForm()}
                        type="primary"
                        danger
                      >
                        Cancel
                      </Button>
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
        )}
      </Spin>
    </>
  );
};
export default SalePage;
