import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import ErrorMessage from "./ErrorMessage";

import Spinner from "./Spinner";

class App extends React.Component {
  state = {
    lat: null,
    errorMessage: ""
  };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      Position => this.setState({ lat: Position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <ErrorMessage errmess={this.state.errorMessage} />;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    return <Spinner message="Please accept location request" />;
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
