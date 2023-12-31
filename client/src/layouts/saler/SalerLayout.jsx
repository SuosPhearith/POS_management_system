import React, { useState, createContext } from "react";
import style from "./SalerLayout.module.css";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { IoReceipt } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import {
  BsFillCartFill,
  BsFillCartPlusFill,
  BsCartCheckFill,
} from "react-icons/bs";
import { BiSolidUserCircle } from "react-icons/bi";
import { BiSolidUserRectangle } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { BiSolidLogOut } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button, Dropdown } from "antd";
import logout from "../../utils/Logout";
import "../admin/Dropdown.css";
export const salerLayoutContext = createContext();

const Layout = ({ children }) => {
  const [print, setPrint] = useState(false);
  const [toggle, setToggle] = useState(true);
  const fullname = localStorage.getItem("fullname");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const menuUser = [
    {
      key: "1",
      label: <div>{fullname}</div>,
      icon: <BiSolidUserRectangle style={{ fontSize: "18px" }} />,
    },
    {
      key: "2",
      label: <div>{username}</div>,
      icon: <MdEmail style={{ fontSize: "18px" }} />,
    },
    {
      key: "3",
      label: <div>{role}</div>,
      icon: <FaUserTie style={{ fontSize: "18px" }} />,
    },
    {
      key: "4",
      label: <div>Logout</div>,
      icon: <BiSolidLogOut style={{ fontSize: "18px" }} />,
      onClick: () => logout(),
    },
  ];

  return (
    <salerLayoutContext.Provider value={{ print, setPrint }}>
      {print ? (
        <main className={style.layout_main}>{children}</main>
      ) : (
        <div className={style.body}>
          <div className={style.layout_container}>
            <div
              className={
                toggle ? style.layout_wrapper1_toggle : style.layout_wrapper1
              }
            >
              <div className={style.layout_logo}>POS</div>
              <div className={style.layout_route}>
                {/* Links and icons here */}
                <Link className={style.layout_link} to="/">
                  {toggle ? (
                    <BsFillCartFill className={style.layout_link_icon} />
                  ) : (
                    "លក់រាយ"
                  )}
                </Link>
                <Link className={style.layout_link} to="/productSale">
                  {toggle ? (
                    <BsFillCartPlusFill className={style.layout_link_icon} />
                  ) : (
                    "លក់ដំ"
                  )}
                </Link>
                <Link className={style.layout_link} to="/specialSale">
                  {toggle ? (
                    <BsCartCheckFill className={style.layout_link_icon} />
                  ) : (
                    "លក់ពិសេស"
                  )}
                </Link>
                <Link className={style.layout_link} to="/invoice">
                  {toggle ? (
                    <IoReceipt className={style.layout_link_icon} />
                  ) : (
                    "គ្រប់គ្រងវិកាលប័ត្រ"
                  )}
                </Link>
                <Link className={style.layout_link} to="/customer">
                  {toggle ? (
                    <FaUsers className={style.layout_link_icon} />
                  ) : (
                    "គ្រប់គ្រងអតិថិជន"
                  )}
                </Link>
              </div>
              <button
                className={style.layout_toggle}
                onClick={() => setToggle(!toggle)}
              >
                {toggle ? <BsChevronRight /> : <BsChevronLeft />}
              </button>
            </div>
            <div
              className={
                toggle ? style.layout_wrapper2_toggle : style.layout_wrapper2
              }
            >
              <div className={style.layout_header}>
                <Dropdown menu={{ items: menuUser }} placement="bottom">
                  <Button className={style.layout_profile}>
                    <div className={style.layout_profile_icon}>
                      <BiSolidUserCircle />
                    </div>
                    <div className={style.layout_profile_name}>{fullname}</div>
                  </Button>
                </Dropdown>
              </div>
              <main className={style.layout_main}>{children}</main>
            </div>
          </div>
        </div>
      )}
    </salerLayoutContext.Provider>
  );
};

export default Layout;
