const roleConverter = (role) => {
  if (role === 1) {
    return "admin";
  } else if (role === 2) {
    return "seller";
  } else if (role === 3) {
    return "manager";
  }
};

const localhostStorageSave = (
  access_token,
  refresh_token,
  id,
  username,
  fullname,
  role
) => {
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
  localStorage.setItem("id", id);
  localStorage.setItem("username", username);
  localStorage.setItem("fullname", fullname);
  localStorage.setItem("role", roleConverter(role));
};

export default localhostStorageSave;
