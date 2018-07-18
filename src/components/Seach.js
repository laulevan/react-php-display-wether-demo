import React, { Component } from 'react';
import SeachResults from './SeachResults';
import {URL} from "../constants/Constants"

class Seach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      name: null,
    }
  };

  componentWillReceiveProps(props) {
    if (props.match.params.key !== this.state.name) {
      this.setState({
        name : props.match.params.key
      })
      let addr = `${URL}?command=search&keyword=${props.match.params.key}`;
      fetch(addr)
        .then(results => {
          return results.json();
        }).then(data => {
          this.setState({
            value: data[0].woeid,
            name: props.match.params.key
          })
  
        })
    }
  }

  componentWillMount () {
    let addr = `${URL}?command=search&keyword=${this.props.match.params.key}`;
    fetch(addr)
      .then(results => {
        return results.json();
      }).then(data => {
        this.setState({
          value: data[0].woeid,
          name: this.props.match.params.key
        })

      })
  }
  render() {
    return (
      <div>
        <SeachResults woeid={this.state.value} name={this.state.name} />
      </div>
    );
  }
}

export default Seach;
