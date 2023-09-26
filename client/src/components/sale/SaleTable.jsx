import React from "react";
import { Button, Space, Table } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import "./SaleTable.css";
const App = ({ saleItems, handleDeleteItems, handleEditItems }) => {
  const columns = [
    {
      title: "ល.រ",
      dataIndex: "no",
      key: "no",
      width: 50,
      render: (value, record, index) => index + 1,
    },
    {
      title: "ឈ្មោះ",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "ការពណ៌នា",
      dataIndex: "description",
      key: "description",
      width: 100,
    },
    {
      title: "តម្លៃ",
      dataIndex: "price",
      key: "price",
      width: 70,
      render: (value, record) => {
        const trimmedValue = parseFloat(value).toFixed(2);
        return (
          <div>
            {trimmedValue} {record.cashType === "riel" ? "៛" : "$"}
          </div>
        );
      },
    },
    {
      title: "ចំនួន",
      dataIndex: "quantity",
      key: "quantity",
      width: 60,
    },
    {
      title: "តម្លៃសរុប",
      dataIndex: "sub_total",
      key: "sub_total",
      width: 80,
      render: (value, record) => {
        const trimmedValue = parseFloat(value).toFixed(2);
        return (
          <div>
            {trimmedValue} {record.cashType === "riel" ? "៛" : "$"}
          </div>
        );
      },
    },
    {
      title: "សកម្មភាព",
      key: "action",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => handleDeleteItems(record.product_id)}
            type="primary"
            danger
            size="small"
          >
            <AiFillDelete />
          </Button>
          <Button
            onClick={() => handleEditItems(record)}
            type="primary"
            size="small"
          >
            <AiFillEdit />
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        size="small"
        columns={columns}
        dataSource={saleItems}
        pagination={false}
        scroll={{
          y: "24vh",
        }}
        rowKey="id"
      />
    </>
  );
};
export default App;
