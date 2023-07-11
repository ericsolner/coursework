import React, { Component } from 'react';

export default class Counter extends Component { 
    render() {
        return (
        <div>
            <button onClick={this.props.parentClicker}className="btn btn-success">Update PARENT!</button>
        </div>
        );
    }
}