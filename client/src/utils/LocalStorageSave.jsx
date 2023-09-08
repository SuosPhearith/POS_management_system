
const roleConverter = (role) =>{
    if(role === 1){
        return "admin";
    }
    else if(role === 2){
        return "saler";
    }
    else if(role === 3){
        return "manager"
    }
}

const localhostStorageSave = (token, id,  username, fullname, role) =>{
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('username', username);
    localStorage.setItem('fullname', fullname);
    localStorage.setItem('role', roleConverter(role));
    localStorage.setItem('role', roleConverter(role));
}

export default localhostStorageSave;