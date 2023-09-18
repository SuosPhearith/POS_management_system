import React, { useEffect, useState } from "react";
import ReceiveProductTable from "../../components/receiveProduct/ReceiveProductTable";
import { Spin, message } from "antd";
import Search from "../../components/search/Search";
import style from "./ReceiveProductPage.module.css";
import errroHandler from "../../utils/ErrorHandler";
import request from "../../services/request";

const ReceiveProductPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [receiveProducts, setReceiveProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "receiveproducts/getList");
      setReceiveProducts(response.receiveproducts);
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };

  // handle delete
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const response = await request("DELETE", `receiveproducts/delete/${id}`);
      message.success(response.message);
      getList();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search query change
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  // Filter users based on search query
  const filteredUsers = receiveProducts.filter((receiveProduct) => {
    const productId = String(receiveProduct.product_id);
    const userId = String(receiveProduct.user_id);
    const supplierId = String(receiveProduct.supplier_id);
    return (
      productId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplierId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  return (
    <Spin spinning={loading}>
      <main className={style.main}>
        <div className={style.header}>
          <div className={style.search}>
            <h3>POS / គ្រប់គ្រងការទិញចូល</h3>
            <Search searchQuery={searchQuery} handleSearch={handleSearch} />
          </div>
          <div className={style.create}></div>
        </div>
        <div>
          <ReceiveProductTable
            receiveProducts={filteredUsers}
            handleDelete={handleDelete}
          />
        </div>
      </main>
      {/* <CategoryModal
                isModalOpen = {isModalOpen}
                handleSubmit = {handleSubmit}
                handleCancelForm = {handleCancelForm}
                form = {form}
                setForm = {setForm}
            /> */}
    </Spin>
  );
};

export default ReceiveProductPage;
