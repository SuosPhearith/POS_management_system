import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons'
import dateConverter from '../../utils/DateConverter';
import ImageWithCover from '../usefull/ImageWithCover';

const CategoryTable = ({ categories, handleUpdate, handleDelete, handleAdd }) => {

    const columns = [
        {
            title: 'ល.រ',
            dataIndex: 'no',
            key: 'no',
            fixed: 'left',
            width: 60,
            render: (value, record, index) => (index + 1),
        },
        {
            title: 'ឈ្មោះ',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            width: 150,
        },
        {
            title: 'IDទំនិញ',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (item => {
                return (
                    `P-${item}`
                )
            })
        },
        {
            title: 'លេខកូដដំ',
            dataIndex: 'box_code',
            key: 'box_code',
            width: 150,
        },
        {
            title: 'លេខកូដរាយ',
            dataIndex: 'unit_code',
            key: 'unit_code',
            width: 150,
        },
        {
            title: 'ចំនួនដំទិញចូល',
            dataIndex: 'order_quantity',
            key: 'order_quantity',
            width: 150,
        },
        {
            title: 'ចំនួនរាយក្នុងដំ',
            dataIndex: 'unit_quantity',
            key: 'unit_quantity',
            width: 150,
        },
        {
            title: 'ចំនួនរាយទិញចូល',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 150,
        },

        {
            title: 'ឈ្មោះប្រភេទទំនិញ',
            dataIndex: 'category_name',
            key: 'category_name',
            width: 150,
        },
        {
            title: 'ប្រភេទប្រាក់',
            dataIndex: 'cashType',
            key: 'cashtype',
            width: 150,
            render: (item => {
                return (
                    <>{item === 'riel'?'រៀល':"ដុល្លា"}</>
                )
            })
        },
        {
            title: 'តម្លៃទិញចូល',
            dataIndex: 'purchase_price',
            key: 'purchase_price',
            width: 150,
        },
        {
            title: 'តម្លៃលក់ដំ',
            dataIndex: 'product_price',
            key: 'product_price',
            width: 150,
        },
        {
            title: 'តម្លៃលក់រាយ',
            dataIndex: 'unit_price',
            key: 'unit_price',
            width: 150,
        },
        {
            title: 'តម្លៃលក់ពិសេស',
            dataIndex: 'special_price',
            key: 'special_price',
            width: 150,
        },
        {
            title: 'ភាគរយបញ្ចុះតម្លៃ',
            dataIndex: 'discount_per',
            key: 'discount_per',
            width: 150,
        },
        {
            title: 'ពិពណ៌នាទំនិញ',
            dataIndex: 'description',
            key: 'description',
            width: 250,
        },
        {
            title: 'អ្នកកែចុងក្រោយ',
            dataIndex: 'user_id',
            key: 'user_id',
            width: 150,
        },
        {
            title: 'ថ្ងៃកែចុងក្រោយ',
            dataIndex: 'updated_date',
            key: 'updated_date',
            width: 150,
            render: (item) => {
                return (
                    dateConverter(item)
                )
            }
        },
        {
            title: 'ថ្ងៃបង្កើត',
            dataIndex: 'created_date',
            key: 'created_date',
            width: '15%',
            width: 150,
            render: (item) => {
                return (
                    dateConverter(item)
                )
            }
        },
        {
            title: 'រូបថត',
            dataIndex: 'image',
            key: 'image',
            width: '15%',
            width: 100,
            render: (item) => {
                return <>
                    {item != null ?
                        <ImageWithCover src={item} alt="image" />
                        : <ImageWithCover src={""} alt="image" />
                    }
                </>
            },
        },
        {
            title: 'សកម្មភាព',
            dataIndex: 'action',
            key: 'action',
            fixed: 'right',
            width: 180,
            render: (value, record) => (
                <Space>
                    <Popconfirm
                        title="លុបគណនី"
                        description="តើអ្នកចង់លុបមែនឬទេ?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="លុប"
                        cancelText="បោះបង់"
                    >
                        <Button danger><DeleteFilled /></Button>
                    </Popconfirm>
                    <Button type='primary'
                        onClick={() => handleUpdate(
                            record.id,
                            record.box_code,
                            record.unit_code,
                            record.name,
                            record.category_id,
                            record.cashType,
                            record.purchase_price,
                            record.product_price,
                            record.unit_price,
                            record.special_price,
                            record.discount_per,
                            record.description,
                            record.user_id,
                            record.image
                        )}
                    >
                        <EditFilled />
                    </Button>
                    <Button type='primary'
                        onClick={() => handleAdd(
                            record.id,
                            record.name,
                            record.cashType,
                            record.purchase_price,
                            record.product_price,
                            record.unit_price,
                            record.special_price
                        )}
                    >
                        <PlusOutlined />
                    </Button>
                </Space>
            ),
        },
    ];
    const data = categories;
    const footerStyle = {
        fontFamily: 'Khmer OS Content, sans-serif',
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: '#070024',
        backgroundColor: "#d3eded"
    }
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{
                x: 1200,
                y: "64vh",
            }}
            footer={() => <div style={footerStyle}><h3>តារាងគ្រប់គ្រងប្រភេទទំនិញ</h3></div>}
            rowKey='id'
        />
    );
}

export default CategoryTable;
