import React, { Component } from 'react';
import Profile from './Profile';
import axios from 'axios';
import authHeader from './../../services/auth-header';
export default class itemNameList extends Component {

    state = {
        names: []
    }

    componentDidMount() {
        axios.get("http://localhost:8080/freshdate/auth/display-by-name", { headers: authHeader() })
        .then(res => {
            const names = res.data;
            this.setState({names})
        })
    }
   
    render() {
        return (
            <select placeholder="">
                {this.state.names.map(itemList => <option>{itemList.itemName}</option>)}
            </select>
        );
    }
}
