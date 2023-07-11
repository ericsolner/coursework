import React, { Component} from "react";
import Counter from "./counter";

export default class DonutsDetail extends Component {
    render() {
        return (
            <div>
                DONUT DETAIL
                <Counter parentClicker={this.props.parentClicker}/>
            </div>
        );
    }
}