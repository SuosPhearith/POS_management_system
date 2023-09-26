import React from "react";
import { Modal, Space, Checkbox } from "antd";
import NumericInputFloat from "../usefull/NumbericInputFloat";
import style from "./Invoice.module.css";

const RateModal = ({
  isModalOpenPayback,
  handleSubmitPayback,
  handleCancelFormPayback,
  paybackForm,
  setPaybackForm,
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
      handleSubmitPayback();
    }
  };
  const onChange = (e) => {
    setPaybackForm({
      ...paybackForm,
      payAll: e.target.checked,
    });
  };
  return (
    <>
      <Modal
        title="សងលុយ"
        open={isModalOpenPayback}
        onOk={handleSubmitPayback}
        onCancel={handleCancelFormPayback}
        maskClosable={false}
        keyboard={false}
        width={330}
        okText="សង"
        cancelText="បោះបង់"
      >
        <Space style={spaceStyle} direction="vertical">
          <label>
            <span style={{ color: "blue" }}>*ប្រាក់ជំពាក់សរុបគិតជា$</span>
            <NumericInputFloat
              value={`${paybackForm.debt}$`}
              onPressEnter={handleKeyPress}
              style={inputStyle}
              placeholder="ប្រាក់ជំពាក់សរុប"
            />
          </label>
          <label>
            <span style={{ color: "blue" }}>*បញ្ចូលលុយសងគិតជា$</span>
            <NumericInputFloat
              value={paybackForm.payback}
              onChange={(e) =>
                setPaybackForm({ ...paybackForm, payback: e.target.value })
              }
              onPressEnter={handleKeyPress}
              style={inputStyle}
              placeholder="បញ្ចូលលុយសង"
            />
          </label>
          <Checkbox onChange={onChange} checked={paybackForm.payAll}>
            <div className={style.checkboxFont}>សងទាំងអស់</div>
          </Checkbox>
        </Space>
      </Modal>
    </>
  );
};

export default RateModal;
