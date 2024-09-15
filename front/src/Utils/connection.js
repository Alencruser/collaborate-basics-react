function isConnected() {
    return localStorage.getItem("pseudo") && localStorage.getItem("role");
}

export default isConnected;