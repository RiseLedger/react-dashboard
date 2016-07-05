import React, {PropTypes, Component} from 'react';
import update from 'react-addons-update';
import { DropTarget } from 'react-dnd';
import {connect} from 'react-redux';
import * as actions from '../actions/taskActions';
import {bindActionCreators} from 'redux';
import * as STATUS from '../constants/task';

import Task from './Task';
import { ItemTypes } from '../constants/itemTypes';
import '../../css/components/panel.scss';

const taskTarget = {
  drop(props, monitor, component ) {
    const { panelId } = props;
    const sourceObj = monitor.getItem();

    if ( panelId !== sourceObj.panelId ) component.changeTaskStatus(sourceObj.task, panelId);
    return {
      panelId: panelId
    };
  }
}

class Panel extends Component {

  constructor(props, context) {
    super(props, context);
    this.moveTask = this.moveTask.bind(this);
  }

  changeTaskStatus(task, panelId) {
    const mapStatus = {
      1: STATUS.NOT_STARTED,
      2: STATUS.IN_PROGRESS,
      3: STATUS.TESTING,
      4: STATUS.COMPLETED
    };

    this.props.actions.changeStatus(task, mapStatus[panelId]);
  }

  removeTask() {
    // console.log('remove task from current panel');
  }

  moveTask(dragTask, hoverTask) {
    this.props.actions.swapTask(dragTask.task, hoverTask.task);
  }

  render() {
    const { tasks } = this.props;
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    const backgroundColor = isActive ? '#f8ffff' : '';

    return connectDropTarget(
      <div className="panel">
        <div className="panel-header">{this.props.title}</div>
        <div className="panel-body" style={{backgroundColor}}>
          {tasks.map((item, index) => {
            return <Task key={index} index={index} task={item} panelId={this.props.panelId} moveTask={this.moveTask} />
          })}
        </div>
      </div>
    );
  }
};

Panel.propTypes = {
  title: PropTypes.string.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

Panel = DropTarget(ItemTypes.TASK, taskTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(Panel);

export default connect(
  null,
  mapDispatchToProps
)(Panel);
