
function isConnected() {
    return localStorage.getItem("pseudo") && localStorage.getItem("role");
}

function disconnect() {  
    localStorage.removeItem("pseudo");
    localStorage.removeItem("role");
}

const Connection = {
    isConnected,
    disconnect
}

export default Connection;