import React from "react";
import Search from "../../components/search/Search";
import style from "./InvoiceLayout.module.css";
import { Link, Outlet } from "react-router-dom";
const InvoiceLayout = ({ children }) => {
  return (
    <>
      <main className={style.main}>
        <div className={style.header}>
          <div className={style.search}>
            <h3>POS / គ្រប់គ្រងវិកាយប័ត្រ</h3>
            <Search searchQuery={null} handleSearch={null} />
          </div>
          <div className={style.create}>
            <Link to="/invoice">
              <button className={style.btn}>វិកាយប័ត្រទាំងអស់​​</button>
            </Link>
            <Link to="/invoice/debt">
              <button className={style.btn}>វិកាយប័ត្រជំពាក់</button>
            </Link>
            <Link to="/invoice/debtLate">
              <button className={style.btn}>វិកាយប័ត្រជំពាក់លើស៧ថ្ងៃ</button>
            </Link>
            <Link to="/invoice/payall">
              <button className={style.btn}>វិកាយប័ត្របង់លុយហើយ</button>
            </Link>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default InvoiceLayout;
