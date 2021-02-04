import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081/freshdate/api",
  headers: {
    "Content-type": "application/json"
  }
});