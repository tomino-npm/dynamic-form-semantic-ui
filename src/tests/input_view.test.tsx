import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { create } from './form_query_data';
import { JSONSchema, FormDefinition, FormModel, config } from '@tomino/dynamic-form';
import { TestComponent } from './common';

const schema: JSONSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    age: {
      type: 'number',
      minimum: 10
    },
    younger: {
      type: 'string',
      expression: `console.log(this); return this['age'] - 20`
    },
    older: {
      type: 'string',
      expression: `this['age'] + 10`
    }
  },
  required: ['name']
};

const formDefinition: FormDefinition = create.form({
  elements: [
    create.formElement({
      row: 0,
      column: 0,
      width: 14,
      control: 'Input',
      controlProps: {
        label: 'Name'
      },
      label: 'Mimo',
      source: 'name'
    }),
    create.formElement({
      row: 1,
      column: 1,
      width: 7,
      control: 'Input',
      source: 'age',
      label: 'Age: ',
      inline: true
    }),
    create.formElement({
      row: 1,
      column: 10,
      width: 2,
      control: 'Input',
      source: 'younger',
      label: 'Younger:',
      inline: true
    }),
    create.formElement({
      row: 0,
      column: 14,
      width: 2,
      control: 'Input',
      source: 'older',
      label: 'Older'
    })
  ]
});

const formData = {
  name: 'Tomas',
  age: 33
};

describe('Input', () => {
  function componentWithData() {
    const form = new FormModel(formDefinition, schema, formData);

    // just another notation
    return <TestComponent form={form} />;
  }

  const setDirty = jest.fn();

  beforeAll(() => {
    config.setDirty = () => setDirty();
  });

  it('renders correctly', () => {
    const component = renderer.create(componentWithData());
    expect(component).toMatchSnapshot();
  });

  it('changes value and all related formulas', () => {
    const component = renderer.create(componentWithData());
    const root = component.root;
    const age = root.findByProps({ name: 'age' });
    age.props.onChange({ currentTarget: { value: '40' } });
    expect(component).toMatchSnapshot();
    expect(setDirty).toBeCalled();
  });

  return { componentWithData };
});
