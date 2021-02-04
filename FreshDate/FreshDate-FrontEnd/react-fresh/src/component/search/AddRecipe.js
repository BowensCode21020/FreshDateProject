import React, { Component } from 'react';
import RecipeDataService from '../../services/recipe-service';

export default class AddRecipe extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDirections = this.onChangeDirections.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
        this.newRecipe = this.newRecipe.bind(this);

        this.state = {
            id: null,
            title: "",
            ingredients: "",
            directions: "",

            submitted: false
        };
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeIngredients = (e) => {
        this.setState({
            ingredients: e.target.value
        });
    }

    onChangeDirections(e) {
        this.setState({
            directions: e.target.value
        });
    }

    saveRecipe() {
        var data = {
            title: this.state.title,
            ingredients: this.state.ingredients,
            directions: this.state.directions
        };
        RecipeDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    ingredients: response.data.ingredients,
                    directions: response.data.directions,

                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newRecipe() {
        this.setState({
            id: null,
            title: "",
            ingredients: "",
            directions: "",

            submitted: false
        });
    }





    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newRecipe}>
                            Add
                </button>
                    </div>
                ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    required
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    name="title"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ingredients">Ingredients</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ingredients"
                                    required
                                    value={this.state.ingredients}
                                    onChange={this.onChangeIngredients}
                                    name="ingredients"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Directions</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    required
                                    value={this.state.directions}
                                    onChange={this.onChangeDirections}
                                    name="description"
                                />
                            </div>

                            <button onClick={this.saveRecipe} className="button alt">
                                Submit
                </button>
                        </div>
                    )}
            </div>
        );
    }
}

