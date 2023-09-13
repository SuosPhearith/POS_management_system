import localhostStorageClear from "./LocalStorageClear";
import errroHandler from "./ErrorHandler";
import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL;
const handleLogout = async () => {
    try {
    const username = localStorage.getItem('username');
      await axios.post(baseUrl + "auth/logout", {username : username});
      localhostStorageClear();
      window.location.href = '/login';
    } catch (error) {
      errroHandler(error);
    }
  }

export default handleLogout