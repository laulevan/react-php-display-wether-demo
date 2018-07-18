import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import Home from "./Home"
import WeekWeather from "./WeekWeather"
import Seach from "./Seach";
var city = ["Istanbul", "Berlin", "London", "Helsinki", "Dublin", "Vancouver"];
import { withRouter } from 'react-router'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            isSeach: false,
        }
    }

    ChangeInput = (even) => {
        var textInput = even.target.value;
        city.map((val) => {
            if (val === textInput) {
                this.setState({
                    value: textInput,
                    isSeach: true,
                });
            }
            return 1;
        })
    }

    Seach = (event) => {
        document.getElementById("SeachForm").reset('');
        event.preventDefault();
        if (this.state.isSeach) {
            this.setState({
                isSeach: false,
            });
            this.props.history.push(`/search/${this.state.value}`);
        } else {
            alert('No City !');
        }
    }


    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">WebSiteName</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li className="active">
                                <Link to="/">Home</Link>
                            </li>
                        </ul>
                        <form id="SeachForm" className="navbar-form navbar-right">
                            <div className="form-group">
                                <input type="text" onChange={this.ChangeInput} id="default" list="citys" className="form-control" placeholder="Search" name="search" />
                                <datalist id="citys">
                                    {
                                        city.map((val, index) => {
                                            return (<option key={index} value={`${val}`}></option>)
                                        })
                                    }
                                </datalist>
                            </div>
                            <button className="btn btn-default" onClick={this.Seach}>Submit</button>
                        </form>
                    </div>
                </nav>
                <Switch>
                    <Route path="/weather/:id" component={WeekWeather} />
                    <Route path="/search/:key" component={Seach} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        );
    }
}
export default withRouter(App);