import React, { PropTypes, Component } from 'react';

import Nav from './Nav';

class App extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="dashboard">
        <Nav />
        <div className="container">{this.props.children}</div>
      </div>
    );
  }

};

App.propTypes = {
  children: PropTypes.element
};

export default App;
