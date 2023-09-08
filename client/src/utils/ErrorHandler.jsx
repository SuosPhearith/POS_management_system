import { message } from "antd";

const errroHandler = (error = null) => {
    if(error === null){
        return;
    }
    if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message, 2);
    } else {
        message.error("Fail connect to API!.", 2);
    }
}

export default errroHandler;