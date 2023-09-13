import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Upload, Space, Select, Spin, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import NumericInput from '../usefull/NumericInput';
import NumericInputFloat from '../usefull/NumbericInputFloat';
import './Product.css';
import errroHandler from '../../utils/ErrorHandler';
import request from '../../services/request';

const ProuductModal = ({
    isModalOpen,
    handleSubmit,
    handleCancelForm,
    form,
    setForm
}) => {
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        getListCategory();
        getListSupplier();
    }, [])
    // category getlist
    const getListCategory = async () => {
        try {
            setLoading(true);
            const response = await request("GET", "categories/getList");
            const categories = response.categories;
            const data = categories.map((item) => ({
                value: item.id.toString(),
                label: item.name
            }))
            setCategories(data);
        } catch (error) {
            errroHandler(error);
        } finally {
            setLoading(false);
        }
    }
    // category getlist
    const getListSupplier = async () => {
        try {
            setLoading(true);
            const response = await request("GET", "suppliers/getList");
            const suppliers = response.suppliers;
            const data = suppliers.map((item) => ({
                value: item.id.toString(),
                label: item.name
            }))
            setSuppliers(data);
        } catch (error) {
            errroHandler(error);
        } finally {
            setLoading(false);
        }
    }
    const inputStyle = {
        height: '40px',
        fontSize: '15px',
    };
    const selectStyle = {
        fontSize: '15px',
        width: "322px"
    }
    const spaceStyle = {
        width: "100%",
        marginTop: '10px'
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
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
        const selectedCategory = categories.find((item) => item.value === valueToFind);
        return selectedCategory ? selectedCategory.label : null; // Return the label if found, otherwise an empty string
    };
    const productForm = {
        id: "",
        box_code: "",
        unit_code: "",
        name: "",
        order_quantity: "",
        category_id: "",
        unit_quantity: "",
        purchase_price: "",
        product_price: "",
        unit_price: "",
        special_price: "",
        discount_per: "",
        reorder_level: "",
        description: "",
        file: "",
        supplier_id: "",
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
                    <form>
                        <Space style={spaceStyle} direction="vertical" size={20}>
                            <Space>
                                <Input
                                    value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })}
                                    onPressEnter={handleKeyPress}
                                    style={inputStyle}
                                    placeholder="ឈ្មោះ"
                                />
                                <Input
                                    value={form.box_code}
                                    onChange={e => setForm({ ...form, box_code: e.target.value })}
                                    onPressEnter={handleKeyPress}
                                    style={inputStyle}
                                    placeholder="បាកូដដំ"
                                />
                                <Input
                                    value={form.unit_code}
                                    onChange={e => setForm({ ...form, unit_code: e.target.value })}
                                    onPressEnter={handleKeyPress}
                                    style={inputStyle}
                                    placeholder="បាកូដរាយ"
                                />
                            </Space>
                            <Space style={{ width: '100%' }}>
                                <Select
                                    value={findLabel()}
                                    onChange={handleSelectChangeCategory}
                                    showSearch
                                    style={selectStyle}
                                    placeholder="ជ្រើសរើសប្រភេទទំនិញ"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={categories}
                                />
                                {
                                    form.id === "" &&
                                    <Select
                                        value={form.supplier_id}
                                        onChange={handleSelectChangeSupplier}
                                        showSearch
                                        style={selectStyle}
                                        placeholder="ជ្រើសរើសអ្នកនាំចូល"
                                        optionFilterProp="children"
                                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={suppliers}
                                    />
                                }
                            </Space>
                            <Radio.Group
                                value={form.cashType}
                                onChange={e => setForm({ ...form, cashType: e.target.value })}
                            >
                                <Radio value={'riel'}>លុយរៀល</Radio>
                                <Radio value={'dollar'}>លុយដុល្លា</Radio>
                            </Radio.Group>
                            <Space>
                                {
                                    form.id === "" &&
                                    <>
                                        <NumericInput
                                            value={form.order_quantity}
                                            onChange={e => setForm({ ...form, order_quantity: e.target.value })}
                                            onPressEnter={handleKeyPress}
                                            style={inputStyle}
                                            placeholder="ចំនួនទិញចូលដំ"
                                        />
                                        <NumericInput
                                            value={form.unit_quantity}
                                            onChange={e => setForm({ ...form, unit_quantity: e.target.value })}
                                            onPressEnter={handleKeyPress}
                                            style={inputStyle}
                                            placeholder="ចំនួនទំនិញក្នុងមួយដំ"
                                        />
                                    </>
                                }
                                <NumericInputFloat
                                    value={form.purchase_price}
                                    onChange={e => setForm({ ...form, purchase_price: e.target.value })}
                                    onPressEnter={handleKeyPress}
                                    style={inputStyle}
                                    placeholder="តម្លៃទិញចូលក្នុងមួយដំ"
                                />
                            </Space>
                            <Space>
                                <NumericInputFloat
                                    value={form.product_price}
                                    onChange={e => setForm({ ...form, product_price: e.target.value })}
                                    onPressEnter={handleKeyPress}
                                    style={inputStyle}
                                    placeholder="តម្លៃលក់ដំ"
                                />
                                <NumericInputFloat
                                    value={form.unit_price}
                                    onChange={e => setForm({ ...form, unit_price: e.target.value })}
                                    onPressEnter={handleKeyPress}
                                    style={inputStyle}
                                    placeholder="តម្លៃលក់រាយ"
                                />
                                <NumericInputFloat
                                    value={form.special_price}
                                    onChange={e => setForm({ ...form, special_price: e.target.value })}
                                    onPressEnter={handleKeyPress}
                                    style={inputStyle}
                                    placeholder="តម្លៃលក់ពិសេស"
                                />
                                <NumericInputFloat
                                    value={form.discount_per}
                                    onChange={e => setForm({ ...form, discount_per: e.target.value })}
                                    onPressEnter={handleKeyPress}
                                    style={inputStyle}
                                    placeholder="ភាគរយបញ្ចុះតម្លៃ"
                                />
                            </Space>
                            <Input.TextArea
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                onPressEnter={handleKeyPress}
                                style={inputStyle}
                                placeholder="ការពិពណ៌នា"
                                autoSize={{ minRows: 3, maxRows: 5 }}
                            />
                            <Upload
                                accept="image/*"
                                showUploadList={false}
                                customRequest={e => setForm({ ...form, file: e.file })}
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />} type="primary">
                                    រូបភាព
                                </Button>
                            </Upload>
                        </Space>
                    </form>
                </Modal>
            </Spin>
        </>
    );
}

export default ProuductModal;
