import React, { useState, useEffect } from "react";
import { Modal, Table, Spin, Space, Input } from "antd";
import request from "../../services/request";
import errroHandler from "../../utils/ErrorHandler";

const RateModal = ({ isModalOpenDetail, handleCancelDetail, formDetail }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchList = async () => {
      try {
        const response = await request(
          "GET",
          `sales/getList/${formDetail.detail}`
        );
        setItems((prevItems) => response.sales);
      } catch (error) {
        errroHandler(error);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [formDetail.detail]);

  const columns = [
    {
      title: "ល.រ",
      dataIndex: "no",
      key: "no",
      width: 60,
      render: (value, record, index) => index + 1,
    },
    {
      title: "ID វិកាយប័ត្រ",
      dataIndex: "invoice_id",
      key: "invoice_id",
      width: 100,
    },
    {
      title: "ឈ្មោះទំនិញ",
      dataIndex: "name",
      key: "name",
      width: 130,
    },
    {
      title: "ប្រភេទប្រាក់",
      dataIndex: "cashType",
      key: "cashType",
      width: 100,
      render: (value) => {
        return value === "riel" ? "៛" : "$";
      },
    },
    {
      title: "តម្លៃ",
      dataIndex: "unit_price",
      key: "unit_price",
      width: 100,
    },
    {
      title: "ចំនួនទិញ",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "តម្លៃសរុប",
      dataIndex: "sub_total",
      key: "sub_total",
      width: 100,
    },
  ];

  const data = items;
  const inputStyle = {
    height: "40px",
    fontSize: "15px",
  };
  return (
    <>
      <Spin spinning={loading}>
        <Modal
          title="លំអិតការទិញ"
          open={isModalOpenDetail}
          onCancel={handleCancelDetail}
          maskClosable={false}
          keyboard={false}
          width={900}
          footer={false}
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{
              x: 800,
              y: 300,
            }}
          />
          <Space>
            <label>
              <span style={{ color: "blue" }}>*សរុបតម្លៃទំនិញលុយខ្មែរ</span>
              <Input
                value={`${formDetail.products_khmer_currency}៛`}
                style={inputStyle}
                placeholder="ប្រាក់ជំពាក់សរុប"
              />
            </label>
            <label>
              <span style={{ color: "blue" }}>*សរុបតម្លៃទំនិញលុយដុល្លា</span>
              <Input
                value={`${formDetail.products_USD_currency}$`}
                style={inputStyle}
                placeholder="ប្រាក់ជំពាក់សរុប"
              />
            </label>
            <label>
              <span style={{ color: "blue" }}>*តម្លៃសរុបលុយដុល្លា</span>
              <Input
                value={`${formDetail.total_amount_USD}$`}
                style={inputStyle}
                placeholder="ប្រាក់ជំពាក់សរុប"
              />
            </label>
            <label>
              <span style={{ color: "blue" }}>*តម្លៃសរុបលុយខ្មែរ</span>
              <Input
                value={`${formDetail.total_amount_khmer}៛`}
                style={inputStyle}
                placeholder="ប្រាក់ជំពាក់សរុប"
              />
            </label>
          </Space>
        </Modal>
      </Spin>
    </>
  );
};

export default RateModal;
