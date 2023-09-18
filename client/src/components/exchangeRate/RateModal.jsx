import React from "react";
import { Modal, Space } from "antd";
import NumericInput from "../usefull/NumbericInputFloat";

const RateModal = ({
  isModalOpen,
  handleSubmit,
  handleCancelForm,
  exchange,
  setExchange,
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
        title="កែប្រែទិន្នន័យ"
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancelForm}
        maskClosable={false}
        keyboard={false}
        width={330}
        okText="កែប្រែ"
        cancelText="បោះបង់"
      >
        <Space style={spaceStyle}>
          <div style={{ fontSize: "20px " }}>1$ = </div>
          <NumericInput
            value={exchange}
            onChange={(e) => setExchange(e.target.value)}
            onPressEnter={handleKeyPress}
            style={inputStyle}
            placeholder="លុយរៀល"
          />
          <div style={{ fontSize: "20px " }}>៛</div>
        </Space>
      </Modal>
    </>
  );
};

export default RateModal;
