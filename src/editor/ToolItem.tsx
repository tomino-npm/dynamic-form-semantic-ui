import * as React from 'react';
import { ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { css } from '../common';
import { FormElement } from '@tomino/dynamic-form';

const style = css`
  /* border: 1px solid #deded2; */
  /* background-color: white; */
  /* padding: 0.5rem 1rem; */
  cursor: move;
  width: 100%;
`;

interface BoxProps {
  name: string;
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
  `${name}[${row || '-'}:${column || '-'}]`;

const boxSource = {
  beginDrag(props: BoxProps, monitor: DragSourceMonitor) {
    // if (props.formElement && props.parentFormElement) {
    //   props.parentFormElement.elements.remove(props.formElement);
    // }
    let element = document.querySelector(
      `div[data-coordinate="${createCoordinate(props.name, props.row, props.column)}"]`
    );
    let elementLeft = window.scrollX + element.getBoundingClientRect().left;
    let elementWidth = element.clientWidth;
    let dragStart = monitor.getClientOffset();

    let position = dragStart.x - elementLeft < elementWidth / 2 ? 'left' : 'right';

    return {
      name: props.name,
      row: props.row,
      column: props.column,
      position
    };
  },

  endDrag(props: BoxProps, monitor: DragSourceMonitor) {
    // const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    // if (dropResult) {
    //   alert(`You dropped ${item.name} into ${dropResult.name}!`);
    // }
    // if (dropResult && props.remove) {
    //   props.remove();
    // }
  }
};

class Box extends React.Component<BoxProps & BoxCollectedProps> {
  container = React.createRef();

  public render() {
    const { isDragging, connectDragSource } = this.props;
    const { name, children, row, column } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
      <div
        className={style}
        style={{ opacity }}
        data-coordinate={createCoordinate(name, row, column)}
      >
        {children ? children : name}
      </div>
    );
  }
}

export const ToolItem = DragSource(
  ItemTypes.BOX,
  boxSource,
  (connect: DragSourceConnector, monitor: DragSourceMonitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })
)(Box);
