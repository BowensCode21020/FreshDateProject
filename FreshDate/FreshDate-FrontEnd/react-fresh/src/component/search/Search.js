import React from 'react';
import axios from 'axios';
export default class Search extends React.Component {
    state = {
        searchTerm: {
            search: ''
        }
    }
    doingASearch = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    submitSearch = (event) => {
        event.preventDefault();
        this.props.filterBySearchTerm(this.state.searchTerm)
        this.setState({
            searchTerm: ""
        })
    }

    filterBySearchTerm = (search) => {
        this.setState({
            theLocationFilter: search,
        })
        axios.get("http://localhost:8080/freshdate/auth/", {
            method: "T",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                query: search
            })
        })
            .then(r => r.json())
            .then(thePark => {
                if (thePark.data.length > 0) {
                    this.setState({
                        searchTerm: search,
                        filterAll: false,
                        searchPark: thePark.data,
                        isLoading: false
                    })
                }
                else {
                    this.setState({
                        theLocationFilter: search,
                        filterAll: false,
                        isLoading: false,
                        searchError: "No parks found"
                    })
                }
            })
        }

        render(){
            return (
                <form onSubmit={this.submitSearch}>
                    <label htmlFor="searchTerm">
                        <strong>Search by produce name: </strong>
                        <input type="text" name="searchTerm" value={this.state.searchTerm} onChange={this.doingASearch} />
                        <input type="submit" value="submit" />
                    </label>
                </form>
            )
        }
    }