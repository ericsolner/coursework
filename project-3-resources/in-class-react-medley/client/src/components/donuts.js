import React, { Component} from "react";
import axios from "axios"
export default class Donuts extends Component {
    state = {
        donuts: []
    }

    componentDidMount() {
        axios.get("api/").then(response => this.setState({donuts: response.data}))
    }

    render() {
        const donutList = this.state.donuts.map((donut, i) => <li key={i}>{donut.name}</li>);
        return (
            <div className="row">
            <div className="col-lg-12 text-center">
              <h1 className="mt-5">Welcome to the Donut Page</h1>
              <p className="lead">Complete with pre-defined file paths and responsive navigation!</p>
              <ul className="list-unstyled">
                {donutList}
              </ul>
            </div>
          </div>
        );
    }
}