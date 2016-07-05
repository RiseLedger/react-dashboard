import React, {Component} from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from '../constants/itemTypes';
import flow from 'lodash/flow';
import {connect} from 'react-redux';
import * as actions from '../actions/taskActions';
import {bindActionCreators} from 'redux';

import '../../css/components/task.scss';

const taskSource = {
  beginDrag(props) {
    return {
      index: props.index,
      panelId: props.panelId,
      task: props.task
    };
  },

  endDrag(props, monitor, component) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    props.actions.saveDraggedTasks();
  }
};

const taskTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const sourcePanelId = monitor.getItem().panelId;

    // don't replace same items
    if (dragIndex === hoverIndex) {
      return;
    }

    if (props.panelId === sourcePanelId) {
      props.moveTask(monitor.getItem(), props);
    }
  }
}

class Task extends Component {
  render() {
    const { task, connectDragSource, connectDropTarget, isDragging, isOver } = this.props;

    return connectDragSource(connectDropTarget(
      <div className="task" style={{
        opacity: (isDragging && isOver) || isOver ? 0.3 : 1,
        cursor: 'move'
      }}>
        <h1 className="task-title">{task.title}</h1>
        <p className="task-description">{task.description}</p>
      </div>
    ));
  }
};

Task = flow(
  DragSource(ItemTypes.TASK, taskSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ItemTypes.TASK, taskTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }))
)(Task);

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Task);
