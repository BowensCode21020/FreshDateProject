import axios from 'axios';
import authHeader from './auth-header';

const API_ITEM_URL = "http://localhost:8080/freshdate/auth/";

class ItemService {

    getAllValues() {
        return axios.get(API_ITEM_URL + 'show-user-list', { headers: authHeader() });
    }

    editItem(item) {
        return axios.post(API_ITEM_URL + "edit=item", {headers: authHeader() });
    }

    getByStorageType() {
        return axios.get(API_ITEM_URL + "display-by-name", { headers: authHeader() });
    }

    addNewValue(item) {
        return axios.post(API_ITEM_URL + "add-item", item, { headers: authHeader() });
    }

    deleteItem(item) {
        return axios.post(API_ITEM_URL + "delete-item", item, { headers: authHeader() });
    }

    addManValue(item) {
        return axios.post(API_ITEM_URL + "add-man-item", item, {headers: authHeader() });
    }

}

export default new ItemService();