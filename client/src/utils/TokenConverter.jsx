
const tokenConverter = (token = null) => {
    if(token === null){
        return false;
    }
    const [_, payload] = token.split('.');
    const decodedPayload = atob(payload);
    const payloadData = JSON.parse(decodedPayload);
    return payloadData;
}

export default tokenConverter;
