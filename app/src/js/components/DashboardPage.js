import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/taskActions';
import {bindActionCreators} from 'redux';
import * as STATUS from '../constants/task';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Panel from './Panel'

class DashboardPage extends Component {

  componentWillMount() {
    this.props.actions.listenForNewTasks();
  }

  filterTaskBy(status) {
    const { tasks } = this.props;
    const filtered = tasks.filter((item) => {
      return item.status === status;
    });
    const sorted = filtered.sort((l, r) => {
      return l.order - r.order;
    })
    return sorted;
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="row equal-height-cols">
          <div className="col-3">
            <Panel title="Not Started" panelId={1} tasks={::this.filterTaskBy(STATUS.NOT_STARTED)} />
          </div>
          <div className="col-3">
            <Panel title="In Progress" panelId={2} tasks={::this.filterTaskBy(STATUS.IN_PROGRESS)} />
          </div>
          <div className="col-3">
            <Panel title="Testing" panelId={3} tasks={::this.filterTaskBy(STATUS.TESTING)} />
          </div>
          <div className="col-3">
            <Panel title="Completed" panelId={4} tasks={::this.filterTaskBy(STATUS.COMPLETED)} />
          </div>
        </div>
      </div>
    );
  }

};

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

DashboardPage = DragDropContext(HTML5Backend)(DashboardPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
