
const tokenConverter = (token = null) => {
    if(token === null){
        return false;
    }
    console.log(token);
    const [_, payload] = token.split('.');
    console.log(payload);
    const decodedPayload = atob(payload);
    const payloadData = JSON.parse(decodedPayload);
    return payloadData;
}

export default tokenConverter;
