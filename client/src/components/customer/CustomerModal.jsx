import React from "react";
import { Button, Modal, Input, Upload, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CustomerModal = ({
  isModalOpen,
  handleCancelForm,
  handleSubmit,
  form,
  setForm,
}) => {
  const inputStyle = {
    height: "40px",
    fontSize: "15px",
  };

  const spaceStyle = {
    width: "100%",
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <Modal
        title={form.id === "" ? "បង្កើតគណនីថ្មី" : "កែប្រែគណនី"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancelForm}
        maskClosable={false}
        keyboard={false}
        width={400}
        okText={form.id === "" ? "បង្កើត" : "កែប្រែ"}
        cancelText="បោះបង់"
      >
        <Space style={spaceStyle} direction="vertical">
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onPressEnter={handleKeyPress}
            style={inputStyle}
            placeholder="ឈ្មោះ"
          />
          <Input
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            onPressEnter={handleKeyPress}
            style={inputStyle}
            placeholder="លេខទំនាក់ទំនង"
          />
          <Input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            onPressEnter={handleKeyPress}
            style={inputStyle}
            placeholder="អាសយដ្ឋាន"
          />
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
    </>
  );
};

export default CustomerModal;
