import React from 'react';
import tokenConverter from '../../utils/TokenConverter';
import localhostStorageSave from '../../utils/LocalStorageSave';
import { message } from 'antd';
import request from '../../services/request';
import LoginForm from '../../components/login/LoginForm';
import errroHandler from '../../utils/ErrorHandler';
import style from './LoginPage.module.css';
import CashierImage from '../../images/LoginImage.jpg';
const LoginPage = () => {
  const handleLogin = async (values) => {
    try {
      const data = {
        username: values.username,
        password: values.password
      }
      const response = await request("POST", "users/login", data);
      const iToken = response.token;
      const token = tokenConverter(iToken);
      if (token === false) {
        return message.error("Can not get token!");
      }
      localhostStorageSave(iToken, token.id, token.username, token.fullname, token.role_id)
      message.success("Login successfully!");
      window.location.href = "/";
    } catch (error) {
      errroHandler(error);
    }
  }

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.form}>
            <LoginForm handleLogin={handleLogin} />
        </div>
        <div className={style.img}>
          <img className={style.imageFit} src={CashierImage} alt='cashierImage' />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
