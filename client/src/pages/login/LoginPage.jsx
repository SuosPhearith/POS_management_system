import React, { useState } from "react";
import tokenConverter from "../../utils/TokenConverter";
import localhostStorageSave from "../../utils/LocalStorageSave";
import { message } from "antd";
import request from "../../services/request";
import LoginForm from "../../components/login/LoginForm";
import errroHandler from "../../utils/ErrorHandler";
import style from "./LoginPage.module.css";
import CashierImage from "../../images/LoginImage.jpg";
import LoginModel from "../../components/login/LoginModel";
const LoginPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    adminPassword: "",
  });
  const handleLogin = async (values) => {
    try {
      const data = {
        username: values.username,
        password: values.password,
      };
      const response = await request("POST", "auth/login", data);
      const access_token = response.access_token;
      const refresh_token = response.refresh_token;
      const token = tokenConverter(access_token);
      if (token === false) {
        return message.error("Can not get token!");
      }
      localhostStorageSave(
        access_token,
        refresh_token,
        token.id,
        token.username,
        token.fullname,
        token.role_id
      );
      message.success("Login successfully!");
      window.location.href = "/";
    } catch (error) {
      errroHandler(error);
    }
  };
  const handleReset = async () => {
    if (validate()) return;
    try {
      const data = {
        username: form.username,
        password: form.password,
        adminPassword: form.adminPassword,
      };
      const response = await request("POST", "auth/reset", data);
      message.success(response.message);
      setIsFormOpen(false);
      handleCancel();
    } catch (error) {
      errroHandler(error);
    }
  };
  const validate = () => {
    if (!form.username) {
      message.error("សូមបញ្ចូលគណនី!");
      return true;
    }
    if (!form.password) {
      message.error("សូមបញ្ចូលលេខសម្ងាត់!");
      return true;
    }
    if (!form.adminPassword) {
      message.error("សូមបញ្ចូលkey!");
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    handleReset();
  };
  const handleCancel = () => {
    //code
    setForm({
      username: "",
      password: "",
      adminPassword: "",
    });
    setIsFormOpen(false);
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.form}>
          <LoginForm handleLogin={handleLogin} setIsOpenForm={setIsFormOpen} />
        </div>
        <div className={style.img}>
          <img
            className={style.imageFit}
            src={CashierImage}
            alt="cashierImage"
          />
        </div>
      </div>
      <LoginModel
        isFormOpen={isFormOpen}
        form={form}
        setForm={setForm}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default LoginPage;
