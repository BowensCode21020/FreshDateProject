import React, {Component} from 'react';
import Header from '../header/Header';
import Home from '../home/Home';
import Login from '../login/Login';
import FreshResources from '../freshresources/FreshResources';
import GetStarted from '../getstarted/GetStarted';
import {Router, Route, Switch, withRouter} from 'react-router-dom';
import Profile from '../profile/Profile';
import AboutUs from '../aboutus/AboutUs';
import itemNameList from './../profile/itemNameList';
import itemTypeList from './../profile/itemTypeList';
import AddItems from './../profile/AddItems';

class Directory extends Component {
    render() {
        let routes = (
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={GetStarted} />
                <Route path="/fresh-resources" component={FreshResources} />
                <Route exact path="/login" component={Login} />
                <Route path="about-us" component={AboutUs} />
                <Route path="/profile" component={Profile} />
            </div>
        )

        // if(localStorage.getItem(!"loggedInUser")) {
        //     routes = (
        //         <div>
        //             <Route exact path="/profile" component={Profile} />
        //             <Route path="/" component={Home} />
                    
        //         </div>
        //     )
        // }
        // <div>
        //     <Router>
        //         <Header />
        //         <div className="container">
        //             <Switch>
        //                 {/* <Route path="/profile" exact component={Profile}></Route>
        //                 <Route path ="/profile/items" component={Profile}></Route> */}
        //                 <Route path = "/add-item" component={AddItems}></Route>
        //                 <Route path = "/display-by-name" component={itemNameList}></Route>
        //                 <Route path = "/display-by-type" component={itemTypeList}></Route>
        //             </Switch>
        //         </div>

        //     </Router>
        // </div>
        return (
            <div className="table-wrapper">
                <Header {...this.props} />
                {/* <Route path="about-us" component={AboutUs} /> */}
            </div>
        );
    }
}

export default withRouter(Directory);