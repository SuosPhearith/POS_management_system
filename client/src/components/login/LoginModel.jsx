import { Modal, Input, Space } from "antd";
import React from "react";

const LoginModel = ({
  isFormOpen,
  form,
  setForm,
  handleSubmit,
  handleCancel,
}) => {
  const inputStyle = {
    height: "40px",
    fontSize: "15px",
  };
  const spaceStyle = {
    width: "100%",
    marginBottom: "15px",
    marginTop: "15px",
  };
  return (
    <>
      <Modal
        title="Reset"
        open={isFormOpen}
        onOk={handleSubmit}
        onCancel={handleCancel}
        maskClosable={false}
        keyboard={false}
        width={400}
        okText="Reset"
        cancelText="បោះបង់"
      >
        <Space direction="vertical" style={spaceStyle}>
          <Input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            style={inputStyle}
            placeholder="ឈ្មោះគណនី"
          />
          <Input.Password
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={inputStyle}
            placeholder="លេខសម្ងាត់"
          />
          <Input.Password
            value={form.adminPassword}
            onChange={(e) =>
              setForm({ ...form, adminPassword: e.target.value })
            }
            style={inputStyle}
            placeholder="key"
          />
        </Space>
      </Modal>
    </>
  );
};

export default LoginModel;
