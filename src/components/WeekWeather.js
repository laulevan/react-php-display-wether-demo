import React, { Component } from 'react';
import moment from 'moment';
class WeekWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }
    componentWillMount() {
        let oldData = [];
        let addr = `http://localhost/jobs/weather/weather.php?command=location&woeid=${this.props.match.params.id}`;
        fetch(addr)
            .then(results => {
                return results.json();
            }).then(data => {
                data.consolidated_weather.map((val) => {
                    oldData.push({
                        the_temp: val.the_temp,
                        min_temp: val.min_temp,
                        max_temp: val.max_temp,
                        applicable_date: val.applicable_date,
                        weather_state_abbr: val.weather_state_abbr
                    })
                    return 1;

                })
                this.setState({
                    data: oldData,
                })
            }
            )
    }
    render() {
        const divStyle = {
            height: "200px"
        };
        const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return (
            <div>
                {
                    this.state.data.map((val, index) => {
                        var date = moment(val.applicable_date);
                        var dow = date.day();
                        for (let i = 0; i < 7; i++) {
                            if (dow === i) {
                                var element = day[i];
                            }
                        }
                        return (
                            <div className="col-sm-4" style={divStyle} key={index}>
                                <img src={`https://www.metaweather.com/static/img/weather/${val.weather_state_abbr}.svg`} alt="Sleet" style={{ width: 32 }} />
                                <p>{Math.round(val.the_temp)}°C</p>
                                <p>max: {Math.round(val.min_temp)}°C</p>
                                <p>min: {Math.round(val.max_temp)}°C</p>
                                <p>{element}</p>
                                <p>{val.applicable_date}</p>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default WeekWeather;

