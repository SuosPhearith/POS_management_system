import React from "react";
import { Button, Modal, Input, Upload, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const CreaeteCustomerModal = ({
  isModalOpenCustomer,
  handleCancelFormCustomer,
  handleSubmitCustomer,
  customerForm,
  setCustomerForm,
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
      handleSubmitCustomer();
    }
  };

  return (
    <>
      <Modal
        title={customerForm.id === "" ? "បង្កើតគណនីថ្មី" : "កែប្រែគណនី"}
        open={isModalOpenCustomer}
        onOk={handleSubmitCustomer}
        onCancel={handleCancelFormCustomer}
        maskClosable={false}
        keyboard={false}
        width={400}
        okText={customerForm.id === "" ? "បង្កើត" : "កែប្រែ"}
        cancelText="បោះបង់"
      >
        <Space style={spaceStyle} direction="vertical">
          <Input
            value={customerForm.name}
            onChange={(e) =>
              setCustomerForm({ ...customerForm, name: e.target.value })
            }
            onPressEnter={handleKeyPress}
            style={inputStyle}
            placeholder="ឈ្មោះ"
          />
          <Input
            value={customerForm.contact}
            onChange={(e) =>
              setCustomerForm({ ...customerForm, contact: e.target.value })
            }
            onPressEnter={handleKeyPress}
            style={inputStyle}
            placeholder="លេខទំនាក់ទំនង"
          />
          <Input
            value={customerForm.address}
            onChange={(e) =>
              setCustomerForm({ ...customerForm, address: e.target.value })
            }
            onPressEnter={handleKeyPress}
            style={inputStyle}
            placeholder="អាសយដ្ឋាន"
          />
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={(e) =>
              setCustomerForm({ ...customerForm, file: e.file })
            }
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

export default CreaeteCustomerModal;
