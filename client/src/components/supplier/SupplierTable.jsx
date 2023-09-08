import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons'
import './Supplier.css';
import dateConverter from '../../utils/DateConverter';
import ImageWithCover from '../usefull/ImageWithCover';

const UserTable = ({ suppliers, handleUpdate, handleDelete }) => {
  const columns = [
    {
      title: 'ល.រ',
      dataIndex: 'no',
      key: 'no',
      width: 70,
      render: (value, record, index) => (index + 1),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      render: (item=>{
          return(
              `S-${item}`
          )
      })
    },
    {
      title: 'កូដ',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'ឈ្មោះ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'អ៊ីមែល',
      dataIndex: 'email',
      key: 'email',
      width : 200
    },
    {
      title: 'លេខទំនាក់ទំនង',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'អាសយដ្ឋាន',
      dataIndex: 'address',
      key: 'address',
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
      key: 'created-date',
      width: 120,
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
      width: 80,
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
            onClick={() => handleUpdate(record.id, record.code, record.name, record.contact, record.address, record.email, record.image)}
          >
            <EditFilled />
          </Button>
        </Space>
      ),
    },
  ];
  const data = suppliers;
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
        y: "64vh",
      }}
      footer={() => <div style={footerStyle}><h3>តារាងបគ្រប់គ្រងអ្នកនាំចូល</h3></div>}
      rowKey='id'
    />
  );
}

export default UserTable;