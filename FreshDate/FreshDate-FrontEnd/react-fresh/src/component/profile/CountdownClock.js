import react from 'react';
import React, { Component } from 'react';
import Countdown from 'react-countdown';
import ItemService from "./../../services/item.service";
import axios from 'axios';
import authHeader from './../../services/auth-header';
import { now } from 'moment';
import Profile from './Profile';

class CountDownClock extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        items: []
    }

    componentDidMount() {
        ItemService.getAllValues().then((res) => {
            this.setState({ items: res.data });
        })
    }

    render() {
        return (
            <div className="col-md-14">
                <table className="table-wrapper">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Item Storage</th>
                            <th>Date Added</th>
                            <th>Expiration in: (hr:min:sec)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.items.map(
                                item =>
                                    <tr key={item.itemID}>
                                        <td>{item.userItemName}</td>
                                        <td>{item.userItemType}</td>
                                        <td>{item.setDate}</td>
                                        <td><Countdown date={new Date(item.expDate)} />
                                        </td>
                                        <td items={this.state.items}>
                                            <button onClick={this.editItem} className="glyphicon glyphicon-calendar"></button>
                                            <button style={{ marginLeft: "10px" }} value={item.itemID} onClick={this.removeItem} className="glyphicon glyphicon-trash"></button>
                                        </td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
               

            </div>

        )
    }
}
export default CountDownClock;
