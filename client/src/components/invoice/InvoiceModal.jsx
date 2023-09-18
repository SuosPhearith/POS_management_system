import React from "react";
import { Modal, Input, Spin, Space, Select } from "antd";
import NumericInput from "../usefull/NumbericInputFloat";
import request from "../../services/request";
import errroHandler from "../../utils/ErrorHandler";
import { useState, useEffect } from "react";

const CategoryModal = ({
  isModalOpen,
  handleSubmit,
  handleCancelForm,
  form,
  setForm,
}) => {
  const [loading, setLoading] = useState(false);
  const [customers, setcustomers] = useState([]);
  const [paymentType, setpaymentType] = useState([]);

  useEffect(() => {
    getListCustomer();
    getListPaymentType();
  }, []);
  // customer getlist
  const getListCustomer = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "customers/getList");
      const customers = response.customers;
      const data = customers.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      }));
      setcustomers(data);
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };
  // payment type getlist
  const getListPaymentType = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "paymentTypes/getList");
      const paymentTypes = response.paymentTypes;
      const data = paymentTypes.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      }));
      setpaymentType(data);
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    height: "40px",
    fontSize: "15px",
  };
  const spaceStyle = {
    width: "100%",
    marginTop: "10px",
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const findLabel = () => {
    const valueToFind = String(form.customer_id);
    const selectedCategory = customers.find(
      (item) => item.value === valueToFind
    );
    return selectedCategory ? selectedCategory.label : null; // Return the label if found, otherwise an empty string
  };
  const findLabelPaymet = () => {
    const valueToFind = String(form.payment_type_id);
    const selectedPaymentType = paymentType.find(
      (item) => item.value === valueToFind
    );
    return selectedPaymentType ? selectedPaymentType.label : null; // Return the label if found, otherwise an empty string
  };
  const handleSelectChangeCustomer = (value) => {
    setForm({ ...form, customer_id: value });
  };
  const handleSelectChangePaymentType = (value) => {
    setForm({ ...form, payment_type_id: value });
  };

  const selectStyle = {
    fontSize: "15px",
    width: "322px",
  };
  return (
    <>
      <Spin spinning={loading}>
        <Modal
          title="កែប្រែទិន្នន័យ"
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={handleCancelForm}
          maskClosable={false}
          keyboard={false}
          width={400}
          okText="កែប្រែ"
          cancelText="បោះបង់"
        >
          <Space style={spaceStyle} direction="vertical">
            <label>
              <span style={{ color: "blue" }}>*ជ្រើសរើសអតិថិជន</span>
              <Select
                value={findLabel()}
                onChange={handleSelectChangeCustomer}
                showSearch
                style={selectStyle}
                placeholder="ជ្រើសរើសប្រភេទទំនិញ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={customers}
              />
            </label>
            <label>
              <span style={{ color: "blue" }}>*ជ្រើសរើសការបង់ប្រាក់ </span>

              <Select
                value={findLabelPaymet()}
                onChange={handleSelectChangePaymentType}
                showSearch
                style={selectStyle}
                placeholder="ជ្រើសរើសប្រភេទទំនិញ"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={paymentType}
              />
            </label>
            <label>
              <span style={{ color: "blue" }}>*ការកក់ប្រាក់គិតជា$</span>
              <NumericInput
                value={form.deposit}
                onChange={(e) => setForm({ ...form, deposit: e.target.value })}
                onPressEnter={handleKeyPress}
                style={inputStyle}
                placeholder="ប្រាក់កក់"
              />
            </label>
            <label>
              <span style={{ color: "blue" }}>*ការពិពណ៌នា </span>
              <Input.TextArea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                onPressEnter={handleKeyPress}
                style={inputStyle}
                placeholder="ការពិពណ៌នា"
                autoSize={{ minRows: 3, maxRows: 5 }}
              />
            </label>
          </Space>
        </Modal>
      </Spin>
    </>
  );
};

export default CategoryModal;
