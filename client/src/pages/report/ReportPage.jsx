import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReportInvoiveDebtTable from "../../components/report/ReportInvoiveDebtTable";
import ReportProductTable from "../../components/report/ReportProductsTable";
import errorHandler from "../../utils/ErrorHandler";
import { DollarOutlined } from "@ant-design/icons";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";

import { Spin, DatePicker } from "antd";
import "./ReportPage.css";
import style from "./ReportPage.module.css";
import request from "../../services/request";
import moment from "moment";
const { RangePicker } = DatePicker;

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
  });
  const [dataBydate, setDataByDate] = useState({
    total_invoice: 0,
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
  const getListDataByDate = async (startDate, endDate) => {
    try {
      setLoading(true);
      const response = await request(
        "GET",
        `report/getListReportDataDateToDate?startDate=${startDate}&endDate=${endDate}`
      );
      setDataByDate({
        total_invoice: response.total_invoice[0].total_invoice,
        total_sale_money: response.total_sale_money[0].total_sale_money,
        total_debt_money: response.total_debt_money[0].total_debt_money,
      });
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
    handleDateChange();
    getListProductsLess();
    // eslint-disable-next-line
  }, []);
  const trimNumber = (number) => {
    // Check if the number is not null, undefined, and is a valid number
    if (number === null || number === undefined || isNaN(number)) {
      return 0; // or any other default value you prefer
    }

    const trimmedNumber = parseFloat(number.toFixed(0));
    return trimmedNumber;
  };

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      let startDate = dates[0].format("YYYY-MM-DD");
      let endDate = dates[1].format("YYYY-MM-DD");
      endDate = getNextDay(endDate);
      getListDataByDate(startDate, endDate);
    } else {
      getListDataByDate("", "");
    }
  };
  const getNextDay = (inputDate) => {
    return moment(inputDate).add(1, "days").format("YYYY-MM-DD");
  };

  return (
    <Spin spinning={loading}>
      <main className={style.main}>
        <div className={style.header}>
          <div className={style.search}>
            <h3>POS / គ្រប់គ្រងរបាយការណ៍</h3>
          </div>
          <div className={style.create}>
            {/* <Button className={style.btn} type="primary">
              ទាញយករបាយការណ៍
            </Button> */}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "9px",
          }}
        >
          <div className="report_container_dashboard">
            <div className="report_wrapper_two">
              <Link
                to="/invoice"
                className="report_field1"
                style={{ textDecoration: "none" }}
              >
                <div className="report_field_one">
                  <div className="report_top">
                    <div className="report_icon">
                      <FaFileInvoiceDollar />
                    </div>
                    <div className="report_information1">សរុបវិកាយប័ត្រ</div>
                  </div>
                  <div className="report_middle">
                    <div className="report_data">{data.total_invoice}</div>
                    <div className="report_high">វិកាយប័ត្រ</div>
                  </div>
                  <div className="report_under">ចំនួនវិកាយប័ត្រទាំងអស់</div>
                </div>
              </Link>
              <Link
                to="/invoice"
                className="report_field1 field2"
                style={{ textDecoration: "none" }}
              >
                <div className="report_field_one">
                  <div className="report_top">
                    <div className="report_icon icon2">
                      <FaFileInvoiceDollar />
                    </div>
                    <div className="report_information1">វិកាយប័ត្រជំពាក់</div>
                  </div>
                  <div className="report_middle">
                    <div className="report_data">{data.total_invoice_debt}</div>
                    <div className="report_high">វិកាយប័ត្រ</div>
                  </div>
                  <div className="report_under">
                    ចំនួនវិកាយប័ត្រជំពាក់ទាំងអស់
                  </div>
                </div>
              </Link>
              <Link
                to="/invoice"
                style={{ textDecoration: "none" }}
                className="report_field1 field3"
              >
                <div className="report_field_one">
                  <div className="report_top">
                    <div className="report_icon icon3">
                      <FaFileInvoiceDollar />
                    </div>
                    <div className="report_information1">
                      វិ.ជំពាក់លើសពី៧ថ្ងៃ
                    </div>
                  </div>
                  <div className="report_middle">
                    <div className="report_data">
                      {data.total_invoice_debt_late}
                    </div>
                    <div className="report_high">វិកាយប័ត្រ</div>
                  </div>
                  <div className="report_under">
                    ចំនួនវិ.ជំពាក់លើសពី៧ថ្ងៃទាំងអស់
                  </div>
                </div>
              </Link>
              <Link
                to="/customer"
                style={{ textDecoration: "none" }}
                className="report_field1 field4"
              >
                <div className="report_field_one">
                  <div className="report_top">
                    <div className="report_icon icon4">
                      <HiUserGroup />
                    </div>
                    <div className="report_information1">សរុបអតិថិជន</div>
                  </div>
                  <div className="report_middle">
                    <div className="report_data">{data.total_customer}</div>
                    <div className="report_high">នាក់</div>
                  </div>
                  <div className="report_under">ចំនួនអតិថិជនទាំងអស់</div>
                </div>
              </Link>
              <Link
                to="/supplier"
                style={{ textDecoration: "none" }}
                className="report_field1 field4"
              >
                <div className="report_field_one">
                  <div className="report_top">
                    <div className="report_icon icon4">
                      <FaUserTie />
                    </div>
                    <div className="report_information1">សរុបអ្នកនាំចូល</div>
                  </div>
                  <div className="report_middle">
                    <div className="report_data">{data.total_supplier}</div>
                    <div className="report_high">នាក់</div>
                  </div>
                  <div className="report_under">ចំនួនអ្នកនាំចូលទាំងអស់</div>
                </div>
              </Link>
            </div>
            <div className="report_wrapper_three">
              <div className="report_dash_card1">
                <RangePicker onChange={handleDateChange} />
                <div className="report_field23 field4">
                  <div className="report_field_one">
                    <div className="report_top">
                      <div className="report_icon icon4">
                        <FaFileInvoiceDollar />
                      </div>
                      <div className="report_information1">ចំនួនលក់សរុប</div>
                    </div>
                    <div className="report_middle">
                      <div className="report_data">
                        {dataBydate.total_invoice}
                      </div>
                      <div className="report_high">វិកាយប័ត្រ</div>
                    </div>
                  </div>
                </div>
                <div className="report_field23 field4">
                  <div className="report_field_one">
                    <div className="report_top">
                      <div className="report_icon icon4">
                        <DollarOutlined />
                      </div>
                      <div className="report_information1">ចំនួនលុយសរុប</div>
                    </div>
                    <div className="report_middle">
                      <div className="report_data">
                        {trimNumber(dataBydate.total_sale_money)}
                      </div>
                      <div className="report_high">ដុល្លា</div>
                    </div>
                  </div>
                </div>
                <div className="report_field23 field4">
                  <div className="report_field_one">
                    <div className="report_top">
                      <div className="report_icon icon4">
                        <DollarOutlined />
                      </div>
                      <div className="report_information1">
                        ចំនួនជំពាក់​សរុប
                      </div>
                    </div>
                    <div className="report_middle">
                      <div className="report_data">
                        {trimNumber(dataBydate.total_debt_money)}
                      </div>
                      <div className="report_high">ដុល្លា</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="report_dash_card">
                <ReportInvoiveDebtTable invoices={invoices} />
              </div>
              <div className="report_dash_card">
                <ReportProductTable products={products} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Spin>
  );
};

export default ReportPage;
