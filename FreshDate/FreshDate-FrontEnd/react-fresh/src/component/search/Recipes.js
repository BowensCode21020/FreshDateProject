import React, { Component } from 'react';
import RecipeDataService from './../../services/recipe-service';
export default class Recipes extends Component {

    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeIngredient = this.onChangeIngredient.bind(this);
        this.onChangeDirections = this.onChangeDirections.bind(this);
        this.getRecipes = this.getRecipes.bind(this);
        this.updateRecipe = this.updateRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);

        this.state = {
            currentRecipes: {
                id: null,
                title: "",
                ingredients: "",
                directions: "",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getRecipes(this.props.match.params.id);
    }

    onChangeTitle(e) {
        const title = e.target.value;

        this.setState(function (prevState) {
            return {
                currentRecipes: {
                    ...prevState.currentRecipes,
                    title: title
                }
            };
        });
    }

    onChangeIngredient(e) {
        const ingredients = e.target.value;

        this.setState(prevState => ({
            currentRecipes: {
                ...prevState.currentRecipes,
                ingredients: ingredients
            }
        }));
    }

    onChangeDirections(e) {
        const directions = e.target.value;

        this.setState(prevState => ({
            currentRecipes: {
                ...prevState.currentRecipes,
                directions: directions
            }
        }));
    }

    getRecipes(id) {
        RecipeDataService.get(id)
            .then(response => {
                this.setState({
                    currentRecipes: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateRecipe(status) {
        var data = {
            id: this.state.currentTutorial.id,
            title: this.state.currentTutorial.title,
            description: this.state.currentTutorial.description,
        };

        RecipeDataService.update(this.state.currentRecipes.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentRecipes: {
                        ...prevState.currentRecipes,
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteRecipe() {
        RecipeDataService.delete(this.state.currentRecipes.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/recipes')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { currentRecipes } = this.state;

        return (
            <div>
                {currentRecipes ? (

                    <div className="edit-form">
                        <h4>Recipe</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentRecipes.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="ingredients">Ingredients</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ingredients"
                                    value={currentRecipes.ingredients}
                                    onChange={this.onChangeIngredient}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="directions">Directions</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="directions"
                                    value={currentRecipes.directions}
                                    onChange={this.onChangeDirections}
                                />
                            </div>

                        </form>
                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteRecipe}
                        >
                            Delete</button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateRecipe}
                        >
                            Update</button>
                        <p>{this.state.message}</p>
                        </div>) : (
                        <div>
                            <br />
                            <p>Please click on a Recipe...</p>
                        </div>
                    )}
                )


            </div>
        );
    }
}
