import axios from "axios";

const API = "http://localhost:4000";
function getClientDetails() {
    return axios.get(`${API}/client/me`);
}

function getClientDetailsByToken(token) {
    return axios.post(`${API}/client/getuser`, {
        token: token
    });
}

function getClientProducts(userId) {
    return axios.post(`${API}/client/getclientproducts`, { userId: userId });
}

function addToCart(userId,obj) {
    return axios.post(`${API}/client/addtocart`, {
        userId:userId,
        obj:obj
    });
}

function register(obj) {
    return axios.post(`${API}/client/register`,  {obj:obj} );
}

function getProducts() {
    return axios.get(`${API}/product/getproducts`);
}

function buyFromCart(userId) {
    return axios.post(`${API}/client/buyfromcart`, {
        userId: userId,
    });
}
function remooveFromCart(userId,id) {
    return axios.post(`${API}/client/removefromcart`, {
        userId: userId,
        id:id
    });
}

function login(id, password) {
    return axios.post(`${API}/client/login`, {
        id: id,
        password: password
    });
}

let Dal = {
    getClientDetails: getClientDetails,
    register: register,
    login: login,
    getClientDetailsByToken: getClientDetailsByToken,
    getClientProducts: getClientProducts,
    buyFromCart: buyFromCart,
    getProducts:getProducts,
    addToCart: addToCart,
    remooveFromCart: remooveFromCart
};

export default Dal;