import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomeScreen from "./container/HomeScreen";
import LoginScreen from "./container/LoginScreen";
import DashScreen from "./container/Dashboard";

class App extends React.Component {
  render() {
    return (
      <Router initialEntries={["/"]}>
        <div className="container">
          <main>
            <Switch>
              <Route exact path="/" component={LoginScreen} />
              <Route exact path="/home" component={HomeScreen} />
              <Route exact path="/dashboard" component={DashScreen} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
