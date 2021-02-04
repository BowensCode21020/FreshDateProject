import React, { Component } from 'react';
import { DatePicker } from 'react-datepicker';
import { Modal } from 'bootstrap';
import itemService from './../../services/item.service';
import itemTypeList from './itemTypeList';
import itemNameList from './itemNameList';

class AddItems extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            itemName: '',
            itemType: '',
            setDate: new Date(),
            manInput: false,
            manNameInput: '',
            manualDate: new Date(),
            manualExpiration: new Date(),
        }

        this.changeItemNameHandler = this.changeItemNameHandler.bind(this);
        this.changeItemTypeHandler = this.changeItemNameHandler.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.onDateSubmit = this.onDateSubmit.bind(this);
        this.isManualInput = this.isManualInput.bind(this);
        this.onManualNameInput = this.onManualNameInput.bind(this);
        this.onManualDateChange = this.onManualDateChange(this);
        this.onManualExpirationChange = this.onManualExpirationChange.bind(this);
        this.editDateItem = this.editDateItem.bind(this);

    }

    componentDidMount() {
        if (this.state.id === 'add-item') {
            return
        } if (this.state.id === 'add-manual-item') {
            return
        } else {
            itemService.getAllValues(this.state.id).then((res) => {
                let item = res.data;
                this.setState({
                    itemName: item.itemName,
                    itemType: item.itemType,
                    setDate: item.setDate
                });
            });
        }
    }

    addItemType = (e) => {
        e.preventDefault();
        let items = {itemName: this.state.itemName, itemTypeList: this.state.itemType,
        setDate: this.state.setDate}
    }

    changeItemNameHandler = (event) => {
        this.setState({itemName: this.target.value});
    }

    changeItemTypeHandler = (event) => {
        this.setState({itemType: this.target.value});
    }

    handleDateChange(date) {
        this.setState({
            setDate: date
        });
    }

    onDateSubmit(e) {
        e.preventDefault();
        // Axios info here
    }

    editDateItem(id) {
        this.props.history.push('/edit-date')
    }

    render() {
        return (
            <div>
                <div className="example-wrapper" style={{ minHeight: '400px' }}>
                    <div className="col-xs-12 col-sm-6 example-col">
                        <div className="form-group">
                            <form onSubmit={this.onDateSubmit}>
                                <p>Choose date and time of purchase: </p>
                                <DatePicker
                                    format={"dd-MM-yyyy hh:mm:ss a"}
                                    selected={this.state.setDate}
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
                                    <button className="button alt">Show Date</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default AddItems;