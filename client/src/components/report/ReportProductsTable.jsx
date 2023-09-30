import React from "react";
import { Button, Space, Table } from "antd";

const ReportInvoiveDebtTable = ({ products }) => {
  const columns = [
    {
      title: "ល.រ",
      dataIndex: "no",
      key: "no",
      width: 50,
      render: (value, record, index) => index + 1,
    },
    {
      title: "IDទំនិញ",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "ឈ្មោះ",
      dataIndex: "name",
      key: "name",
      width: 80,
    },
    {
      title: "ប្រភេទ",
      dataIndex: "category_name",
      key: "category_name",
      width: 80,
    },
    {
      title: "សល់",
      dataIndex: "quantity",
      key: "quantity",
      width: 60,
    },
    {
      title: "ការពិពណ៌នា",
      dataIndex: "description",
      key: "description",
      width: 120,
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
        dataSource={products}
        pagination={false}
        scroll={{
          y: "47vh",
        }}
        footer={() => (
          <div style={footerStyle}>
            <div style={{ fontWeight: "700" }}>តារាងទំនិញជិតអស់ពីស្តុក</div>
          </div>
        )}
        rowKey="id"
      />
    </>
  );
};

export default ReportInvoiveDebtTable;
