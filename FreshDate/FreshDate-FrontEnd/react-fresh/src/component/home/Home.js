import React, { Component } from 'react';
import DropDownsContainer from '../dropdowns/DropDownsContainer';
import HomePic from '../../images/HomePic.jpg';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import UserService from "./../../services/user.service";
import authHeader from './../../services/auth-header';
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email:'',
            message:'',
            content: ""
        };
    }

    componentDidMount() {
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                    (error.response && error.response.data) || 
                    error.message ||
                    error.toString()
                });
            }
        );
    }

   

    handleSubmit(event){
        event.preventDefault();
        Axios.post('http://localhost8080/freshdate/send-message',
        this.state)
    .then(response => {
       if (response.data.status === 'success') {
           alert("Message Sent!");
           this.resetForm()
       } else if (response.data.status === 'fail') {
           alert("message failed to send.")
       }
    })  
    }

    resetForm() {
        this.setState({name: '', email: '', message: ''})
    }

    render() {
        let signInSignOut = (
            <form className="right">
                <input className="search" type="text" name="keyword" placeholder="Search Common Expiration Times" />
                <button className="button alt" type="submit">Search</button>
                <Link className="right" to="/login">
                    <button className="button alt">Login</button>
                </Link>
            </form>
        )

        if (localStorage.getItem("loggedInUser")) {
            signInSignOut = (
                <form className="right">
                    <input className="search" type="text" name="keyword" placeholder="Search Common Expiration Times" />
                    <button className="button alt" type="submit">Search</button>
                    <Link className="right" to="/logout">
                        <button className="button alt">Logout</button>
                    </Link>
                </form>
            )
        }
        
        return (
            <section>
                <div id="banner" className="home-content">
                    <h2>Begin Your Fresh Journey Here</h2>
                    <p>Don't let the "one that rot away" get to you
                        and your budget. <br />FreshDate will keep track of
                        expiration dates on your produce, <br />
                        giving you freedom
                        and piece of mind to pursue other tasks. <br />
                        Find out more below.
                    </p>
                    <ul class="actions">
                        <Link className="actions-link" to="/get-started">
                            <li><button className="button alt">Get Started</button></li>
                        </Link>
                    </ul>
                </div>
                <div id="one" className="wrapper">
                    <div className="inner flex flex-3">
                        <div className="flex-item left">
                            <div>
                                <h3>Convenience</h3>
                                <p>Free your mind from the irritating <br />
                                thought of using your produce <br />
                                "before it goes bad"</p>
                            </div>
                            <div>
                                <h3>Resolve</h3>
                                <p>Groceries going bad and you never <br />
                                know what you want? <br />
                                We are here to help provide recipes and suggestions for you
                                to use</p>
                            </div>
                        </div>
                        <div className="flex-item image fit round">
                            <img src={HomePic} alt="" />
                        </div>
                        <div class="flex-item right">
                            <div>
                                <h3>Budget</h3>
                                <p>Throwing away food impacts your budget <br />
                                in ways that are all preventable. <br />
                                We will manage your groceries <br />
                                and keep your belly and your wallet full</p>
                            </div>
                            <div>
                                <h3>Community</h3>
                                <p>Read our blogs to find out the best <br />
                                ways to save and use your produce <br />
                                manage to budget, and so much more</p>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div id="two" className="wrapper style1 special">
                        <div class="inner">
                            <h2>Prevention is Key</h2>
                            <figure>
                                <blockquote>
                                    "2010 food loss and waste at the retail and consumer levels was <b>31 percent of the food supply</b> <br />
                                    equaling <b>133 billion pounds and almost $162 billion dollars.</b>"
					    </blockquote>
                                <footer>
                                    <cite class="author">USDA.gov</cite>

                                </footer>
                            </figure>
                        </div>

                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <form id="footer" onSubmit={this.handleSubmit.bind(this)} method="Post">
                        <div className="inner">
                            <h2>Get In Touch</h2>
                            <p>Any questions or concerns? Please feel free to send us 
                                <br /> a message below! 
                            </p>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" id="name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea className="form-control" rows="5" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
                            </div>
                        </div>
                        <button type="submit" className="button alt">Submit</button>

                    </form>

                </div>

            </section >
        );
    }
    onNameChange(event) {
        this.setState({name: event.target.value})
    }
  
    onEmailChange(event) {
        this.setState({email: event.target.value})
    }
  
    onMessageChange(event) {
        this.setState({message: event.target.value})
    }
}
