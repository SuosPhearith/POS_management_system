import React from 'react';
import { Button, Modal, Input, Radio, Upload, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const SupplierModal = ({
    isModalOpen,
    handleSubmit,
    handleCancelForm,
    id,
    code,
    name,
    contact,
    address,
    email,
    file,
    setId,
    setCode,
    setName,
    setContact,
    setAddress,
    setEmail,
    setFile
}) => {
    const inputStyle = {
        height: '40px',
        fontSize: '15px',
    };
    const spaceStyle = {
        width: "100%",
        marginTop : '10px',
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    return (
        <>
            <Modal
                title={id === "" ? "បង្កើតអ្នកនាំចូលថ្មី" : "កែប្រែទិន្នន័យអ្នកនាំចូល"}
                open={isModalOpen}
                onOk={handleSubmit}
                onCancel={handleCancelForm}
                maskClosable={false}
                keyboard={false}
                width={400}
                okText={id === "" ? "បង្កើត" : "កែប្រែ"}
                cancelText="បោះបង់"
            >
                <Space style={spaceStyle} direction="vertical">
                    <Input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onPressEnter={handleKeyPress}
                        style={inputStyle}
                        placeholder="កូដ"
                    />
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onPressEnter={handleKeyPress}
                        style={inputStyle}
                        placeholder="ឈ្មោះ"
                    />
                    <Input
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        onPressEnter={handleKeyPress}
                        style={inputStyle}
                        placeholder="លេខទំនាក់ទំនង"
                    />
                    <Input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onPressEnter={handleKeyPress}
                        style={inputStyle}
                        placeholder="អាសយដ្ឋាន"
                    />
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onPressEnter={handleKeyPress}
                        style={inputStyle}
                        placeholder="អ៊ីមែល ឬ លេខទូរស័ព្ទ"
                    />
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
}

export default SupplierModal;
