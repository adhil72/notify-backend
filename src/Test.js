import Axios from "axios";
import token from "./routes/auth/api/token";
// GET request example
Axios.get("http://localhost:50000/devices/messages/get")
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });


const data = {
    message: "Hello from Notify",
    to: "XXXXXXXXXX"
};

const headers = {
    Authorization: `Bearer ${token}`
};

Axios.post("http://localhost:5000/devices/messages/send", data, { headers })
    .then(response => {
        // Handle the response data
        console.log(response.data);
    })
    .catch(error => {
        // Handle the error
        console.error(error);
    });