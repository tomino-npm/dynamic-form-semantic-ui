import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { create } from './form_query_data';
import { JSONSchema, FormDefinition, FormModel } from '@tomino/dynamic-form';
import { TestComponent } from './common';

const schema: JSONSchema = {
  type: 'object',
  properties: {
    countries: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          name: {
            type: 'string'
          },
          capital: {
            type: 'string'
          }
        }
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
      control: 'Repeater',
      source: 'countries',
      elements: [
        create.formElement({
          row: 0,
          column: 0,
          width: 8,
          control: 'Input',
          label: 'Name',
          source: 'name'
        }),
        create.formElement({
          row: 0,
          column: 8,
          width: 8,
          control: 'Input',
          label: 'Capital',
          source: 'capital'
        }),
        create.formElement({
          row: 0,
          column: 15,
          width: 1,
          control: 'DeleteButton',
          label: '\xa0'
        })
      ]
    })
  ]
});

describe('Repeater', () => {
  function component() {
    const form = new FormModel(formDefinition, schema, controlData);

    // just another notation
    return <TestComponent form={form} />;
  }

  it('renders correctly', () => {
    const comp = renderer.create(component());
    expect(comp).toMatchSnapshot();
  });

  return {
    component
  };

  // it('changes value and all related formulas', () => {
  //   // const wrapper = renderer.create(data.component);
  //   // const root = component.root;
  //   // const agree = root.findByProps({ name: 'agree' });
  //   // agree.props.onChange(null, { value: false });
  //   // const disagree = root.findByProps({ name: 'disagree' });
  //   // disagree.props.onChange(null, { value: true });
  //   // expect(wrapper).toMatchSnapshot();
  // });
});
