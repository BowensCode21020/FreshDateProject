import axios from 'axios';
import authHeader from './auth-header';

const API_RECIPE_URL = "http://localhost:8080/freshdate/auth"
class RecipeDataService {
    
    getAll() {
        return axios.get(API_RECIPE_URL + '/findproduce', { headers: authHeader() });
    }
    get(id) {
        return axios.post(API_RECIPE_URL + '/findproduce/${id}', { headers: authHeader() });
    }

    create(data) {
        return axios.post(API_RECIPE_URL + '/findproduce', data, { headers: authHeader() });
      }
    
      update(id, data) {
        return axios.put(API_RECIPE_URL + '/findproduce/${id}', data, { headers: authHeader() });
      }
    
      delete(id) {
        return axios.delete(API_RECIPE_URL + '/findproduce/${id}', { headers: authHeader() });
      }
    
      deleteAll() {
        return axios.delete(API_RECIPE_URL + '/findproduce', { headers: authHeader() });
      }
    
      findByTitle(title) {
        return axios.get(API_RECIPE_URL + '/display-by-name', { headers: authHeader() });
      }

      findByIngredient(ingredients) {
          return axios.get(API_RECIPE_URL + '/display-by-type', { headers: authHeader() });
      }

    // other CRUD methods
}
export default new RecipeDataService();