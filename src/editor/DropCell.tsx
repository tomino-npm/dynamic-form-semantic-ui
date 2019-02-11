import * as React from 'react';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { ToolItem } from './ToolItem';
import { DataSet, FormElement } from '@tomino/dynamic-form';
import { observer } from 'mobx-react';
import { editorState } from './editor_state';
import { action } from 'mobx';
import { findConflict } from './editor_helpers';

const style: React.CSSProperties = {
  overflow: 'hidden',
  height: '100%',
  padding: '2px'
};

export interface DropCellProps {
  canDrop?: boolean;
  isOver?: boolean;
  connectDropTarget?: ConnectDropTarget;
  owner?: DataSet;
  formControl?: FormElement;
  parentFormControl?: FormElement;
}

function adjustPosition(
  where: string,
  source: FormElement,
  position: FormElement,
  parent: FormElement
) {
  // adjust from left or right
  let column =
    where === 'left' ? position.column : (source.column = position.column - source.width + 1);
  // adjust to min width
  column = column < 0 ? 0 : column;
  // adjust to max width
  column = column + source.width > 15 ? 15 - source.width + 1 : column;

  let cells = parent.elements.filter(e => e.row === position.row && e !== source);
  // try one adjustment
  let conflict = findConflict(cells, column, column + source.width - 1);
  if (conflict) {
    column = where === 'left' ? conflict.column - source.width : conflict.column + conflict.width;
  }
  // if it fails again we give up
  conflict = findConflict(cells, column, column + source.width - 1);
  if (conflict) {
    return -1;
  }
  return column;
}

@observer
class DropCellView extends React.Component<DropCellProps> {
  static target = {
    drop: action(
      (props: DropCellProps, monitor: DropTargetMonitor, component: React.Component | null) => {
        if (!component || !props.parentFormControl) {
          return;
        }

        const item = monitor.getItem();

        // debugger;
        // component.setState({
        //   hasDropped: true,
        //   dropped: item.name
        // });

        // find the existing cell in the parent collection
        // if it exists we will only modify it
        let clearCell = props.parentFormControl.elements.find(
          e => e.row === item.row && e.column === item.column
        );

        // this decides whether we are trying to drag on top of existing cell
        const existingCell = props.parentFormControl.elements.find(
          e => e.row === props.formControl.row && e.column === props.formControl.column
        );
        if (existingCell) {
          return;
        }

        let width = clearCell ? clearCell.width : 1;
        if (clearCell) {
          const column = adjustPosition(
            item.position,
            clearCell,
            props.formControl,
            props.parentFormControl
          );
          // const column = props.formControl.column;
          if (column === -1) {
            return;
          }
          clearCell.row = props.formControl.row;
          clearCell.column = column;
          // we can grab by left part or right part
        } else {
          props.parentFormControl.elements.push({
            row: props.formControl.row,
            column: props.formControl.column,
            control: item.name,
            width,
            label: ''
          });
          clearCell = props.parentFormControl.elements[props.parentFormControl.elements.length - 1];
        }

        editorState.selectedElement = clearCell;
        editorState.selectedParent = props.parentFormControl;

        return {
          name: 'DropCell'
        };
      }
    )
  };

  static dropCollector(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    // console.log(arguments)
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    };
  }

  toggleActive = () => {
    editorState.selectedElement = this.props.formControl;
    editorState.selectedParent = this.props.parentFormControl;
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

export const DropCell = DropTarget(ItemTypes.BOX, DropCellView.target, DropCellView.dropCollector)(
  DropCellView
);
