
import React from 'react';
import { Button, Modal, Input, Radio, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './UserTable.css';

const ModalUser = ({
  isModalOpen,
  handleCancelForm,
  handleSubmit,
  id,
  fullname,
  username,
  password,
  contact,
  role,
  setFullname,
  setUsername,
  setPassword,
  setContact,
  setRole,
  setFile
}) => {
  const inputStyle = {
    height: '40px',
    fontSize: '15px',
  };

  const radioStyle = {
    marginTop: '15px',
    marginBottom: '15px',
  };

  const spaceStyle = {
    width: "100%"
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <Modal
        title={id === "" ? "បង្កើតគណនីថ្មី" : "កែប្រែគណនី" }
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCancelForm}
        maskClosable={false}
        keyboard={false}
        width={400}
        okText={id === "" ? "បង្កើត" : "កែប្រែ" }
        cancelText="បោះបង់"
      >
        <Space style={spaceStyle} direction="vertical">
          <Input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            onPressEnter={handleKeyPress}
            style={inputStyle}
            placeholder="ឈ្មោះ"
          />
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onPressEnter={handleKeyPress}
            style={inputStyle}
            placeholder="អ៊ីមែល ឬ លេខទូរស័ព្ទ"
          />
          {id === "" &&
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onPressEnter={handleKeyPress}
            style={inputStyle}
            placeholder="លេខសម្ងាត់"
          />
          }
          <Input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            onPressEnter={handleKeyPress}
            style={inputStyle}
            placeholder="លេខទំនាក់ទំនង"
          />
          <Radio.Group
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={radioStyle}
          >
            <Radio value={2}>បុគ្គលិក</Radio>
            <Radio value={3}>អ្នកគ្រប់គ្រង</Radio>
            <Radio value={1}>ថៅកែ</Radio>
          </Radio.Group>
          <Upload
            accept="image/*"
            showUploadList={false}
            customRequest={(e) => setFile(e.file)}
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

export default ModalUser;
