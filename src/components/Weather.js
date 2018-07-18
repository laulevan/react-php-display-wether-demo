import React, { Component } from 'react';
import City from './City';
import {URL} from "../constants/Constants"
class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: [],
        }
    };
    componentWillMount() {
        var oldName = [];
        let city = ["istanbul", "berlin", "london", "helsinki", "dublin", "vancouver"];
        let url = `${URL}?command=search&keyword=`;
        city.map((val) => {
            let addr = url + val;
            return (
                fetch(addr)
                    .then((results) => {
                        return results.json();
                    }).then((data) => {
                        // console.log('1', data)
                        let value = (
                            <City
                                key={data[0].woeid}
                                name={data[0].title}
                                woeid={data[0].woeid}
                            />
                        );
                        oldName.push(value);
                        // console.log('2',oldName)
                        this.setState({
                            name: oldName,
                        })

                    })
            )
        })
    }

    render() {
        return (
            <div >
                {
                    this.state.name
                }
            </div>
        );
    }
}

export default Weather;