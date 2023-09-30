import React from "react";
import { Button, Space, Table } from "antd";

const ReportInvoiveDebtTable = ({ invoices }) => {
  const columns = [
    {
      title: "ល.រ",
      dataIndex: "no",
      key: "no",
      width: 40,
      render: (value, record, index) => index + 1,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "ឈ្មោះអ្នកទិញ",
      dataIndex: "customer_name",
      key: "customer_name",
      width: 100,
    },
    {
      title: "សរុប៛",
      dataIndex: "total_amount_khmer",
      key: "total_amount_khmer",
      width: 90,
      render: (value, record) => {
        return <div>{value}៛</div>;
      },
    },
    {
      title: "សរុប$",
      dataIndex: "total_amount_USD",
      key: "total_amount_USD",
      width: 70,
      render: (value, record) => {
        const trimmedValue = parseFloat(value).toFixed(2);
        return <div>{trimmedValue}$</div>;
      },
    },
    {
      title: "ប្រាក់​បង់",
      dataIndex: "deposit",
      key: "deposit",
      width: 80,
      render: (value, record) => {
        const trimmedValue = parseFloat(value).toFixed(2);
        return <div>{trimmedValue}$</div>;
      },
    },
    {
      title: "ប្រាក់ជំពាក់",
      dataIndex: "debt",
      key: "action",
      width: 80,
      render: (value, record) => {
        const trimmedValue = parseFloat(value).toFixed(2);
        return <div>{trimmedValue}$</div>;
      },
    },
  ];

  const footerStyle = {
    fontFamily: "Khmer OS Content, sans-serif",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#070024",
    backgroundColor: "#d3eded",
  };
  return (
    <>
      <Table
        size="small"
        columns={columns}
        dataSource={invoices}
        pagination={false}
        scroll={{
          y: "47vh",
        }}
        footer={() => (
          <div style={footerStyle}>
            <div style={{ fontWeight: "700" }}>តារាងអ្នកជំពាក់</div>
          </div>
        )}
        rowKey="id"
      />
    </>
  );
};

export default ReportInvoiveDebtTable;
