import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Button, Segment } from 'semantic-ui-react';
import { JSONSchema, FormDefinition, undoManager, FormModel, config } from '@tomino/dynamic-form';

import { TableView } from '../table_view';
import { create } from './form_query_data';

describe('Form', () => {
  const schema: JSONSchema = {
    type: 'object',
    properties: {
      countries: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'id'
            },
            name: {
              type: 'string'
            },
            capital: {
              type: 'string'
            }
          },
          required: ['name']
        }
      }
    }
  };

  const controlData = {
    countries: [
      { name: 'Slovakia', capital: 'Bratislava' },
      { name: 'Australia', capital: 'Canberra' }
    ]
  };

  const formDefinition: FormDefinition = create.form({
    elements: [
      create.formElement({
        row: 0,
        column: 0,
        width: 16,
        control: 'Table',
        source: 'countries',
        elements: [
          create.formElement({
            width: 8,
            control: 'Input',
            label: 'Name',
            source: 'name'
          }),
          create.formElement({
            width: 8,
            control: 'Input',
            label: 'Capital',
            source: 'capital'
          })
          // create.formElement({
          //   id: '4',
          //   parentElement: '1',
          //   row: 0,
          //   column: 15,
          //   width: 1,
          //   control: QueryTypes.FormControl.DeleteButton,
          //   label: '\xa0'
          // })
        ]
      })
    ]
  });

  describe('Table', () => {
    function componentWithData() {
      config.setDirty = () => console.log('Now it dirty');
      const form = new FormModel(formDefinition, schema, controlData);

      // just another notation
      return (
        <Segment className="ui form">
          <TableView formControl={form.elements[0]} owner={form.dataSet} handlers={{}} />

          <div style={{ marginTop: '20px' }}>
            <Button content="Undo" onClick={() => undoManager.undo()} />
            <Button content="Redo" onClick={() => undoManager.redo()} />
          </div>
        </Segment>
      );
    }

    it('renders correctly', () => {
      const component = renderer.create(componentWithData());
      expect(component).toMatchSnapshot();
    });

    it('changes value and all related formulas', () => {
      // const component = renderer.create(data.component);
      // const root = component.root;
      // const agree = root.findByProps({ name: 'agree' });
      // agree.props.onChange(null, { value: false });
      // const disagree = root.findByProps({ name: 'disagree' });
      // disagree.props.onChange(null, { value: true });
      // expect(component).toMatchSnapshot();
    });

    return {
      componentWithData
    };
  });
});
