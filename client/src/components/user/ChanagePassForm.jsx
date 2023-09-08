import { Modal, Input, Space } from 'antd';
import React from 'react';

const ChanagePassForm = ({
    isFormOpen,
    submitChangePassword,
    handleCancelFormChangePassword,
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword
}) => {
    const inputStyle = {
        height: '40px',
        fontSize: '15px',
    };
    const spaceStyle = {
        width : "100%",
        marginBottom: "15px",
        marginTop: "15px",
    }
    return (
        <>
            <Modal
                title="ប្តូរលេខសម្ងាត់"
                open={isFormOpen}
                onOk={submitChangePassword}
                onCancel={handleCancelFormChangePassword}
                maskClosable={false}
                keyboard={false}
                width={400}
                okText="ប្តូរលេខសម្ងាត់"
                cancelText="បោះបង់"
            >
                <Space
                    direction='vertical'
                    style={spaceStyle}
                >
                    <Input.Password
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        placeholder="លេខសម្ងាត់ថ្មី"
                    />
                    <Input.Password
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={inputStyle}
                        placeholder="បញ្ជាក់លេខសម្ងាត់ថ្មី"
                    />
                </Space>
            </Modal>
        </>
    );
}

export default ChanagePassForm;
