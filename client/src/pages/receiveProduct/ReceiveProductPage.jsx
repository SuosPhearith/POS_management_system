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
  const [totalReceiveproduct, setTotalReceiveproduct] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getList();
    // eslint-disable-next-line
  }, [searchQuery, page]);

  const getList = async () => {
    try {
      setLoading(true);
      const response = await request(
        "GET",
        `receiveProducts/getList?page=${page}&search=${searchQuery}`
      );
      setReceiveProducts(response.receiveproducts);
      setTotalReceiveproduct(response.total_row[0].total_row);
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
            receiveProducts={receiveProducts}
            handleDelete={handleDelete}
            totalReceiveproduct={totalReceiveproduct}
            setPage={setPage}
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
