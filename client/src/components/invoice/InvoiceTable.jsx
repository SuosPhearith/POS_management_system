import React from "react";
import { Table, Button, Space, Popconfirm } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import dateConverter from "../../utils/DateConverter";
import { TbFileInvoice } from "react-icons/tb";
import { AiFillPrinter } from "react-icons/ai";
import { FaMoneyBill1Wave } from "react-icons/fa6";

const CategoryTable = ({
  invoices,
  handleUpdate,
  handleDelete,
  handlePayback,
  handleDetail,
  invoiceType,
}) => {
  const tableType = () => {
    if (invoiceType === "all") {
      return "តារាងគ្រប់គ្រងវិកាយប័ត្រទាំងអស់";
    } else if (invoiceType === "debt") {
      return "តារាងគ្រប់គ្រងវិកាយប័ត្រជំពាក់";
    } else if (invoiceType === "debtLate") {
      return "តារាងគ្រប់គ្រងវិកាយប័ត្រជំពាក់លើសពី៧ថ្ងៃ";
    } else if (invoiceType === "payAll") {
      return "តារាងគ្រប់គ្រងវិកាយប័ត្របង់លុយពេញ";
    } else {
      return "តារាងមានបញ្ហា!";
    }
  };
  const columns = [
    {
      title: "ល.រ",
      dataIndex: "no",
      fixed: "left",
      key: "no",
      width: 60,
      render: (value, record, index) => index + 1,
    },
    {
      title: "ID",
      dataIndex: "id",
      fixed: "left",
      key: "id",
      width: 100,
      render: (value) => {
        return <div>I-{value}</div>;
      },
    },
    {
      title: "ឈ្មោះអ្នកទិញ",
      dataIndex: "customer_name",
      width: 150,
      fixed: "left",
      key: "customer_name",
    },
    {
      title: "តម្លៃសរុប៛",
      dataIndex: "total_amount_khmer",
      key: "total_amount_khmer",
      width: 200,
      render: (value) => {
        return <div>{value}៛</div>;
      },
    },
    {
      title: "តម្លៃសរុប$",
      dataIndex: "total_amount_USD",
      key: "total_amount_USD",
      width: 200,
      render: (value) => {
        return <div>{value}$</div>;
      },
    },
    {
      title: "ប្រាក់​បង់",
      dataIndex: "deposit",
      key: "deposit",
      width: 200,
      render: (value) => {
        return <div>{value}$</div>;
      },
    },
    {
      title: "ប្រាក់ជំពាក់",
      dataIndex: "debt",
      key: "debt",
      width: 200,
      render: (value) => {
        return <div>{value}$</div>;
      },
    },
    {
      title: "ប្រភេទលក់",
      dataIndex: "saleType",
      key: "saleType",
      width: 130,
      render: (item) => {
        return (
          <>
            {item === "unit"
              ? "លក់រាយ"
              : item === "product"
              ? "លក់ដំ"
              : "លក់ពិសេស"}
          </>
        );
      },
    },
    {
      title: "ការបង់ប្រាក់",
      dataIndex: "payment_name",
      key: "payment_name",
      width: 200,
    },
    {
      title: "ទំនិញលុយខ្មែរ",
      dataIndex: "products_khmer_currency",
      key: "products_khmer_currency",
      width: 200,
      render: (value) => {
        return <div>{value}៛</div>;
      },
    },
    {
      title: "ទំនិញលុយដុល្លា",
      dataIndex: "products_USD_currency",
      key: "products_USD_currency",
      width: 200,
      render: (value) => {
        return <div>{value}$</div>;
      },
    },
    {
      title: "ថ្ងៃកែចុងក្រោយ",
      width: 200,
      dataIndex: "updated_date",
      key: "updated_date",
      render: (item) => {
        return dateConverter(item);
      },
    },
    {
      title: "ឈ្មោះអ្នកលក់",
      dataIndex: "user_fullname",
      key: "user_fullname",
      width: 200,
    },
    {
      title: "ថ្ងៃបង្កើត",
      dataIndex: "created_date",
      width: 200,
      key: "created_date",
      render: (item) => {
        return dateConverter(item);
      },
    },
    {
      title: "ការពិពណ៌នា",
      dataIndex: "description",
      width: 300,
      key: "descriptoion",
    },
    {
      title: "សកម្មភាព",
      width: 290,
      fixed: "right",
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
                record.customer_id,
                record.payment_type_id,
                record.deposit,
                record.description
              )
            }
          >
            <EditFilled />
          </Button>
          <Button
            type="primary"
            onClick={() => handlePayback(record.id, record.debt)}
          >
            <FaMoneyBill1Wave />
          </Button>
          <Button
            type="primary"
            onClick={() =>
              handleDetail(
                record.id,
                record.products_khmer_currency,
                record.products_USD_currency,
                record.total_amount_USD,
                record.total_amount_khmer
              )
            }
          >
            <TbFileInvoice />
          </Button>
          <Button type="primary" onClick={() => handleUpdate(null)}>
            <AiFillPrinter />
          </Button>
        </Space>
      ),
    },
  ];
  const data = invoices;
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
        x: 1200,
        y: "64vh",
      }}
      footer={() => (
        <div style={footerStyle}>
          <h3>{tableType()}</h3>
        </div>
      )}
      rowKey="id"
    />
  );
};

export default CategoryTable;
