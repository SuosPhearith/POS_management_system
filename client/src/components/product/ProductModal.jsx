import React, { useEffect, useState } from "react";
import { Button, Modal, Input, Upload, Space, Select, Spin, Radio } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import NumericInput from "../usefull/NumericInput";
import NumericInputFloat from "../usefull/NumbericInputFloat";
import "./Product.css";
import errroHandler from "../../utils/ErrorHandler";
import request from "../../services/request";

const ProuductModal = ({
  isModalOpen,
  handleSubmit,
  handleCancelForm,
  form,
  setForm,
}) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    getListCategory();
    getListSupplier();
  }, []);
  // category getlist
  const getListCategory = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "categories/getList");
      const categories = response.categories;
      const data = categories.map((item) => ({
        value: item.id.toString(),
        label: item.name,
      }));
      setCategories(data);
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };
  // category getlist
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
      handleSubmit();
    }
  };
  const handleSelectChangeCategory = (value) => {
    setForm({ ...form, category_id: value });
  };
  const handleSelectChangeSupplier = (value) => {
    setForm({ ...form, supplier_id: value });
  };
  const findLabel = () => {
    const valueToFind = String(form.category_id);
    const selectedCategory = categories.find(
      (item) => item.value === valueToFind
    );
    return selectedCategory ? selectedCategory.label : null; // Return the label if found, otherwise an empty string
  };
  return (
    <>
      <Spin spinning={loading}>
        <Modal
          title={form.id === "" ? "បង្កើតទំនិញថ្មី" : "កែប្រែទិន្នន័យទំនិញ"}
          open={isModalOpen}
          onOk={handleSubmit}
          onCancel={handleCancelForm}
          maskClosable={false}
          keyboard={false}
          width={700}
          okText={form.id === "" ? "បង្កើត" : "កែប្រែ"}
          cancelText="បោះបង់"
        >
          <Space style={spaceStyle} direction="vertical" size={20}>
            <Space>
              <label>
                <span style={{ color: "blue" }}>*ឈ្មោះ</span>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onPressEnter={handleKeyPress}
                  style={inputStyle}
                  placeholder="ឈ្មោះ"
                />
              </label>
              <label>
                <span style={{ color: "blue" }}>*បាកូដដំ</span>
                <Input
                  value={form.box_code}
                  onChange={(e) =>
                    setForm({ ...form, box_code: e.target.value })
                  }
                  onPressEnter={handleKeyPress}
                  style={inputStyle}
                  placeholder="បាកូដដំ"
                />
              </label>
              <label>
                <span style={{ color: "blue" }}>*បាកូដរាយ</span>
                <Input
                  value={form.unit_code}
                  onChange={(e) =>
                    setForm({ ...form, unit_code: e.target.value })
                  }
                  onPressEnter={handleKeyPress}
                  style={inputStyle}
                  placeholder="បាកូដរាយ"
                />
              </label>
            </Space>
            <Space style={{ width: "100%" }}>
              <label
                style={{
                  display: "flex,",
                  flexDirection: "column",
                }}
              >
                <div style={{ color: "blue" }}>*ជ្រើសរើសប្រភេទទំនិញ</div>
                <Select
                  value={findLabel()}
                  onChange={handleSelectChangeCategory}
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
                  options={categories}
                />
              </label>

              {form.id === "" && (
                <label>
                  <span style={{ color: "blue" }}>*ជ្រើសរើសអ្នកនាំចូល</span>
                  <Select
                    value={form.supplier_id}
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
                </label>
              )}
            </Space>
            <Radio.Group
              value={form.cashType}
              onChange={(e) => setForm({ ...form, cashType: e.target.value })}
            >
              <Radio value={"riel"}>លុយរៀល</Radio>
              <Radio value={"dollar"}>លុយដុល្លា</Radio>
            </Radio.Group>
            <Space>
              {form.id === "" && (
                <>
                  <label>
                    <span style={{ color: "blue" }}>*ចំនួនទិញចូលដំ</span>
                    <NumericInput
                      value={form.order_quantity}
                      onChange={(e) =>
                        setForm({ ...form, order_quantity: e.target.value })
                      }
                      onPressEnter={handleKeyPress}
                      style={inputStyle}
                      placeholder="ចំនួនទិញចូលដំ"
                    />
                  </label>
                  <label>
                    <span style={{ color: "blue" }}>*ចំនួនទំនិញក្នុងមួយដំ</span>
                    <NumericInput
                      value={form.unit_quantity}
                      onChange={(e) =>
                        setForm({ ...form, unit_quantity: e.target.value })
                      }
                      onPressEnter={handleKeyPress}
                      style={inputStyle}
                      placeholder="ចំនួនទំនិញក្នុងមួយដំ"
                    />
                  </label>
                </>
              )}
              <label>
                <span style={{ color: "blue" }}>*តម្លៃទិញចូលក្នុងមួយដំ</span>
                <NumericInputFloat
                  value={form.purchase_price}
                  onChange={(e) =>
                    setForm({ ...form, purchase_price: e.target.value })
                  }
                  onPressEnter={handleKeyPress}
                  style={inputStyle}
                  placeholder="តម្លៃទិញចូលក្នុងមួយដំ"
                />
              </label>
            </Space>
            <Space>
              <label>
                <span style={{ color: "blue" }}>*តម្លៃលក់ដំ</span>
                <NumericInputFloat
                  value={form.product_price}
                  onChange={(e) =>
                    setForm({ ...form, product_price: e.target.value })
                  }
                  onPressEnter={handleKeyPress}
                  style={inputStyle}
                  placeholder="តម្លៃលក់ដំ"
                />
              </label>
              <label>
                <span style={{ color: "blue" }}>*តម្លៃលក់រាយ</span>
                <NumericInputFloat
                  value={form.unit_price}
                  onChange={(e) =>
                    setForm({ ...form, unit_price: e.target.value })
                  }
                  onPressEnter={handleKeyPress}
                  style={inputStyle}
                  placeholder="តម្លៃលក់រាយ"
                />
              </label>
              <label>
                <span style={{ color: "blue" }}>*តម្លៃលក់ពិសេស</span>
                <NumericInputFloat
                  value={form.special_price}
                  onChange={(e) =>
                    setForm({ ...form, special_price: e.target.value })
                  }
                  onPressEnter={handleKeyPress}
                  style={inputStyle}
                  placeholder="តម្លៃលក់ពិសេស"
                />
              </label>
              <label>
                <span style={{ color: "blue" }}>*ភាគរយបញ្ចុះតម្លៃ</span>
                <NumericInputFloat
                  value={form.discount_per}
                  onChange={(e) =>
                    setForm({ ...form, discount_per: e.target.value })
                  }
                  onPressEnter={handleKeyPress}
                  style={inputStyle}
                  placeholder="ភាគរយបញ្ចុះតម្លៃ"
                />
              </label>
            </Space>
            <label style={{ width: "100%" }}>
              <span style={{ color: "blue" }}>*ការពិពណ៌នា</span>
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

            <Upload
              accept="image/*"
              showUploadList={false}
              customRequest={(e) => setForm({ ...form, file: e.file })}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />} type="primary">
                រូបភាព
              </Button>
            </Upload>
          </Space>
        </Modal>
      </Spin>
    </>
  );
};

export default ProuductModal;
