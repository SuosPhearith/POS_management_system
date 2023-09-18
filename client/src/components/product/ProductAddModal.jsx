import React, { useEffect, useState } from "react";
import { Modal, Input, Space, Select, Spin, Radio } from "antd";
import NumericInput from "../usefull/NumericInput";
import NumericInputFloat from "../usefull/NumbericInputFloat";
import "./Product.css";
import errroHandler from "../../utils/ErrorHandler";
import request from "../../services/request";

const ProuductAddModal = ({
  isModalOpenAdd,
  handleSubmitAdd,
  handleCancelFormAdd,
  formAdd,
  setFormAdd,
}) => {
  const [loading, setLoading] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    getListSupplier();
  }, []);
  // supplier getlist
  const getListSupplier = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "suppliers/getList");
      const suppliers = response.suppliers;
      const data = suppliers.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      }));
      setSuppliers(data);
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
  const selectStyle = {
    fontSize: "15px",
    width: "322px",
  };
  const spaceStyle = {
    width: "100%",
    marginTop: "10px",
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmitAdd();
    }
  };
  const handleSelectChangeSupplier = (value) => {
    setFormAdd({ ...formAdd, supplier_id: value });
  };
  return (
    <>
      <Spin spinning={loading}>
        <Modal
          title="បន្ថែមទំនិញ"
          open={isModalOpenAdd}
          onOk={handleSubmitAdd}
          onCancel={handleCancelFormAdd}
          maskClosable={false}
          keyboard={false}
          width={700}
          okText="បន្ថែម"
          cancelText="បោះបង់"
        >
          <formAdd>
            <Space style={spaceStyle} direction="vertical" size={20}>
              <Space>
                <label>
                  <span style={{ color: "blue" }}>*ឈ្មោះ</span>
                  <Input
                    value={formAdd.name}
                    style={inputStyle}
                    placeholder="ឈ្មោះ"
                  />
                </label>
                <label>
                  <span style={{ color: "blue" }}>*IDទំនិញ</span>
                  <Input
                    value={formAdd.id}
                    style={inputStyle}
                    placeholder="IDទំនិញ"
                  />
                </label>
              </Space>
              <Radio.Group
                value={formAdd.cashType}
                onChange={(e) =>
                  setFormAdd({ ...formAdd, cashType: e.target.value })
                }
              >
                <Radio value={"riel"}>លុយរៀល</Radio>
                <Radio value={"dollar"}>លុយដុល្លា</Radio>
              </Radio.Group>
              <Space>
                <label>
                  <span style={{ color: "blue" }}>*តម្លៃទិញចូលក្នុងមួយដំ </span>
                  <NumericInputFloat
                    value={formAdd.purchase_price}
                    onChange={(e) =>
                      setFormAdd({ ...formAdd, purchase_price: e.target.value })
                    }
                    onPressEnter={handleKeyPress}
                    style={inputStyle}
                    placeholder="តម្លៃទិញចូលក្នុងមួយដំ"
                  />
                </label>
                <label>
                  <span style={{ color: "blue" }}>*តម្លៃលក់ដំ </span>
                  <NumericInputFloat
                    value={formAdd.product_price}
                    onChange={(e) =>
                      setFormAdd({ ...formAdd, product_price: e.target.value })
                    }
                    onPressEnter={handleKeyPress}
                    style={inputStyle}
                    placeholder="តម្លៃលក់ដំ"
                  />
                </label>
                <label>
                  <span style={{ color: "blue" }}>*តម្លៃលក់រាយ </span>
                  <NumericInputFloat
                    value={formAdd.unit_price}
                    onChange={(e) =>
                      setFormAdd({ ...formAdd, unit_price: e.target.value })
                    }
                    onPressEnter={handleKeyPress}
                    style={inputStyle}
                    placeholder="តម្លៃលក់រាយ"
                  />
                </label>
                <label>
                  <span style={{ color: "blue" }}>*តម្លៃលក់ពិសេស </span>
                  <NumericInputFloat
                    value={formAdd.special_price}
                    onChange={(e) =>
                      setFormAdd({ ...formAdd, special_price: e.target.value })
                    }
                    onPressEnter={handleKeyPress}
                    style={inputStyle}
                    placeholder="តម្លៃលក់ពិសេស"
                  />
                </label>
              </Space>
              <label>
                <span style={{ color: "blue" }}>*ចំនួនទិញចូលបន្ថែមដំ </span>
                <NumericInput
                  value={formAdd.order_quantity}
                  onChange={(e) =>
                    setFormAdd({ ...formAdd, order_quantity: e.target.value })
                  }
                  onPressEnter={handleKeyPress}
                  style={inputStyle}
                  placeholder="ចំនួនទិញចូលបន្ថែមដំ"
                />
              </label>
              <Space direction="vertical">
                <label>
                  <span style={{ color: "blue" }}>*ជ្រើសរើសអ្នកនាំចូល </span>
                </label>
                <Select
                  value={formAdd.supplier_id}
                  onChange={handleSelectChangeSupplier}
                  showSearch
                  style={selectStyle}
                  placeholder="ជ្រើសរើសអ្នកនាំចូល"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={suppliers}
                />
              </Space>
            </Space>
          </formAdd>
        </Modal>
      </Spin>
    </>
  );
};

export default ProuductAddModal;
