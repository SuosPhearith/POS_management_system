import React, { useEffect, useState, useContext } from "react";
import InvoiceTable from "../../components/invoice/InvoiceTable";
import errorHandler from "../../utils/ErrorHandler";
import request from "../../services/request";
import InvoiceModal from "../../components/invoice/InvoiceModal";
import InvoicePaybackModal from "../../components/invoice/InvoicePaybackModal";
import { Spin, message } from "antd";
import InvoiceDetailModal from "../../components/invoice/InvoiceDetailModal";
import style from "./InvoicePage.module.css";
import Search from "../../components/search/Search";
import { adminLayoutContext } from "../../layouts/admin/AdminLayout";
import InvoicePrint from "../../components/print/InvoicePrint";
const InvoicePage = () => {
  const { print, setPrint } = useContext(adminLayoutContext);
  const [invoiceType, setInvoiceType] = useState("all");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenPayback, setIsModalOpenPayback] = useState(false);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [formDetail, setFormDetail] = useState({
    detail: "",
    products_khmer_currency: "",
    products_USD_currency: "",
    total_amount_USD: "",
    total_amount_khmer: "",
  });
  const [paybackForm, setPaybackForm] = useState({
    id: "",
    payback: "",
    payAll: false,
    debt: "",
  });
  const [form, setForm] = useState({
    id: "",
    customer_id: "",
    payment_type_id: "",
    deposit: "",
    description: "",
  });

  const getList = async (type) => {
    try {
      setLoading(true);
      let response;
      switch (type) {
        case "all":
          response = await request("GET", "sales/getList");
          break;
        case "debt":
          response = await request("GET", "sales/getListDebt");
          break;
        case "debtLate":
          response = await request("GET", "sales/getListDebtLate");
          break;
        case "payAll":
          response = await request("GET", "sales/getListPayAll");
          break;
        default:
          message.error("មិនមានវិកាយប័ត្រ!");
          return;
      }
      setInvoices(response.invoices);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getList(invoiceType);
  }, [invoiceType]);
  // update function
  const updateCategory = async () => {
    if (validateError()) return;
    try {
      setLoading(true);
      let invoiceData = {
        customer_id: form.customer_id,
        payment_type_id: form.payment_type_id,
        deposit: form.deposit,
        description: form.description,
      };
      const response = await request(
        "PUT",
        `sales/update/${form.id}`,
        invoiceData
      );
      message.success(response.message);
      handleCancelForm();
      getList(invoiceType);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };
  // update function
  const pay = async () => {
    if (validateErrorPayback()) return;
    try {
      setLoading(true);
      let payData = {
        deposit: paybackForm.payback,
      };
      const response = await request(
        "PUT",
        `sales/payback/${paybackForm.id}`,
        payData
      );
      message.success(response.message);
      handleCancelFormPayback();
      getList(invoiceType);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };
  const payall = async () => {
    if (validateErrorPayback()) return;
    try {
      setLoading(true);
      const response = await request(
        "PUT",
        `sales/paybackAll/${paybackForm.id}`
      );
      message.success(response.message);
      handleCancelFormPayback();
      getList(invoiceType);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };
  // Delete function

  const deleteInvoice = async (id) => {
    if (!id) {
      message.error("មិនមានID!");
      return;
    }
    try {
      setLoading(true);
      const response = await request("DELETE", `sales/delete/${id}`);
      message.success(response.message);
      handleCancelForm();
      getList(invoiceType);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = (
    id,
    customer_id,
    payment_type_id,
    deposit,
    description
  ) => {
    setIsModalOpen(true);
    setForm({
      id,
      customer_id,
      payment_type_id,
      deposit,
      description,
    });
  };
  const handlePayback = (id, debt) => {
    setPaybackForm({ ...paybackForm, id, debt });
    setIsModalOpenPayback(true);
  };
  const handleDelete = (id) => {
    // handle delete
    deleteInvoice(id);
  };
  const handleSubmit = () => {
    // handle submit
    updateCategory();
  };
  const handleSubmitPayback = () => {
    // handle submit payback
    if (paybackForm.payAll) {
      payall();
    } else {
      pay();
    }
  };
  const handleDetail = (
    detail,
    products_khmer_currency,
    products_USD_currency,
    total_amount_USD,
    total_amount_khmer
  ) => {
    setIsModalOpenDetail(true);
    setFormDetail({
      detail,
      products_khmer_currency,
      products_USD_currency,
      total_amount_USD,
      total_amount_khmer,
    });
  };
  const handleCancelDetail = () => {
    setIsModalOpenDetail(false);
    setFormDetail({
      details: "",
      products_khmer_currency: "",
      products_USD_currency: "",
      total_amount_USD: "",
      total_amount_khmer: "",
    });
  };
  const handleCancelForm = () => {
    setIsModalOpen(false);
    setForm({
      id: "",
      customer_id: "",
      payment_type_id: "",
      deposit: "",
      description: "",
    });
  };
  const handleCancelFormPayback = () => {
    setIsModalOpenPayback(false);
    setPaybackForm({
      id: "",
      payback: "",
      payAll: false,
      debt: "",
    });
  };
  const validateErrorPayback = () => {
    if (paybackForm.debt === 0) {
      message.error("មិនមានការជំពាក់!");
      handleCancelFormPayback();
      return true;
    }
    if (!paybackForm.payAll) {
      if (paybackForm.payback === "" || !paybackForm.payback) {
        message.error("សូមញ្ចូលប្រាក់សង់!");
        return true;
      }
      if (paybackForm.payback > paybackForm.debt || paybackForm.payback <= 0) {
        message.error("ប្រាក់សង់មិនអាចលើសប្រាក់​ជំពាក់និងធំជាង០!");
        return true;
      }
    }

    return false;
  };
  const validateError = () => {
    if (!form.customer_id) {
      message.error("សូមញ្ចូលអ្នកទិញ!");
      return true;
    }
    if (!form.deposit) {
      message.error("សូមញ្ចូលប្រាក់កក់!");
      return true;
    }
    if (!form.payment_type_id) {
      message.error("សូមញ្ចូលការបង់ប្រាក់!");
      return true;
    }
    return false;
  };

  // Handle search query change
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter((invoice) => {
    const invoiceId = String(invoice.id);
    return (
      invoice.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.created_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoiceId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  // function get list print
  const getListPrint = async (id) => {
    try {
      setLoading(true);
      const response = await request("GET", `sales/getListPrint/${id}`);
      const dataString = JSON.stringify(response.Invoice);
      localStorage.setItem("dataForPrint", dataString);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };
  const handlePrint = async (id) => {
    localStorage.setItem("dataForPrint", "[]");
    await getListPrint(id); // Wait for handleCreateInvoice to complete
    setPrint(true);
  };
  const handlePrintInvoice = () => {
    //code
    window.print();
    setPrint(false);
  };
  const handleCancelPrint = () => {
    //code
    setPrint(false);
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
              <div className={style.search}>
                <h3>POS / គ្រប់គ្រងវិកាយប័ត្រ</h3>
                <Search searchQuery={searchQuery} handleSearch={handleSearch} />
              </div>
              <div className={style.create}>
                <button
                  className={style.btn}
                  onClick={() => setInvoiceType("all")}
                >
                  វិកាយប័ត្រទាំងអស់​​
                </button>
                <button
                  className={style.btn}
                  onClick={() => setInvoiceType("debt")}
                >
                  វិកាយប័ត្រជំពាក់
                </button>
                <button
                  className={style.btn}
                  onClick={() => setInvoiceType("debtLate")}
                >
                  វិកាយប័ត្រជំពាក់លើស៧ថ្ងៃ
                </button>
                <button
                  className={style.btn}
                  onClick={() => setInvoiceType("payAll")}
                >
                  វិកាយប័ត្របង់លុយហើយ
                </button>
              </div>
            </div>
            <InvoiceTable
              invoices={filteredInvoices}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              handlePayback={handlePayback}
              handleDetail={handleDetail}
              invoiceType={invoiceType}
              handlePrint={handlePrint}
            />
            <InvoiceModal
              isModalOpen={isModalOpen}
              handleSubmit={handleSubmit}
              handleCancelForm={handleCancelForm}
              form={form}
              setForm={setForm}
            />
            <InvoicePaybackModal
              isModalOpenPayback={isModalOpenPayback}
              handleSubmitPayback={handleSubmitPayback}
              handleCancelFormPayback={handleCancelFormPayback}
              paybackForm={paybackForm}
              setPaybackForm={setPaybackForm}
            />
            <InvoiceDetailModal
              isModalOpenDetail={isModalOpenDetail}
              handleCancelDetail={handleCancelDetail}
              formDetail={formDetail}
            />
          </main>
        )}
      </Spin>
    </>
  );
};

export default InvoicePage;
