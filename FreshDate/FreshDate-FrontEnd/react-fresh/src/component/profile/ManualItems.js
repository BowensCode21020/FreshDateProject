import React, { Component } from 'react';
import ItemService from "./../../services/item.service";
import AuthService from "./../../services/auth.service";

class ManualItems extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        currentUser: AuthService.getCurrentUser(),
        
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}

export default ManualItems;