import React, { Component } from "react";
import { Link } from "react-router-dom";
import RecipeDataService from './../../services/recipe-service';
import authHeader from './../../services/auth-header';
import axios from 'axios';
export default class RecipeList extends Component {

    constructor(props) {
        super(props);

        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrieveRecipes = this.retrieveRecipes.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveRecipe = this.setActiveRecipe.bind(this);
        this.removeAllRecipes = this.removeAllRecipes.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.searchIngredient = this.searchIngredient.bind(this);

        this.state = {
            items: [],
            searchlistname: '',
            searchlistitem:'',
            currentRecipes: null,
            currentIndex: -1,
            searchTitle: "",
            searchIngredient: ""
        };
    }

    componentDidMount() {
        this.retrieveRecipes();

        axios.get("http://localhost:8080/freshdate/auth/findproduce", {headers: authHeader})
    }

    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    onChangeSearchIngredient(e) {
        const searchIngredient = e.target.value;

        this.setState({
            searchIngredient: searchIngredient
        });
    }

    retrieveRecipes() {
        RecipeDataService.getAll()
            .then(response => {
                this.setState({
                    items: response.data,
                });
                console.log(response.data);
                console.log("right here!")

            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveRecipes();
        this.setState({
            currentRecipes: null,
            currentIndex: -1
        });
    }

    setActiveRecipe(recipe, index) {
        this.setState({
            currentRecipes: recipe,
            currentIndex: index
        });
    }

    removeAllRecipes() {
        RecipeDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchTitle() {
        RecipeDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    items: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchIngredient() {
        RecipeDataService.findByIngedient(this.state.searchIngredient)
            .then(response => {
                this.setState({
                    recipes: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { items, searchTitle, currentRecipes, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by produce"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="button alt"
                                type="button alt"
                                onClick={this.searchTitle}
                            >
                                Search
                  </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Produce List</h4>

                    <ul className="list-group">
                        {items &&
                            items.map((recipe, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveRecipe(recipe, index)}
                                    key={index}
                                >
                                    {recipe.itemName} storage: {recipe.itemType} 
                                </li>
                            ))}
                    </ul>

                    {/* <button
                        className="button alt"
                        onClick={this.removeAllRecipes}
                    >
                        Remove All
              </button> */}
                </div>
                <div className="col-md-6">
                    {currentRecipes ? (
                        <div>
                            <h4>Details</h4>
                            <div>
                                <label>
                                    <strong>The grocery item:</strong>
                                </label>{" "}
                                {currentRecipes.itemName}
                            </div>
                            <div>
                                <label>
                                    <strong>Stored in:</strong>
                                </label>{" "}
                                {currentRecipes.itemType}
                            </div>
                            <div>
                                <label>
                                    <strong>Will expire in about:</strong>
                                </label>{" "}
                                {currentRecipes.expiration} days.
                            </div>
                            <p><i>Disclaimer: The values provided are in accordance with statistics from <br/>
                            both the United States Department of Agriculture (USDA.gov) and third-party<br/>
                            entities. As a result, the produce and expiration times may vary, depending on <br/>
                            conditions of product storage and time of placement.</i></p>

                            {/* <Link
                                to={"/recipes/" + currentRecipes.id}
                                className="badge badge-warning"
                            >
                                Edit
                  </Link> */}
                        </div>
                    ) : (
                            <div>
                                <br />
                                <p>Please click on a Item...</p>
                            </div>
                        )}
                </div>
            </div>
        );
    }




}
