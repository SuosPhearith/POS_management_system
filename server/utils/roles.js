
const roles = {
    "admin": 1,
    "saler": 2,
    "manager" : 3
}

module.exports = roles


//const executeQuery = require('../config/db');
// const getAllRoles = async (req, res) => {
//     const query = "select * from roles";
//     const getRoles = await executeQuery(query);
//     const roles = {};

//     for (const role of getRoles) {
//         roles[role.name] = role.id;
//     }
//     console.log(roles);
// }

