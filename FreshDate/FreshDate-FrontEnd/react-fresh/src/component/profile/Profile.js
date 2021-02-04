import React, { Component, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Modal from './../dropdowns/Modal';
import axios from 'axios';
import AuthService from "./../../services/auth.service";
import ItemService from "./../../services/item.service";
import itemService from './../../services/item.service';
import authHeader from './../../services/auth-header';
import moment from 'moment';
import Countdown from 'react-countdown';
import ManualMenu from './../dropdowns/ManualMenu';
import Funny from '../../images/profileimages/funny.jpg';
import EditModal from './../dropdowns/EditModal';
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
    }

    state = {
        currentUser: AuthService.getCurrentUser(),
        listname: [],
        listtype: [],
        items: [],
        taglistname: '',
        taglisttype: '',
        newItem: {
            userItemName: '',
            userItemType: '',
            produceID: '',
            setDate: '',
            manInput: false,
            daysUntil: 0,
        },

        modalToggle: false,
        editModalToggle: false,
        item: {
            itemID: ''
        }
    };

    componentDidMount() {

        ItemService.getAllValues().then((res) => {
            this.setState({ items: res.data });
        });

        axios.get("http://localhost:8080/freshdate/auth/display-by-name", { headers: authHeader() })
            .then(res => {
                console.log('type name d=g', res.data)
                this.setState({ listname: res.data })
            })

        axios.get("http://localhost:8080/freshdate/auth/display-by-type", { headers: authHeader() })
            .then(res => {
                console.log('type data d=g', res.data)
                this.setState({ listtype: res.data })
            })
    }

    handleDropDown = (tag, name) => {
        const tempItem = { ...this.state.newItem }
        tempItem[name] = tag;
        this.setState({ newItem: tempItem });
    }

    editHandleDropDown = (tag, name) => {
        const tempItem = { ...this.state.newItem }
        tempItem[name] = tag;
        this.setState({ newItem: tempItem });
    }

    modalHandler = (e) => {
        e.preventDefault();
        this.setState({
            modalToggle: !this.state.modalToggle
        });
    }

    editModalHandler = (e) => {
        e.preventDefault();
        this.setState({
            editModalToggle: !this.state.editModalToggle
        })
    }

    addItem() {
        this.setState({ modalToggle: true })
    }

    saveNewItem = (event) => {
        itemService.addNewValue(this.state.newItem).then(res => {
            this.setState({
                modalToggle: !this.state.modalToggle
            })
            this.componentDidMount();
        }).catch(error => {
            console.log(error)
        })
    }

    editItem = (event) => {
        this.setState({ editModalToggle: true })
    }

    removeItem = (event) => {
        event.preventDefault();
        const id = event.target.value;
        const params = { itemID: id }
        axios.delete('http://localhost:8080/freshdate/auth/delete-item', { params })
            .then(response => {
                (
                    this.componentDidMount());
            }).catch(error => {
                console.log('fail');
            })
    }

    handleIdChange = (tempDelete) => {
        this.setState({
            item: tempDelete
        })
    }

    handleDropChange = (list) => {
        this.setState({ list })
    }

    handleClick = (manInput) => {
        this.setState({
            manInput: true
        })
        console.log("something's coming")
    }

    handleChange = (event) => {
        const value = event.target.value;
        const tempNewItem = { ...this.state.newItem }
        tempNewItem.itemName = value;
        this.setState(
            {
                newItem: tempNewItem ? tempNewItem.getTime() : null
            }
        )
    }

    handleDateChange = (date) => {
        const tempNewItem = { ...this.state.newItem };
        tempNewItem.setDate = date;
        this.setState({
            newItem: tempNewItem
        });
        console.log(date);
    }

    render() {
        const { currentUser } = this.state;
        const { state } = this;
        let { significance, diff } = state;
        // eslint-disable-next-line camelcase
        let { locales, locales_plural } = this.props;
        let units = ['year', 'month', 'day', 'hour', 'min', 'sec'];

        moment.locale('en');
        // const dt = new Date(this.props.setDate.toLocaleDateString());
        // const dte = new Date(this.props.expDate);
        // const showset = dt.getTime();
        // const showexp = dte.getTime();

        return (
            <div>
                <div className="col-xl-3 col-lg-3 col-md-5 col-sm-12 col-12">
                    <div className="card">
                        <div className="card-body">
                            <img
                                src={Funny}
                                alt="profile-img"
                                className="profile-img-card"
                            />
                            <div className="user-avatar text-center d-block">
                                <a href="#" data-toggle="model" data-target="#add-images">
                                    <h3 class="mb-2">{currentUser.firstName}'s Profile</h3>
                                </a>
                            </div>
                            {/* <p>
                                <strong>Token:</strong>{" "}
                                {currentUser.accessToken.substring(0, 20)} ...{" "}
                                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                            </p> */}
                            <p>
                                <strong>Id:</strong>{" "}
                                {currentUser.id}
                            </p>
                            <p>
                                <strong>Email:</strong>{" "}
                                {currentUser.email}
                            </p>
                            {/* <strong>Status:</strong>
                            <ul>
                                {currentUser.roles &&
                                    currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                            </ul> */}
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <h2 className="text-center">Expiration Status</h2>
                    <div className="row">
                        <button className="glyphicon glyphicon-plus" onClick={this.addItem}>Add</button>
                        {/* if (manInput === false) {
                            is our itemName consistent with the backend and the
                            UI?
                        } */}
                        <Modal show={this.state.modalToggle} modalClosed={this.modalHandler}>
                            <div style={{ color: 'black' }}>
                                <form>
                                    <p>Select produce name:</p>
                                    <div className="dropdown">
                                        <select placeholder="select from list " onChange={e =>
                                            this.handleDropDown(e.target.value, 'userItemName')} required
                                            value={this.state.newItem.userItemName}
                                        ><option value=''>Select</option>
                                            {this.state.listname.map(tagname => (
                                                <option key={tagname} value={tagname}>
                                                    {tagname}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <br></br>
                                    <p>How will you store it?</p>
                                    <div className="dropdown">
                                        <select placeholder="select from list " onChange={e =>
                                            this.handleDropDown(e.target.value, 'userItemType')} required
                                            value={this.state.newItem.userItemType}
                                        ><option value=''>Select</option>
                                            {this.state.listtype.map(tagtype => (
                                                <option key={tagtype} value={tagtype}>
                                                    {tagtype}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <br></br>
                                    <p>Choose date and time of purchase: </p>
                                    <DatePicker
                                        format={"dd-MM-yyyy hh:mm:ss a"}
                                        selected={this.state.newItem.setDate}
                                        onChange={this.handleDateChange}
                                        name="startDate"
                                        todayButton="Today"

                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        dateFormat="MMMM d, yyyy h:mm aa"
                                    />


                                    <div className="form-group">
                                        <button className="button alt" onClick={this.saveNewItem} type="button">Add It!</button>
                                    </div>
                                    {/* <div className="form-group">
                                        <a className="manual-option" onClick={this.handleClick}>
                                            Already know your expiration date? Click Here!
                                        </a>
                                        
                                    </div> */}
                                </form>
                            </div>

                        </Modal>
                        <div className="col-md-14">
                            <table className="table-wrapper">
                                <thead>
                                    <tr>
                                        <th>Item Name</th>
                                        <th>Item Storage</th>
                                        <th>Date Added</th>
                                        <th>Expiration in: (day : hr : min : sec)</th>
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
                                                    <td>{new Intl.DateTimeFormat('en-US')
                                                        .format(new Date(item.setDate))}</td>
                                                    <td><Countdown date={new Date(item.expDate)} /></td>
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

                    </div>
                </div>
                <br />

            </div>
        );
    }
}

