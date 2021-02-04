import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Directory from './component/directory/Directory';
import "bootstrap/dist/css/bootstrap.min.css";
import RecipeList from './component/search/RecipeList';
import AddRecipe from './component/search/AddRecipe';
function App() {
  return (
    <BrowserRouter>
    <Directory />
    </BrowserRouter>
  );
}
export default App;
