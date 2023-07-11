import React, { Component } from "react";
import Nav from "./components/nav";
import Container from "./components/container";
import Donuts from "./components/donuts";
import DonutsDetail from "./components/donutsDetail";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
class App extends Component {

  state = {
    count: 0
  }
  addOneToChild = () => {
    this.setState({count: this.state.count + 1});
  }
  //render={(props) => <Dashboard {...props} isAuthed={true} />
  render() {
    return (
      <Router>
        <div>
          <Nav clickHandler={this.addOneToChild}/>
          <Container>
            {this.state.count}
            <Route exact path="/" component={Donuts} />
            <Route exact path="/detail" 
                   render={(props) => <DonutsDetail {...props} parentClicker={this.addOneToChild} />} />
          </Container>

        </div>
      </Router>
    );
  }
}

export default App;
