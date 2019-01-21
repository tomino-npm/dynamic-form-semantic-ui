import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Form, Grid, Segment } from 'semantic-ui-react';

describe('Form Editor', () => {
  function componentWithData() {
    // just another notation
    return (
      <Grid>
        <Grid.Row stretched={true}>
          <Grid.Column width={2}>
            <Segment>Tools</Segment>
          </Grid.Column>
          <Grid.Column width={11}>
            <Form>
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
    const component = renderer.create(componentWithData());
    expect(component).toMatchSnapshot();
  });

  return { componentWithData };
});
