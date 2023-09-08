
import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import dateConverter from '../../utils/DateConverter';
import './ReceiveProduct.css'

const ReceiveProductTable = ({ receiveProducts, handleDelete }) => {
    const footerStyle = {
        fontFamily: 'Khmer OS Content, sans-serif',
        height: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color : '#070024',
        backgroundColor : "#d3eded"
    }

    const columns = [
        {
            title: 'ល.រ',
            dataIndex: 'no',
            key: 'no',
            width: "5%",
            render: (value, record, index) => (index + 1),
        },
        {
            title: 'IDទំនិញ',
            dataIndex: 'product_id',
            key: 'product_id',
            width: "7%",
            render: (item=>{
                return(
                    `P-${item}`
                )
            })
        },
        {
            title: 'IDអ្នកនាំចូល',
            dataIndex: 'supplier_id',
            key: 'supplier_id',
            width: "8%",
            render: (item=>{
                return(
                    `S-${item}`
                )
            })
        },
        {
            title: 'IDអ្នកទិញ',
            dataIndex: 'user_id',
            key: 'user_id',
            width: "7%",
            render: (item=>{
                return(
                    `U-${item}`
                )
            })
        },
        {
            title: 'ចំនួនទិញចូល',
            dataIndex: 'quantity',
            key: 'quantity',
            width: "9%",
        },
        {
            title: 'តម្លៃទិញចូល',
            dataIndex: 'purchase_price',
            key: 'purchase_price',
            width: "8%",
            render: (value, record, index) => (value + " $"),
        },
        {
            title: 'តម្លៃទិញចូលសរុប',
            dataIndex: 'sub_total',
            key: 'sub_total',
            width: "10.5%",
            render: (value, record, index) => (value + " $"),
        },
        {
            title: 'តម្លៃរាយ',
            dataIndex: 'unit_price',
            key: 'unit_price',
            width: "7%",
            render: (value, record, index) => (value + " $"),
        },
        {
            title: 'តម្លៃដំ',
            dataIndex: 'product_price',
            key: 'product_price',
            width: "5%",
            render: (value, record, index) => (value + " $"),
        },
        {
            title: 'តម្លៃពិសេស',
            dataIndex: 'special_price',
            key: 'special_price',
            width: "8%",
            render: (value, record, index) => (value + " $"),
        },
        {
            title: 'ថ្ងៃកែចុងក្រោយ',
            dataIndex: 'updated_date',
            key: 'updated_date',
            width: "9%",
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
            width: "8%",
            render: (item) => {
                return (
                    dateConverter(item)
                )
            }
        },
        {
            title: 'សកម្មភាព',
            dataIndex: 'action',
            key: 'action',
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
                </Space>
            ),
        },
    ];
    const data = receiveProducts;
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{
                y: '64vh',
            }}
            footer={() => <div style={footerStyle}><h3>តារាងគ្រប់គ្រងការទិញចូល</h3></div>}
            rowKey='id'
        />
    );
}

export default ReceiveProductTable;

