import React, { Component } from 'react';

import Weather from './Weather';
class Home extends Component {

    render() {
        return (
            <div>
                <div id="services" className="container-fluid text-center">
                    <h2>Weather</h2>
                    <br />
                    <Weather />
                </div>
            </div>
        );
    }
}

export default Home;
