import React, { useEffect, useState } from "react";
import CustomerTable from "../../components/customer/CustomerTable";
import { Button, Spin, message } from "antd";
import Search from "../../components/search/Search";
import style from "./CustomerPage.module.css";
import CustomerModal from "../../components/customer/CustomerModal";
import errroHandler from "../../utils/ErrorHandler";
import request from "../../services/request";

const CustomerPage = () => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    contact: "",
    address: "",
    file: "",
  });
  const [customers, setCustomers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  // GetList function
  const getList = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "customers/getList");
      setCustomers(response.customers);
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };

  // Insert function
  const insertCustomer = async () => {
    if (validateError()) return;
    try {
      setLoading(true);
      let custmerData = new FormData();
      custmerData.append("name", form.name);
      custmerData.append("contact", form.contact);
      custmerData.append("address", form.address);
      custmerData.append("file", form.file);
      const response = await request("POST", "customers/create", custmerData);
      message.success(response.message);
      handleCancelForm();
      getList();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };

  // update function
  const updateCustomer = async () => {
    if (validateError()) return;
    try {
      setLoading(true);
      let custmerData = new FormData();
      custmerData.append("name", form.name);
      custmerData.append("contact", form.contact);
      custmerData.append("address", form.address);
      custmerData.append("file", form.file);
      const response = await request(
        "PUT",
        `customers/update/${form.id}`,
        custmerData
      );
      message.success(response.message);
      handleCancelForm();
      getList();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };

  // Delete function

  const deleteCategory = async (id) => {
    if (!id) {
      message.error("មិនមានID!");
      return;
    }
    try {
      setLoading(true);
      const response = await request("DELETE", `customers/delete/${id}`);
      message.success(response.message);
      handleCancelForm();
      getList();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };

  // handle update
  const handleUpdate = (id, name, contact, address, image) => {
    setForm({ id, name, contact, address, file: image });
    setIsModalOpen(true);
  };
  // handle submit
  const handleSubmit = () => {
    if (!form.id) {
      insertCustomer();
    } else {
      updateCustomer();
    }
  };

  // handle cancel form
  const handleCancelForm = () => {
    setIsModalOpen(false);
    setForm({ id: "", name: "", contact: "", address: "", file: "" });
  };

  // Handle search query change
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  // Filter users based on search query
  const filteredUsers = customers.filter(
    (custmer) =>
      custmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      custmer.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const validateError = () => {
    if (!form.name || form.name.length < 3) {
      message.error("សូមបញ្ចូលឈ្មោះប្រភេទទំនិញយ៉ាងតិច៣អក្សរ!");
      return true;
    }
  };
  return (
    <Spin spinning={loading}>
      <main className={style.main}>
        <div className={style.header}>
          <div className={style.search}>
            <h3>POS / គ្រប់គ្រងអតិថិជន</h3>
            <Search searchQuery={searchQuery} handleSearch={handleSearch} />
          </div>
          <div className={style.create}>
            <Button
              className={style.btn}
              type="primary"
              onClick={() => setIsModalOpen(true)}
            >
              បង្កើតអតិថិជនថ្មី
            </Button>
          </div>
        </div>
        <div>
          <CustomerTable
            customers={filteredUsers}
            handleUpdate={handleUpdate}
            handleDelete={deleteCategory}
          />
        </div>
      </main>
      <CustomerModal
        isModalOpen={isModalOpen}
        handleSubmit={handleSubmit}
        handleCancelForm={handleCancelForm}
        form={form}
        setForm={setForm}
      />
    </Spin>
  );
};

export default CustomerPage;
