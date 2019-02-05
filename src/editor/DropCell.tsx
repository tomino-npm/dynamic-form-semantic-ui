import * as React from 'react';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { ToolItem } from './ToolItem';
import { DataSet, FormElement } from '@tomino/dynamic-form';
import { renderEditControl } from './editor_form_control_factory';
import { observer } from 'mobx-react';
import { editorState } from './editor_state';

const style: React.CSSProperties = {
  overflow: 'hidden',
  height: '100%'
};

const boxTarget = {
  drop(props: DropCellProps, monitor: DropTargetMonitor, component: React.Component | null) {
    if (!component || !props.parentFormControl) {
      return;
    }

    const item = monitor.getItem();

    // debugger;
    // component.setState({
    //   hasDropped: true,
    //   dropped: item.name
    // });

    const clearCell = props.parentFormControl.elements.find(
      e => e.row === item.row && e.column === item.column
    );
    let width = clearCell ? clearCell.width : 1;
    if (clearCell) {
      clearCell.row = props.formControl.row;

      // we can grab by left part or right part
      if (item.position === 'left') {
        // check if we can move that element there
        clearCell.column = props.formControl.column;
      } else {
        clearCell.column = props.formControl.column - clearCell.width + 1;
      }
    } else {
      props.parentFormControl.elements.push({
        row: props.formControl.row,
        column: props.formControl.column,
        control: item.name,
        width
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

@observer
class DropCellView extends React.Component<DropCellProps> {
  toggleActive = () => {
    editorState.selectedElement = this.props.formControl;
  };

  public render() {
    const { canDrop, isOver, connectDropTarget, formControl } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = 'white';
    if (editorState.selectedElement === formControl) {
      backgroundColor = 'transparent';
    } else if (isActive) {
      backgroundColor = 'grey';
    } else if (canDrop) {
      backgroundColor = 'white';
    }

    let control =
      this.props.formControl.control === 'EditorCell' ? '' : this.props.formControl.control;

    return connectDropTarget(
      <div style={{ ...style, backgroundColor }} onClick={this.toggleActive}>
        {/* {isActive ? 'Release to drop' : 'Drag a box here: ' + this.state.dropped} */}
        {control ? (
          <ToolItem
            name={this.props.formControl.control}
            row={this.props.formControl.row}
            column={this.props.formControl.column}
          >
            {this.props.children}
          </ToolItem>
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
