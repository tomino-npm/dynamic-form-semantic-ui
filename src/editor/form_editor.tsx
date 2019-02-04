import * as React from 'react';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { DropCell } from './DropCell';
import { ToolItem } from './ToolItem';
import { css, FormControlProps } from '../common';
import { Grid, Segment, Form, Header } from 'semantic-ui-react';
import { FormView } from '../form_view';
import { observer } from 'mobx-react';

const editorGrid = css`
  .grid .fields .field {
    border-right: dashed 1px #aaa !important;
    border-bottom: dashed 1px #aaa !important;
    border-top: dashed 1px #aaa !important;
    padding: 0px !important;
  }

  .grid .fields .field:first-child {
    border-left: dashed 1px #aaa !important;
  }
`;

const F = () => (
  <Form.Field width={1}>
    <DropCell />
  </Form.Field>
);

const Row = () => (
  <Form.Group>
    <F />
    <F />
    <F />
    <F />
    <F />
    <F />
    <F />
    <F />
    <F />
    <F />
    <F />
    <F />
    <F />
    <F />
    <F />
    <F />
  </Form.Group>
);

@observer
export class FormEditor extends React.Component<FormControlProps> {
  public render() {
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <Grid className={editorGrid}>
          <Grid.Row stretched={true}>
            <Grid.Column width={2}>
              <Segment>
                <Header>Tools</Header>
                <ToolItem name="Input" />
                <ToolItem name="Select" />
                <ToolItem name="CheckBox" />
              </Segment>
            </Grid.Column>
            <Grid.Column width={11}>
              <FormView
                owner={this.props.owner}
                formControl={this.props.formControl}
                emptyField={DropCell}
                editMode={true}
              />
            </Grid.Column>
            <Grid.Column width={3}>
              <Segment>Properties 123</Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </DragDropContextProvider>
    );
  }
}
