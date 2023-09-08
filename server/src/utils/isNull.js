const isNull = (value, req) =>{
    return value === "" || value === null || !(`${value}` in req.body);
}
module.exports = isNull