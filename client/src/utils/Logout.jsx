import localhostStorageClear from "./LocalStorageClear";
import errroHandler from "./ErrorHandler";
import axios from "axios";
import tokenConverter from "./TokenConverter";
const baseUrl = process.env.REACT_APP_API_URL;
const handleLogout = async () => {
    try {
      const data = tokenConverter(localStorage.getItem('access_token'))
      const username = data.username;
      await axios.post(baseUrl + "auth/logout", {username : username});
      localhostStorageClear();
      window.location.href = '/login';
    } catch (error) {
      errroHandler(error);
    }
  }

export default handleLogout