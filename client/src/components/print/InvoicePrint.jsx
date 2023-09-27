import React, { useEffect, useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./InvoicePrint.css";
import DateConverter from "../../utils/DateConverter";
import { adminLayoutContext } from "../../layouts/admin/AdminLayout";
const Invoice = ({ handlePrintInvoice, handleCancelPrint }) => {
  const { print } = useContext(adminLayoutContext);
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
              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  <p
                    className="total-price"
                    style={{ color: "#7e8d9f", fontSize: "20px" }}
                  >
                    ID វិក្កយបត្រ: I-{dataForPrint[0].invoice_id}
                  </p>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 text-end">
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
              </div>
              <hr />
              <div className="container-fluit">
                <div className="row">
                  <div className="col-xl-8 col-lg-6 col-md-9 col-sm-8 col-8">
                    <ul className="list-unstyled">
                      <li className="total-price text-muted">
                        ឈ្មោះអតិថិជន:{" "}
                        <span
                          className="total-price"
                          style={{ color: "#5d9fc5" }}
                        >
                          {dataForPrint[0].customer_name}
                        </span>
                      </li>
                      <li className="total-price text-muted">
                        លេខទំនាក់ទំនង:{" "}
                        <span style={{ color: "#5d9fc5" }}>
                          {dataForPrint[0].contact}
                        </span>
                      </li>
                      <li className="total-price text-muted">
                        អាសយដ្ឋាន:{" "}
                        <span
                          className="total-price"
                          style={{ color: "#5d9fc5" }}
                        >
                          {dataForPrint[0].address}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-xl-4 col-lg-6 col-md-3 col-sm-4 col-4">
                    <ul className="list-unstyled">
                      <li className="text-muted">
                        <i
                          className="fas fa-circle"
                          style={{ color: "#84B0CA" }}
                        ></i>{" "}
                        <span className="total-price fw-bold me-2">
                          ID វិក្កយបត្រ:
                        </span>
                        I-{dataForPrint[0].invoice_id}
                      </li>
                      <li className="text-muted">
                        <i
                          className="fas fa-circle"
                          style={{ color: "#84B0CA" }}
                        ></i>{" "}
                        <span className="total-price fw-bold">
                          កាលបរិច្ឆេទ​បង្កើត:
                        </span>{" "}
                        {DateConverter(dataForPrint[0].created_date)}
                      </li>
                      <li className="text-muted">
                        <i
                          className="fas fa-circle"
                          style={{ color: "#84B0CA" }}
                        ></i>{" "}
                        <span className="total-price me-1 fw-bold me-2">
                          ឈ្មោះអ្នកលក់:
                        </span>
                        <span className="total-price me-1 fw-bold">
                          {dataForPrint[0].fullname}
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
                        <th scope="col">#</th>
                        <th scope="col">ឈ្មោះទំនិញ</th>
                        <th scope="col">ចំនួន</th>
                        <th scope="col">តម្លៃ</th>
                        <th scope="col">តម្លៃសរុប</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataForPrint?.map((item, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td className="total-price">{item.product_name}</td>
                            <td className="total-price">{item.quantity}</td>
                            <td className="total-price">{item.unit_price}</td>
                            <td className="total-price">{item.sub_total}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <hr />

                <div className="row ms-5">
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-4 col-4">
                    <p className="total-price ms-3">
                      {dataForPrint[0].description}
                    </p>
                  </div>
                  <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-4">
                    <div className="d-flex flex-column">
                      <div className="total-price text-muted mt-2" dir="rtl">
                        <span className="total-price text-black me-1">
                          : តម្លៃសរុបគិតជាលុយខ្មែរ
                        </span>
                      </div>
                      <div className="total-price text-muted mt-2" dir="rtl">
                        <span className="total-price text-black me-1">
                          : តម្លៃសរុបគិតជាដុល្លា
                        </span>
                      </div>
                      <div className="total-price text-muted mt-2" dir="rtl">
                        <span className="total-price text-black me-1">
                          : ប្រាក់បង់
                        </span>
                      </div>
                      <div className="total-price text-muted mt-2" dir="rtl">
                        <span className="total-price text-black me-1">
                          : ជំពាក់សរុប
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-1 col-lg-1 col-md-2 col-sm-2 col-2">
                    <div className="d-flex flex-column">
                      <div className="total-price text-muted mt-2" dir="rtl">
                        <span className="total-price text-black me-1">
                          ៛{dataForPrint[0].total_amount_khmer}
                        </span>
                      </div>
                      <div className="total-price text-muted mt-2" dir="rtl">
                        <span className="total-price text-black me-1">
                          ${roundUp(dataForPrint[0].total_amount_USD)}
                        </span>
                      </div>
                      <div className="total-price text-muted mt-2" dir="rtl">
                        <span className="total-price text-black me-1">
                          ${roundUp(dataForPrint[0].deposit)}
                        </span>
                      </div>
                      <div className="total-price text-muted mt-2" dir="rtl">
                        <span className="total-price text-black me-1">
                          ${dataForPrint[0].debt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />
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
