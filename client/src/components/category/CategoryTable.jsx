import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import dateConverter from '../../utils/DateConverter';
import ImageWithCover from '../usefull/ImageWithCover';

const CategoryTable = ({ categories, handleUpdate, handleDelete }) => {
    const columns = [
        {
            title: 'ល.រ',
            dataIndex: 'no',
            key: 'no',
            width: 60,
            render: (value, record, index) => (index + 1),
        },
        {
            title: 'ឈ្មោះ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'លេខរៀងលំដាប់',
            dataIndex: 'sort_order',
            key: 'sort_order',
            width: 130,
        },
        {
            title: 'ការពិពណ៌នា',
            dataIndex: 'description',
            key: 'description',
            width: 250,
        },
        {
            title: 'ថ្ងៃកែចុងក្រោយ',
            dataIndex: 'updated_date',
            key: 'updated_date',
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
                        onClick={() => handleUpdate(record.id, record.name, record.description, record.sort_order, record.image)}
                    >
                        <EditFilled />
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
        color : '#070024',
        backgroundColor : "#d3eded"
    }
    return (
        <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{
                y: "64vh",
            }}
            footer={() => <div style={footerStyle}><h3>តារាងគ្រប់គ្រងប្រភេទទំនិញ</h3></div>}
            rowKey='id'
        />
    );
}

export default CategoryTable;
