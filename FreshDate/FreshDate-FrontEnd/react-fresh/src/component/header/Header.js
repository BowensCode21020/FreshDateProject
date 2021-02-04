import { Dropdown } from 'bootstrap';
import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import logomain from '../../images/logomain.jpg';
import { MenuDropdown } from '../dropdowns/DropDowns';
import DropDownsContainer from '../dropdowns/DropDownsContainer';
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from './Menu';
import Login from './../login/Login';
import GetStarted from './../getstarted/GetStarted';
import Home from './../home/Home';
import Profile from './../profile/Profile';
import BoardUser from './../user/board.user';
import BoardModerator from './../user/board.moderator';
import BoardAdmin from './../user/board.admin';
import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import ModalMenu from './../dropdowns/ModalMenu';
import Recipes from './../search/Recipes';
import RecipeList from './../search/RecipeList';

class Header extends Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.addMenu = this.addMenu.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
            modalMenuToggle: false
        };

       
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    modalMenuHandler = (e) => {
        e.preventDefault();
        this.setState({
            modalMenuToggle: !this.state.modalMenuToggle
        });
    }

    addMenu() {
        this.setState({ modalMenuToggle: true})
    }


    render() {

        const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
        return (
                <div>
                    <header id="header">
                    <nav className="left">
                        <button className="glyphicon glyphicon-menu-hamburger" onClick={this.addMenu}></button>
                        <ModalMenu show={this.state.modalMenuToggle} modalMenuClosed={this.modalMenuHandler}>
                            <div style={{color: 'green'}} className="box-3">
                                <li className="nav-item">
                                    <Link to={"/home"} className="btn-three">
                                        Home</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/recipes"} className="btn-three">
                                        Search
                                    </Link>

                                </li>
                                

                                {showModeratorBoard && (
                                    <li className="nav-item">
                                        <Link to={"/mod"} className="btn-three">
                                            Moderator Board</Link>
                                    </li>
                                )}
                                
                                {showAdminBoard && (
                                    <li className="nav-item">
                                        <Link to={"/admin"} className="btn-three">
                                            Admin Board</Link>
                                    </li>
                                )}
                                
                                {currentUser && (
                                    <li className="nav-item">
                                        <Link to={"/user"} className="btn-three">
                                            User
                                </Link>
                                    </li>
                                )}
                            </div>
                            
                            {currentUser ? (
                                <div className="box-3">
                                    <li className="nav-item">
                                        <Link to={"/profile"} className="btn-three">
                                            {currentUser.username}
                                    My Fresh Dates
                                </Link>
                                    </li>
                                    
                                    <li className="nav-item">
                                        <a href="/login" className="btn-three" onClick={this.logOut}>
                                            LogOut</a>
                                    </li>
                                </div>) : (<div className="box-3">
                                
                                    <li className="nav-item">
                                        <Link to={"/login"} className="btn-three">
                                            Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/get-started"} className="btn-three">
                                            Sign Up</Link>
                                    </li>
                                    
                                </div>
                                )}
                        </ModalMenu>
                    </nav>
                    <Link className="logo" to="/"><img src={logomain} width="200" height="80" /></Link>
                    <nav className="right">
                    </nav>
                    </header>
                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/", "/home"]} component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/recipes" component={RecipeList} />
                            <Route exact path="/get-started" component={GetStarted} />
                            <Route exact path="/profile" component={Profile} />
                            <Route path="/user" component={BoardUser} />
                            <Route path="/mod" component={BoardModerator} />
                            <Route path="/admin" component={BoardAdmin} />
                        </Switch>
                    </div>

                </div>
           
        );
    }
}

export default Header;