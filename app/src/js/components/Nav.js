import React, {Component} from 'react';
import { Link, IndexLink } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import AddTask from './AddTask';
import ClearTasksList from './ClearTasksList';
import '../../css/components/nav.scss';

class Nav extends Component {

  render() {
    return (
      <div className="main-menu main-bar">
        <ul className="pull-left">
          <li><IndexLink to="/">Dashboard</IndexLink></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <div className="pull-right main-bar-actions">
          <AddTask />
          <ClearTasksList />
        </div>
      </div>
    );
  }

};

export default Nav;
