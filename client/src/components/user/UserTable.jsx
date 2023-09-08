import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { DeleteFilled, EditFilled, UnlockOutlined } from '@ant-design/icons'
import './UserTable.css';
import dateConverter from '../../utils/DateConverter';
import ImageWithCover from '../usefull/ImageWithCover';

const UserTable = ({ users, handleUpdate, handleDelete, handleChangePassword }) => {

  const columns = [
    {
      title: 'ល.រ',
      dataIndex: 'no',
      key: 'no',
      width : "5%",
      render: (value, record, index) => (index + 1),
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width : '8%',
      render: (item=>{
          return(
              `U-${item}`
          )
      })
    },
    {
      title: 'ឈ្មោះ',
      dataIndex: 'fullname',
      key: 'fullname',
      width : "9%",
    },
    {
      title: 'ឈ្មោះគណនី',
      dataIndex: 'username',
      key: 'username',
      width : "13%",
    },
    {
      title: 'លេខទំនាក់ទំនង',
      dataIndex: 'contact',
      key: 'contact',
      width : "9%",
    },
    {
      title: 'តួនាទី',
      dataIndex: 'role_id',
      key: 'role_id',
      width : "8%",
      render: (item) => {
        return (item === 1 ? "ថៅកែ" : item === 2 ? "អ្នកលក់" : "អ្នកគ្រប់គ្រង")
      }
    },
    {
      title: 'ថ្ងៃកែចុងក្រោយ',
      dataIndex: 'updated_date',
      key: 'updated_date',
      width : "12%",
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
      width : "12%",
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
      width : "8%",
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
            description="តើអ្នកចង់លុបគណនីមែនឬទេ?"
            onConfirm={() => handleDelete(record.id)}
            okText="លុប"
            cancelText="បោះបង់"
          >
            <Button danger><DeleteFilled /></Button>
          </Popconfirm>
          <Button type='primary'
            onClick={() => handleUpdate(record.id, record.fullname, record.username, record.password, record.contact, record.role_id, record.image)}
          >
            <EditFilled />
          </Button>
          <Button type='primary'
            onClick={() => handleChangePassword(record.id)}
          >
            <UnlockOutlined />
          </Button>
        </Space>
      ),
    },
  ];
  const data = users;
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
      footer={() => <div style={footerStyle}><h3>តារាងបគ្រប់គ្រងបុគ្គលិក</h3></div>}
      rowKey='id'
    />
  );
}

export default UserTable;