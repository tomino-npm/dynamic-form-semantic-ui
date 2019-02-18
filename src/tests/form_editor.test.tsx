import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Form, Grid, Segment } from 'semantic-ui-react';
import { css } from '@tomino/toolbelt';

const editorGrid = css`
  .grid .fields .field {
    border-right: dashed 1px #aaa !important;
    border-bottom: dashed 1px #aaa !important;
    border-top: dashed 1px #aaa !important;
  }

  .grid .fields .field:first-child {
    border-left: dashed 1px #aaa !important;
  }
`;

const Row = () => (
  <Form.Group>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
    <Form.Field width={1}>--</Form.Field>
  </Form.Group>
);

describe('Form Editor', () => {
  function component() {
    // just another notation
    return (
      <Grid className={editorGrid}>
        <Grid.Row stretched={true}>
          <Grid.Column width={2}>
            <Segment>Tools</Segment>
          </Grid.Column>
          <Grid.Column width={11}>
            <Form>
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
            </Form>
          </Grid.Column>
          <Grid.Column width={3}>
            <Segment>Properties 123</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  it('renders correctly', () => {
    const wrapper = renderer.create(component());
    expect(wrapper).toMatchSnapshot();
  });

  return { component };
});
