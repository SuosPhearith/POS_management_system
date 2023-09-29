import React from "react";
import { Button, Modal, Input, Upload, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import NumericInput from "../usefull/NumericInput";

const CategoryModal = ({
  isModalOpen,
  handleSubmit,
  handleCancelForm,
  form,
  setForm,
}) => {
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
  return (
    <>
      <Modal
        title={
          form.id === "" ? "បង្កើតប្រភេទទំនិញថ្មី" : "កែប្រែទិន្នន័យប្រភេទទំនិញ"
        }
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancelForm}
        maskClosable={false}
        keyboard={false}
        width={400}
        okText={form.id === "" ? "បង្កើត" : "កែប្រែ"}
        cancelText="បោះបង់"
      >
        <form>
          <Space style={spaceStyle} direction="vertical">
            <label style={{ width: "100%" }}>
              <span style={{ color: "blue" }}>*ឈ្មោះ</span>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onPressEnter={handleKeyPress}
                style={inputStyle}
                placeholder="ឈ្មោះ"
              />
            </label>
            <label style={{ width: "100%" }}>
              <span style={{ color: "blue" }}>*លេខរៀងបង្ហាញ</span>
              <NumericInput
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                onPressEnter={handleKeyPress}
                style={inputStyle}
                placeholder="លេខរៀងបង្ហាញ"
              />
            </label>
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
        </form>
      </Modal>
    </>
  );
};

export default CategoryModal;
