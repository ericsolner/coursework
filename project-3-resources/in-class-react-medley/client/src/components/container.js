import React, {Component} from "react";

export default class Container extends Component {
    render() {
        return (
            <div className="container">
                <br />
                <br />
                <br />
                { this.props.children }
            </div>

        );
    }
}