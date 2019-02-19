import * as React from 'react';
import { ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { css } from '../common';
import { FormElement } from '@tomino/dynamic-form';
import { editorState } from './editor_state';
import { Icon, SemanticICONS } from 'semantic-ui-react';

const bareItem = css`
  border: 1px solid #deded2;
  background-color: white;
  padding: 0.5rem 1rem;
  width: 100%;
`;

const style = css`
  cursor: move;
  width: 100%;
  height: 100%;
  display: flex;
`;

interface BoxProps {
  control: string;
  title: string;
  icon: SemanticICONS;
  row?: number;
  column?: number;
  formElement?: FormElement;
  parentFormElement?: FormElement;
}

interface BoxCollectedProps {
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
}

const createCoordinate = (name: string, row: number, column: number) =>
  `${name}[${row == null ? '-' : row}:${column == null ? '-' : column}]`;

class ToolItemView extends React.Component<BoxProps & BoxCollectedProps> {
  static source = {
    beginDrag(props: BoxProps, monitor: DragSourceMonitor) {
      let element = document.querySelector(
        `div[data-coordinate="${createCoordinate(props.control, props.row, props.column)}"]`
      );
      let elementLeft = window.scrollX + element.getBoundingClientRect().left;
      let elementWidth = element.clientWidth;
      let dragStart = monitor.getClientOffset();

      let position = dragStart.x - elementLeft < elementWidth / 2 ? 'left' : 'right';

      return {
        name: props.control,
        row: props.row,
        column: props.column,
        position
      };
    },

    endDrag(_props: BoxProps, _monitor: DragSourceMonitor) {
      editorState.clearHighlight();
      // const item = monitor.getItem();
      // const dropResult = monitor.getDropResult();
      // if (dropResult) {
      //   alert(`You dropped ${item.name} into ${dropResult.name}!`);
      // }
      // if (dropResult && props.remove) {
      //   props.remove();
      // }
    }
  };

  static dragCollector(connect: DragSourceConnector, monitor: DragSourceMonitor) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    };
  }

  container = React.createRef();

  public render() {
    const { isDragging, connectDragSource } = this.props;
    const { control, title, icon, children, row, column } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
      <div
        className={style}
        style={{ opacity }}
        data-coordinate={createCoordinate(control, row, column)}
      >
        {children ? (
          children
        ) : (
          <div className={bareItem}>
            <Icon name={icon} />
            {title}
          </div>
        )}
      </div>
    );
  }
}

export const ToolItem = DragSource(
  ItemTypes.TOOLITEM,
  ToolItemView.source,
  ToolItemView.dragCollector
)(ToolItemView);
