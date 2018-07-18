import React, { Component } from 'react';
import { Link } from "react-router-dom";
class SeachResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            the_temp: null,
            min_temp: null,
            max_temp: null,
            states: null,
        }
    };

    componentWillReceiveProps(props) {
        let addr = `http://localhost/jobs/weather/weather.php?command=location&woeid=${props.woeid}`;
        
            fetch(addr)
                .then(results => {
                    return results.json();
                }).then(data => {
                    this.setState({
                        the_temp: data.consolidated_weather[0].the_temp,
                        min_temp: data.consolidated_weather[0].min_temp,
                        max_temp: data.consolidated_weather[0].max_temp,
                        states: data.consolidated_weather[0].weather_state_abbr,
                    })
                })
    
    }

    render() {
        const divStyle = {
            height: "200px"
        };
        return (
            <div className="col-sm-4" style={divStyle}>
                <img src={`https://www.metaweather.com/static/img/weather/${this.state.states}.svg`} alt="Sleet" style={{ width: 32 }} />
                <Link to={`/weather/${this.props.woeid}`}><h4>{this.props.name}</h4></Link>
                <p>{Math.round(this.state.the_temp)}°C</p>
                <p>max: {Math.round(this.state.max_temp)}°C</p>
                <p>min: {Math.round(this.state.min_temp)}°C</p>
            </div>
        );
    }
}

export default SeachResults;