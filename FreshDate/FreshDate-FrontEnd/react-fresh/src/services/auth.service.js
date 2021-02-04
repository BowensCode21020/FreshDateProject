import axios from 'axios';
import authHeader from './auth-header';
const API_URL = "http://localhost:8080/freshdate/auth/";

class AuthService {
    login(email, password) {
        return axios.post(API_URL + "login", {
            email,
            password
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(firstName, lastName, email, password, password2) {
        return axios.post(API_URL + "signup", {
            firstName,
            lastName,
            email,
            password,
            password2
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}
export default new AuthService();