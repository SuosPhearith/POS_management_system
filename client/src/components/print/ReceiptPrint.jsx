import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ReceiptPrint.css";
import DateConverter from "../../utils/DateConverter";
import { adminLayoutContext } from "../../layouts/admin/AdminLayout";
import { managerLayoutContext } from "../../layouts/manager/ManagerLayout";
import { salerLayoutContext } from "../../layouts/saler/SalerLayout";
const Invoice = ({ handlePrintInvoice, handleCancelPrint }) => {
  const userRole = localStorage.getItem("role");
  const contextToUse =
    userRole === "admin"
      ? adminLayoutContext
      : userRole === "manager"
      ? managerLayoutContext
      : salerLayoutContext;
  const { print } = useContext(contextToUse);
  const [dataForPrint, setDataForPrint] = useState([]);
  useEffect(() => {
    const dataString = localStorage.getItem("dataForPrint");
    if (dataString !== null) {
      try {
        const jsonData = JSON.parse(dataString);
        setDataForPrint(jsonData);
      } catch (error) {
        console.error("Error parsing JSON data:", error);
      }
    } else {
      console.warn("No data found in localStorage for the specified key.");
    }
  }, [print]);
  const roundUp = (number) => {
    const decimalPlaces = 2; // Specify the number of decimal places you want

    const roundedNumber =
      Math.ceil(number * 10 ** decimalPlaces) / 10 ** decimalPlaces;

    return roundedNumber;
  };
  return (
    <div className="card">
      <div className="card-body">
        {dataForPrint.length > 0 ? (
          <div className="container-fluit">
            {/* Your existing JSX code here */}
            <div className="container-fluit">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 text-end">
                <button
                  onClick={() => handlePrintInvoice()}
                  className="btn btn-light text-capitalize border-0 hide-on-print"
                  data-mdb-ripple-color="dark"
                >
                  <i className="fas fa-print text-primary"></i> Print
                </button>
                <button
                  onClick={() => handleCancelPrint()}
                  className="btn btn-light text-capitalize hide-on-print"
                  data-mdb-ripple-color="dark"
                >
                  <i className="far fa-file-pdf text-danger"></i> Back
                </button>
              </div>
              <div className="row">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-center align-items-center">
                  <p
                    className="total-price"
                    style={{ fontSize: "20px", fontFamily: "sans-serif" }}
                  >
                    Logical
                  </p>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-center align-items-center">
                  <p className="total-price text-center">
                    អាសយដ្ឋាន: សង្កាត់ វាលវង់ ខណ្ឌ ប្រាំពីរមករា រាជធានី ភ្នំពេញ
                  </p>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-center align-items-center">
                  <p className="total-price">លេខទំនាក់ទំនង: 069265958</p>
                </div>
              </div>
              <hr />
              <div className="container-fluit">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 d-flex justify-content-center align-items-center">
                    <ul className="list-unstyled">
                      <li className="text-muted text-center">
                        <i
                          className="fas fa-circle"
                          style={{ color: "#84B0CA" }}
                        ></i>{" "}
                        <span className="total-price fw-bold me-2">
                          ID វិក្កយបត្រ: I-{dataForPrint[0].invoice_id}
                        </span>
                      </li>
                      <li className="text-muted text-center">
                        <i
                          className="fas fa-circle"
                          style={{ color: "#84B0CA" }}
                        ></i>{" "}
                        <span className="total-price fw-bold">
                          កាលបរិច្ឆេទ​បង្កើត:{" "}
                          {DateConverter(dataForPrint[0].created_date)}
                        </span>
                      </li>
                      <li className="text-muted text-center">
                        <i
                          className="fas fa-circle"
                          style={{ color: "#84B0CA" }}
                        ></i>{" "}
                        <span className="total-price me-1 fw-bold me-2">
                          ឈ្មោះអ្នកលក់: {dataForPrint[0].fullname}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="row justify-content-center">
                  <table className="table table-striped table-borderless">
                    <thead
                      style={{ backgroundColor: "#84B0CA" }}
                      className="text-white"
                    >
                      <tr className="total-price">
                        <th scope="col" className="total-price">
                          #
                        </th>
                        <th scope="col" className="total-price">
                          ទំនិញ
                        </th>
                        <th scope="col" className="total-price">
                          ចំនួន
                        </th>
                        <th scope="col" className="total-price">
                          តម្លៃ
                        </th>
                        <th scope="col" className="total-price">
                          សរុប
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataForPrint?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row" className="total-price">
                              {index + 1}
                            </th>
                            <td className="total-price">{item.product_name}</td>
                            <td className="total-price">{item.quantity}</td>
                            <td className="total-price">
                              {item.unit_price}
                              {item.cashType === "riel" ? "៛" : "$"}
                            </td>
                            <td className="total-price">
                              {item.sub_total}
                              {item.cashType === "riel" ? "៛" : "$"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="row">
                  <div className="col-xl-12 col-sm-12 col-12">
                    <div className="d-flex flex-column text-center">
                      <div className="text-muted mt-2 d-flex justify-content-between">
                        <span className="total-price text-black">
                          តម្លៃសរុបលុយខ្មែរ:
                        </span>
                        <span className="total-price">
                          ៛{dataForPrint[0].total_amount_khmer}
                        </span>
                      </div>
                      <div className="total-price text-muted mt-2 d-flex justify-content-between">
                        <span className="total-price text-black">
                          តម្លៃសរុបដុល្លា:
                        </span>
                        <span className="total-price">
                          ${roundUp(dataForPrint[0].total_amount_USD)}
                        </span>
                      </div>
                      <div className="total-price text-muted mt-2 d-flex justify-content-between">
                        <span className="total-price text-black">
                          ប្រាក់បង់:
                        </span>
                        <span className="total-price">
                          ${roundUp(dataForPrint[0].deposit)}
                        </span>
                      </div>
                      <div className="total-price text-muted mt-2 d-flex justify-content-between">
                        <span className="total-price text-black">
                          ជំពាក់សរុប:
                        </span>
                        <span className="total-price">
                          ${dataForPrint[0].debt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-center">
                  {"-->Thank you!<--"}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default Invoice;
