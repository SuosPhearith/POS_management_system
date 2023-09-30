import React, { useEffect, useState } from "react";
import { DollarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
import errorHandler from "../../utils/ErrorHandler";
import { Spin } from "antd";
import "./DashboardPage.css";
import style from "./DashboardPage.module.css";
import request from "../../services/request";
import ReportInvoiveDebtTable from "../../components/dashboard/InvoiceTable";
import ProductTable from "../../components/dashboard/ProductTable";

const ReportPage = () => {
  const [loading, setLoading] = useState(false);
  const [invoices, setInvoices] = useState([]);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState({
    total_invoice: 0,
    total_invoice_debt: 0,
    total_invoice_debt_late: 0,
    total_customer: 0,
    total_supplier: 0,
    total_payall: 0,
    total_sale_money: 0,
    total_debt_money: 0,
  });
  const getListDebt = async () => {
    try {
      setLoading(true);
      const response = await request("GET", `report/getListDebt`);
      setInvoices(response.invoices);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };
  const getListProductsLess = async () => {
    try {
      setLoading(true);
      const response = await request("GET", `report/getListProductsLess`);
      setProducts(response.products);
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };
  const getListData = async () => {
    try {
      setLoading(true);
      const response = await request("GET", `report/getListReportData`);
      setData({
        total_invoice: response.total_invoice[0].total_invoice,
        total_invoice_debt: response.total_invoice_debt[0].total_invoice_debt,
        total_invoice_debt_late:
          response.total_invoice_debt_late[0].total_invoice_debt_late,
        total_customer: response.total_customer[0].total_customer,
        total_supplier: response.total_supplier[0].total_supplier,
        total_payall: response.total_payall[0].total_payall,
        total_sale_money: response.total_sale_money[0].total_sale_money,
        total_debt_money: response.total_debt_money[0].total_debt_money,
      });
    } catch (error) {
      errorHandler(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getListDebt();
    getListData();
    getListProductsLess();
  }, []);
  const trimNumber = (number) => {
    // Check if the number is not null, undefined, and is a valid number
    if (number === null || number === undefined || isNaN(number)) {
      return 0; // or any other default value you prefer
    }

    const trimmedNumber = parseFloat(number.toFixed(0));
    return trimmedNumber;
  };
  return (
    <Spin spinning={loading}>
      <main className={style.main}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "9px",
          }}
        >
          <div className="dashboard_container_dashboard">
            <div className="dashboard_wrapper_two">
              <Link
                to="/invoice"
                style={{ backgroundColor: "#324169", textDecoration: "none" }}
                className="dashboard_field1"
              >
                <div className="dashboard_field_one">
                  <div className="dashboard_top">
                    <div className="dashboard_icon">
                      <FaFileInvoiceDollar />
                    </div>
                    <div className="dashboard_information1">សរុបវិកាយប័ត្រ</div>
                  </div>
                  <div className="dashboard_middle">
                    <div className="dashboard_data">{data.total_invoice}</div>
                    <div className="dashboard_high">វិកាយប័ត្រ</div>
                  </div>
                  <div className="dashboard_under">ចំនួនវិកាយប័ត្រទាំងអស់</div>
                </div>
              </Link>
              <Link
                to="/invoice"
                style={{ backgroundColor: "#0029FF", textDecoration: "none" }}
                className="dashboard_field1 field2"
              >
                <div className="dashboard_field_one">
                  <div className="dashboard_top">
                    <div className="dashboard_icon icon2">
                      <FaFileInvoiceDollar />
                    </div>
                    <div className="dashboard_information1">
                      វិកាយប័ត្រជំពាក់
                    </div>
                  </div>
                  <div className="dashboard_middle">
                    <div className="dashboard_data">
                      {data.total_invoice_debt}
                    </div>
                    <div className="dashboard_high">វិកាយប័ត្រ</div>
                  </div>
                  <div className="dashboard_under">
                    ចំនួនវិកាយប័ត្រជំពាក់ទាំងអស់
                  </div>
                </div>
              </Link>
              <Link
                to="/invoice"
                style={{ backgroundColor: "#8094AD", textDecoration: "none" }}
                className="dashboard_field1 field2"
              >
                <div className="dashboard_field_one">
                  <div className="dashboard_top">
                    <div className="dashboard_icon icon3">
                      <FaFileInvoiceDollar />
                    </div>
                    <div className="dashboard_information1">
                      វិ.ជំពាក់លើសពី៧ថ្ងៃ
                    </div>
                  </div>
                  <div className="dashboard_middle">
                    <div className="dashboard_data">
                      {data.total_invoice_debt_late}
                    </div>
                    <div className="dashboard_high">វិកាយប័ត្រ</div>
                  </div>
                  <div className="dashboard_under">
                    ចំនួនវិ.ជំពាក់លើសពី៧ថ្ងៃទាំងអស់
                  </div>
                </div>
              </Link>
              <Link
                to="/customer"
                style={{ backgroundColor: "#002358", textDecoration: "none" }}
                className="dashboard_field1 field4"
              >
                <div className="dashboard_field_one">
                  <div className="dashboard_top">
                    <div className="dashboard_icon icon4">
                      <HiUserGroup />
                    </div>
                    <div className="dashboard_information1">សរុបអតិថិជន</div>
                  </div>
                  <div className="dashboard_middle">
                    <div className="dashboard_data">{data.total_customer}</div>
                    <div className="dashboard_high">នាក់</div>
                  </div>
                  <div className="dashboard_under">ចំនួនអតិថិជនទាំងអស់</div>
                </div>
              </Link>
              <Link
                to="/supplier"
                style={{ backgroundColor: "#222437", textDecoration: "none" }}
                className="dashboard_field1 field4"
              >
                <div className="dashboard_field_one">
                  <div className="dashboard_top">
                    <div className="dashboard_icon icon4">
                      <FaUserTie />
                    </div>
                    <div className="dashboard_information1">សរុបអ្នកនាំចូល</div>
                  </div>
                  <div className="dashboard_middle">
                    <div className="dashboard_data">{data.total_supplier}</div>
                    <div className="dashboard_high">នាក់</div>
                  </div>
                  <div className="dashboard_under">ចំនួនអ្នកនាំចូលទាំងអស់</div>
                </div>
              </Link>
            </div>
            <div className="dashboard_wrapper_three">
              <div className="dashboard_dash_card1">
                <Link
                  to="/invoice"
                  style={{ backgroundColor: "#512B81", textDecoration: "none" }}
                  className="dashboard_field23 field4"
                >
                  <div className="dashboard_field_one">
                    <div className="dashboard_top">
                      <div className="dashboard_icon icon4">
                        <DollarOutlined />
                      </div>
                      <div className="dashboard_information1">
                        ចំនួនវិកាយប័ត្រមិនជំពាក់
                      </div>
                    </div>
                    <div className="dashboard_middle">
                      <div className="dashboard_data">{data.total_payall}</div>
                      <div className="dashboard_high">វិកាយប័ត្រ</div>
                    </div>
                    <div className="dashboard_under">
                      ចំនួនវិ.មិនជំពាក់សរុបទាំងអស់
                    </div>
                  </div>
                </Link>
                <Link
                  to="/invoice"
                  style={{ backgroundColor: "#5C8374", textDecoration: "none" }}
                  className="dashboard_field23 field4"
                >
                  <div className="dashboard_field_one">
                    <div className="dashboard_top">
                      <div className="dashboard_icon icon4">
                        <FaFileInvoiceDollar />
                      </div>
                      <div className="dashboard_information1">ចំនួនលុយសរុប</div>
                    </div>
                    <div className="dashboard_middle">
                      <div className="dashboard_data">
                        {trimNumber(data.total_sale_money)}
                      </div>
                      <div className="dashboard_high">ដុល្លា</div>
                    </div>
                    <div className="dashboard_under">ចំនួនលុយសរុបទាំងអស់</div>
                  </div>
                </Link>
                <Link
                  to="/invoice"
                  style={{ backgroundColor: "#183D3D", textDecoration: "none" }}
                  className="dashboard_field23 field4"
                >
                  <div className="dashboard_field_one">
                    <div className="dashboard_top">
                      <div className="dashboard_icon icon4">
                        <DollarOutlined />
                      </div>
                      <div className="dashboard_information1">
                        ចំនួនលុយជំពាក់​សរុប
                      </div>
                    </div>
                    <div className="dashboard_middle">
                      <div className="dashboard_data">
                        {trimNumber(data.total_debt_money)}
                      </div>
                      <div className="dashboard_high">ដុល្លា</div>
                    </div>
                    <div className="dashboard_under">
                      ចំនួនលុយជំពាក់​សរុបទាំងអស់
                    </div>
                  </div>
                </Link>
              </div>
              <div className="dashboard_dash_card">
                <ReportInvoiveDebtTable invoices={invoices} />
              </div>
              <div className="dashboard_dash_card">
                <ProductTable products={products} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Spin>
  );
};

export default ReportPage;
