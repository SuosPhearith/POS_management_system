import React, { useEffect, useState } from "react";
import UserTable from "../../components/user/UserTable";
import style from "./UserPage.module.css";
import Search from "../../components/search/Search";
import { Button, message } from "antd";
import request from "../../services/request";
import errroHandler from "../../utils/ErrorHandler";
import { Spin } from "antd";
import ModalUser from "../../components/user/ModalUser";
import ChanagePassForm from "../../components/user/ChanagePassForm";
const UserPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState(2);
  const [file, setFile] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const handleClear = () => {
    setFile();
    setContact("");
    setUsername("");
    setFullname("");
    setPassword("");
    setRole(2);
    setId("");
    setConfirmPassword("");
    setIsModalOpen(false);
  };
  useEffect(() => {
    getUsers();
  }, []);
  // Get list all users
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await request("GET", "users/getList");
      setUsers(response.users);
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };

  // Insert function
  const insertUser = async (
    fullname = "",
    username = "",
    password = "",
    contact = "",
    role = "",
    file = null
  ) => {
    if (validationError()) return;
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("contact", contact);
      formData.append("role", role);
      formData.append("file", file);
      const response = await request("POST", "users/register", formData);
      message.success(response.message);
      handleClear();
      getUsers();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };
  // Update function
  const UpdateUser = async () => {
    if (validationError()) return;
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("contact", contact);
      formData.append("role", role);
      formData.append("file", file);
      console.log(formData);
      const response = await request("PUT", `users/update/${id}`, formData);
      message.success(response.message);
      handleClear();
      getUsers();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };
  // Delete function
  const deleteUser = async (id = "") => {
    if (!id) {
      return message.error("មិនមានID!!");
    }
    try {
      setLoading(true);
      const response = await request("DELETE", `users/delete/${id}`);
      message.success(response.message);
      handleClear();
      getUsers();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };
  // validate change password
  const validateChangePassword = () => {
    if (!id) {
      message.error("មិនមានID!!");
      return true;
    }
    if (password.length < 3 || password.length > 15) {
      message.error("សូមបញ្ជុលពាក្យសម្ងាត់ថ្មីចន្លោះ ៣ ទៅ ១៥ អក្សរ!");
      return true;
    }
    if (password === "") {
      message.error("សូមបញ្ជុលពាក្យសម្ងាត់ថ្មី!");
      return true;
    }
    if (confirmPassword === "" || confirmPassword !== password) {
      message.error("ការបញ្ចាក់ពាក្យសម្ងាត់ថ្មីមិនត្រឹមងត្រូវ!");
      return true;
    }
    return false;
  };
  // Change password function
  const changePassword = async (
    id = "",
    password = "",
    confirmPassword = ""
  ) => {
    if (validateChangePassword()) return;
    try {
      setLoading(true);
      const data = {
        password: password,
        confirmPassword: confirmPassword,
      };
      const response = await request("PUT", `users/resetPassword/${id}`, data);
      message.success(response.message);
      handleCancelFormChangePassword();
      getUsers();
    } catch (error) {
      errroHandler(error);
    } finally {
      setLoading(false);
    }
  };
  // Handle change password
  const handleChangePassword = (id) => {
    setIsFormOpen(true);
    setId(id);
  };
  // Handle delete user
  const handleDelete = (id) => {
    deleteUser(id);
  };
  // Handle update user
  const handleUpdate = (id, fullname, username, contact, role, file) => {
    setIsModalOpen(true);
    const password = "";
    generateInitialData(id, fullname, username, password, contact, role, file);
  };
  // Handle insert user
  const handleInsert = async () => {
    insertUser(fullname, username, password, contact, role, file);
  };
  const handleCancelForm = () => {
    setIsModalOpen(false);
    handleClear();
  };
  const generateInitialData = (
    id,
    fullname,
    username,
    password,
    contact,
    role,
    file
  ) => {
    setId(id);
    setFullname(fullname);
    setUsername(username);
    setPassword(password);
    setContact(contact);
    setRole(role);
    setFile(file);
  };

  // Handle submit insert and updata
  const handleSubmit = () => {
    if (id === null || id === "") {
      handleInsert();
    } else {
      UpdateUser();
    }
  };
  // handle submit reset and change password
  const submitChangePassword = () => {
    changePassword(id, password, confirmPassword);
  };

  // Handle search query change
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const userId = String(user.id);
    return (
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      userId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCancelFormChangePassword = () => {
    setIsFormOpen(false);
    handleClear();
  };

  // validation

  const validationError = () => {
    if (fullname === "") {
      message.error("សូមបញ្ជុលឈ្មោះ!");
      return true;
    }
    if (username === "") {
      message.error("សូមបញ្ជុលគណនី!");
      return true;
    }
    if (contact === "") {
      message.error("សូមបញ្ជុលទំនាក់ទំនង!");
      return true;
    }
    if (role === "") {
      message.error("សូមបញ្ជុលតួនាទី!");
      return true;
    }
    if (fullname.length < 3) {
      message.error("សូមបញ្ជុលឈ្មោះលើសពី៣អក្សរ!");
      return true;
    }
    if (username.length < 8) {
      message.error("សូមបញ្ជុលឈ្មោះគណនីលើសពី៨អក្សរ!");
      return true;
    }
    if (!id) {
      if (password.length < 3 || password.length > 15) {
        message.error("សូមបញ្ជុលពាក្យសម្ងាត់ចន្លោះ ៣ ទៅ ១៥ អក្សរ!");
        return true;
      }
      if (password === "") {
        message.error("សូមបញ្ជុលពាក្យសម្ងាត់!");
        return true;
      }
    }

    return false;
  };

  return (
    <Spin spinning={loading}>
      <main className={style.main}>
        <div className={style.header}>
          <div className={style.search}>
            <h3>POS / គ្រប់គ្រងបុគ្គលិក</h3>
            <Search searchQuery={searchQuery} handleSearch={handleSearch} />
          </div>
          <div className={style.create}>
            <Button
              className={style.btn}
              type="primary"
              onClick={() => setIsModalOpen(true)}
            >
              បង្កើតគណនីថ្មី
            </Button>
          </div>
        </div>
        <div>
          <UserTable
            users={filteredUsers}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            handleChangePassword={handleChangePassword}
          />
        </div>
      </main>
      <ModalUser
        isModalOpen={isModalOpen}
        handleCancelForm={handleCancelForm}
        handleSubmit={handleSubmit}
        id={id}
        fullname={fullname}
        username={username}
        password={password}
        contact={contact}
        role={role}
        setFullname={setFullname}
        setUsername={setUsername}
        setPassword={setPassword}
        setContact={setContact}
        setRole={setRole}
        setFile={setFile}
      />
      <ChanagePassForm
        isFormOpen={isFormOpen}
        submitChangePassword={submitChangePassword}
        handleCancelFormChangePassword={handleCancelFormChangePassword}
        password={password}
        confirmPassword={confirmPassword}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
      />
    </Spin>
  );
};

export default UserPage;
