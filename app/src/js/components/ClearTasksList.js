import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/taskActions';

class ClearTasksList extends Component {

  constructor(props, context) {
    super(props, context);
  }

  handleClear() {
    this.props.actions.clearTasksList();
  }

  render() {
    return (
      <RaisedButton
        className="remove-tasks"
        label="Remove all tasks"
        secondary={true}
        onTouchTap={::this.handleClear} />
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(ClearTasksList);
