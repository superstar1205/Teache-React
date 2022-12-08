import axios from "axios";

export default axios.create({
    // old url 
    // baseURL: "http://3.131.140.48:4500/admin",
    
    // local url
    // baseURL: "http://192.168.1.105:4500/admin" 

    // new url
    // baseURL:"http://3.131.175.246:4500/admin"
    baseURL:"https://dev.teache.co/admin"
    // baseURL:"https://v1.teache.co/admin"
});