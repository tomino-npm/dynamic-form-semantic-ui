import * as React from 'react';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { ToolItem } from './ToolItem';
import { DataSet, FormElement } from '@tomino/dynamic-form';

const style: React.CSSProperties = {
  overflow: 'hidden',
  height: '100%'
};

const boxTarget = {
  drop(props: DropCellProps, monitor: DropTargetMonitor, component: React.Component | null) {
    if (!component) {
      return;
    }

    const item = monitor.getItem();

    component.setState({
      hasDropped: true,
      dropped: item.name
    });

    const parentItem = props.parentFormControl.elements.find(
      e => e.row === item.row && e.column === e.column
    );
    if (parentItem) {
      // MOVE EXISTING ELEMENT
      parentItem.row = item.row;
      parentItem.column = item.column;
    } else {
      //  ADD NEW ELEMENT
      props.parentFormControl.elements.push({
        ...props.formControl,
        control: item.name
      });
    }

    return {
      name: 'DropCell'
    };
  }
};

export interface DropCellProps {
  canDrop?: boolean;
  isOver?: boolean;
  connectDropTarget?: ConnectDropTarget;
  owner?: DataSet;
  formControl?: FormElement;
  parentFormControl?: FormElement;
}

class DropCellView extends React.Component<DropCellProps> {
  state = {
    dropped: ''
  };

  remove = () => {
    this.setState({ dropped: '' });
  };

  public render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = 'pink';
    if (isActive) {
      backgroundColor = 'grey';
    } else if (canDrop) {
      backgroundColor = 'white';
    }

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }}>
        {/* {isActive ? 'Release to drop' : 'Drag a box here: ' + this.state.dropped} */}
        {this.state.dropped ? (
          <ToolItem
            name={this.state.dropped}
            remove={this.remove}
            row={this.props.formControl.row}
            column={this.props.formControl.column}
          />
        ) : (
          '\xa0'
        )}
      </div>
    );
  }
}

export const DropCell = DropTarget(
  ItemTypes.BOX,
  boxTarget,
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)(DropCellView);
