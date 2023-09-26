import React from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import ImageWithCover from "../usefull/ImageWithCover";

const CustomerTable = ({ customers, handleUpdate, handleDelete }) => {
  const columns = [
    {
      title: "ល.រ",
      dataIndex: "no",
      key: "no",
      width: 60,
      render: (value, record, index) => index + 1,
    },
    {
      title: "ឈ្មោះ",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "លេខទំនាក់ទំនង",
      dataIndex: "contact",
      key: "contact",
      width: 300,
    },
    {
      title: "អាសយដ្ឋាន",
      dataIndex: "address",
      key: "address",
      width: 300,
    },
    {
      title: "រូបថត",
      dataIndex: "image",
      key: "image",
      width: 300,
      render: (item) => {
        return (
          <>
            {item != null ? (
              <ImageWithCover src={item} alt="image" />
            ) : (
              <ImageWithCover src={""} alt="image" />
            )}
          </>
        );
      },
    },
    {
      title: "សកម្មភាព",
      dataIndex: "action",
      key: "action",
      render: (value, record) => (
        <Space>
          <Popconfirm
            title="លុបគណនី"
            description="តើអ្នកចង់លុបមែនឬទេ?"
            onConfirm={() => handleDelete(record.id)}
            okText="លុប"
            cancelText="បោះបង់"
          >
            <Button danger>
              <DeleteFilled />
            </Button>
          </Popconfirm>
          <Button
            type="primary"
            onClick={() =>
              handleUpdate(
                record.id,
                record.name,
                record.contact,
                record.address,
                record.image
              )
            }
          >
            <EditFilled />
          </Button>
        </Space>
      ),
    },
  ];
  const data = customers;
  const footerStyle = {
    fontFamily: "Khmer OS Content, sans-serif",
    height: "40px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#070024",
    backgroundColor: "#d3eded",
  };
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      scroll={{
        y: "64vh",
      }}
      footer={() => (
        <div style={footerStyle}>
          <h3>តារាងគ្រប់គ្រងអតិថិជន</h3>
        </div>
      )}
      rowKey="id"
    />
  );
};

export default CustomerTable;
