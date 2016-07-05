import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import DoneIcon from 'material-ui/svg-icons/action/done';
import Divider from 'material-ui/Divider';

import {AboutLinks} from '../constants/links';

class AboutPage extends Component {

  render() {
    return (
      <div>
        <h3>This is a simple example of Realtime Dashboard Application</h3>
        <p>List of technologies that was used:</p>

        <List>
          {AboutLinks.map((item, index) => {
            return (
              <ListItem
                key={index}
                primaryText={item.title}
                leftIcon={<DoneIcon />}
                onTouchTap={() => { window.open(item.url, '_blank') }} />
            );
          })}
        </List>
        <Divider />
        <div className="installation-process">
          Getting Started:
          <ol>
            <li>Clone the <a href="https://github.com/RiseLedger/react-dashboard">repository</a></li>
            <li>npm install</li>
            <li>npm start</li>
            <li>Open browser at <a href="http://localhost:3333/">following link</a></li>
            <li>Enjoy :)</li>
          </ol>
        </div>
      </div>
    );
  }

};

export default AboutPage;
