import * as React from 'react';
import { ConnectDragSource, DragSource, DragSourceConnector, DragSourceMonitor } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style: React.CSSProperties = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  cursor: 'move',
  float: 'left',
  width: '100%'
};

interface BoxProps {
  name: string;
  row?: number;
  column?: number;
  remove?: Function;
}

interface BoxCollectedProps {
  isDragging: boolean;
  connectDragSource: ConnectDragSource;
}

const boxSource = {
  beginDrag(props: BoxProps) {
    return {
      name: props.name,
      row: props.row,
      column: props.column
    };
  },

  endDrag(props: BoxProps, monitor: DragSourceMonitor) {
    // const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    // if (dropResult) {
    //   alert(`You dropped ${item.name} into ${dropResult.name}!`);
    // }
    if (dropResult && props.remove) {
      props.remove();
    }
  }
};

class Box extends React.Component<BoxProps & BoxCollectedProps> {
  public render() {
    const { isDragging, connectDragSource } = this.props;
    const { name } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(<div style={{ ...style, opacity }}>{name}</div>);
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
