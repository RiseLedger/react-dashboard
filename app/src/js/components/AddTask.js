import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/taskActions';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as STATUS from '../constants/task';

class AddTask extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      title: '',
      description: ''
    }
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleInputChange(e) {
    const data = {};
    data[e.target.getAttribute('name')] = e.target.value;
    this.setState(data);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.addTask({
      id: new Date().getTime(),
      order: this.props.tasks.length + 1,
      title: this.state.title,
      description: this.state.description,
      status: STATUS.NOT_STARTED
    })

    this.setState({open: false});
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={::this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={this.state.title.length === 0 || this.state.description.length === 0}
        onTouchTap={::this.handleSubmit}
      />,
    ];

    return (
      <div>
        <RaisedButton
          className="add-task"
          label="Add task"
          primary={true}
          onTouchTap={::this.handleOpen} />
        <Dialog
          title="Add New Task"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <TextField
            hintText="Title"
            name="title"
            fullWidth={true}
            onChange={::this.handleInputChange}
          />
          <TextField
            hintText="Description"
            name="description"
            multiLine={true}
            fullWidth={true}
            onChange={::this.handleInputChange}
          />
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTask);
