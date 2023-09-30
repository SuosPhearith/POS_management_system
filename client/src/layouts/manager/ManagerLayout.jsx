import React, { useState, createContext } from "react";
import style from "./ManagerLayout.module.css";
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
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button, Dropdown } from "antd";
import logout from "../../utils/Logout";
import "../admin/Dropdown.css";
export const managerLayoutContext = createContext();

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
  const items = [
    {
      label: (
        <Link className={style.sub_layout_link} to="/sale">
          <div className={style.child_sub_layout_link}>លក់រាយ</div>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link className={style.sub_layout_link} to="/productSale">
          <div className={style.child_sub_layout_link}>លក់ដំ</div>
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link className={style.sub_layout_link} to="/specialSale">
          <div className={style.child_sub_layout_link}>លក់ពិសេស</div>
        </Link>
      ),
      key: "2",
    },
  ];

  const items2 = [
    {
      label: (
        <Link className={style.sub_layout_link} to="/product">
          <div className={style.child_sub_layout_link}>ទំនិញ</div>
        </Link>
      ),
      key: "3",
    },
    {
      label: (
        <Link className={style.sub_layout_link} to="/category">
          <div className={style.child_sub_layout_link}>ប្រភេទទំនិញ</div>
        </Link>
      ),
      key: "4",
    },
    {
      label: (
        <Link className={style.sub_layout_link} to="/receiveProduct">
          <div className={style.child_sub_layout_link}>ការទិញចូល</div>
        </Link>
      ),
      key: "5",
    },
  ];
  return (
    <managerLayoutContext.Provider value={{ print, setPrint }}>
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
                    <MdDashboard className={style.layout_link_icon} />
                  ) : (
                    "គ្រប់គ្រងទូទៅ"
                  )}
                </Link>
                <Dropdown
                  className={style.layout_link}
                  menu={{
                    items,
                  }}
                  placement="rightCenter"
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={(e) => e.preventDefault()}
                  >
                    {toggle ? (
                      <BsCartCheckFill className={style.layout_link_icon} />
                    ) : (
                      "លក់ទំនិញចេញ"
                    )}
                  </div>
                </Dropdown>
                <Dropdown
                  className={style.layout_link}
                  menu={{
                    items: items2,
                  }}
                  placement="rightCenter"
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={(e) => e.preventDefault()}
                  >
                    {toggle ? (
                      <BsFillBoxFill className={style.layout_link_icon} />
                    ) : (
                      "គ្រប់គ្រងទំនិញ"
                    )}
                  </div>
                </Dropdown>
                <Link className={style.layout_link} to="/supplier">
                  {toggle ? (
                    <FaUserTie className={style.layout_link_icon} />
                  ) : (
                    "គ្រប់គ្រងអ្នកនាំចូល"
                  )}
                </Link>
                <Link className={style.layout_link} to="/customer">
                  {toggle ? (
                    <FaUsers className={style.layout_link_icon} />
                  ) : (
                    "គ្រប់គ្រងអតិថិជន"
                  )}
                </Link>
                <Link className={style.layout_link} to="/invoice">
                  {toggle ? (
                    <IoReceipt className={style.layout_link_icon} />
                  ) : (
                    "គ្រប់គ្រងវិកាលប័ត្រ"
                  )}
                </Link>
                <Link className={style.layout_link} to="/rate">
                  {toggle ? (
                    <BsCashCoin className={style.layout_link_icon} />
                  ) : (
                    "អត្រាប្តូរប្រាក់"
                  )}
                </Link>
                <Link className={style.layout_link} to="/report">
                  {toggle ? (
                    <BsFillClipboardDataFill
                      className={style.layout_link_icon}
                    />
                  ) : (
                    "គ្រប់គ្រង់របាយការណ៏"
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
    </managerLayoutContext.Provider>
  );
};

export default Layout;
