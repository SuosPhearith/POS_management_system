import React, { useState } from 'react';
import style from './AdminLayout.module.css';
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";
import { BsFillBoxFill } from "react-icons/bs";
import { MdDashboard } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { IoReceipt } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import { BiSolidUserRectangle } from "react-icons/bi";
import { BsCashCoin } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { BiSolidLogOut } from "react-icons/bi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaTruck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'antd';
import logout from '../../utils/Logout';

const Layout = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const fullname = localStorage.getItem('fullname');
  const username = localStorage.getItem('username');
  const role = localStorage.getItem('role');
  const menuUser = [
    {
      key: '1',
      label: (
        <div>
          {fullname}
        </div>
      ),
      icon: <BiSolidUserRectangle style={{ fontSize: "18px" }} />
    },
    {
      key: '2',
      label: (
        <div>
          {username}
        </div>
      ),
      icon: <MdEmail style={{ fontSize: "18px" }} />
    },
    {
      key: '3',
      label: (
        <div>
          {role}
        </div>
      ),
      icon: <FaUserTie style={{ fontSize: "18px" }} />
    },
    {
      key: '4',
      label: (
        <div>
          Logout
        </div>
      ),
      icon: <BiSolidLogOut style={{ fontSize: "18px" }} />,
      onClick: ()=>logout(),
    },
  ];
  return (
    <>
      <div className={style.body}>
        <div className={style.layout_container}>
          <div className={toggle ? style.layout_wrapper1_toggle : style.layout_wrapper1}>
            <div className={style.layout_logo}>
              POS
            </div>
            <div className={style.layout_route}>
              {/* Links and icons here */}
              <Link className={style.layout_link} to='/'>{toggle ? <MdDashboard className={style.layout_link_icon} /> : "គ្រប់គ្រងទូទៅ"}</Link>
              <Link className={style.layout_link} to='/sale'>{toggle ? <BsCartCheckFill className={style.layout_link_icon} /> : "លក់ទំនិញចេញ"}</Link>
              <Link className={style.layout_link} to='/product'>{toggle ? <BsFillBoxFill className={style.layout_link_icon} /> : "គ្រប់គ្រងទំនិញ"}</Link>
              <Link className={style.layout_link} to='/category'>{toggle ? <BiSolidCategoryAlt className={style.layout_link_icon} /> : "គ្រប់គ្រងប្រភេទទំនិញ"}</Link>
              <Link className={style.layout_link} to='/receiveProduct'>{toggle ? <FaTruck className={style.layout_link_icon} /> : "គ្រប់គ្រងការទិញចូល"}</Link>
              <Link className={style.layout_link} to='/user'>{toggle ? <FaUserEdit className={style.layout_link_icon} /> : "គ្រប់គ្រងបុគ្គលិក"}</Link>
              <Link className={style.layout_link} to='/supplier'>{toggle ? <FaUserTie className={style.layout_link_icon} /> : "គ្រប់គ្រងអ្នកនាំចូល"}</Link>
              <Link className={style.layout_link} to='/invoice'>{toggle ? <IoReceipt className={style.layout_link_icon} /> : "គ្រប់គ្រងវិកាលប័ត្រ"}</Link>
              <Link className={style.layout_link} to='/rate'>{toggle ? <BsCashCoin className={style.layout_link_icon} /> : "អត្រាប្តូរប្រាក់"}</Link>
              <Link className={style.layout_link} to='/report'>{toggle ? <BsFillClipboardDataFill className={style.layout_link_icon} /> : "គ្រប់គ្រង់របាយការណ៏"}</Link>
            </div>
            <button className={style.layout_toggle} onClick={() => setToggle(!toggle)}>
              {toggle ? <BsChevronRight /> : <BsChevronLeft />}
            </button>
          </div>
          <div className={toggle ? style.layout_wrapper2_toggle : style.layout_wrapper2}>
            <div className={style.layout_header}>
              <Dropdown menu={{ items: menuUser }} placement="bottom">
                <Button className={style.layout_profile} >
                  <div className={style.layout_profile_icon} ><BiSolidUserCircle /></div>
                  <div className={style.layout_profile_name}>{fullname}</div>
                </Button>
              </Dropdown>
            </div>
            <main className={style.layout_main}>
              {children}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
