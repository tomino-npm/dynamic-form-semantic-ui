import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { create } from './form_query_data';
import { JSONSchema, FormDefinition, FormModel, config } from '@tomino/dynamic-form';
import { TestComponent } from './common';

const schema: JSONSchema = {
  type: 'object',
  properties: {
    religion: {
      type: 'string'
    },
    lined_religion: {
      type: 'string'
    },
    religions: {
      enum: [
        { text: 'Christian', value: 'CH' },
        { text: 'Buddhist', value: 'BU' },
        { text: 'Jedi', value: 'JE' }
      ]
    }
  }
};

const controlData = { religion: 'JE', lined_religion: 'BU' };

const formDefinition: FormDefinition = create.form({
  elements: [
    create.formElement({
      row: 0,
      column: 0,
      width: 16,
      list: 'religions',
      control: 'Radio',
      label: 'Religions',
      source: 'religion',
      inline: true
    }),
    create.formElement({
      row: 1,
      column: 0,
      width: 16,
      list: 'religions',
      control: 'Radio',
      label: 'Religions',
      source: 'lined_religion',
      vertical: true
    })
  ]
});

describe('Radio', () => {
  const setDirty = jest.fn();

  beforeAll(() => {
    config.setDirty = () => setDirty();
  });

  function componentWithData() {
    const form = new FormModel(formDefinition, schema, controlData);

    // just another notation
    return <TestComponent form={form} />;
  }
  it('renders correctly', () => {
    const component = renderer.create(componentWithData());
    expect(component).toMatchSnapshot();
  });

  it('changes values', () => {
    const component = renderer.create(componentWithData());
    const root = component.root;
    const agree = root.findAllByProps({ value: 'BU' });
    agree[1].props.onChange(null, { value: 'BU' });

    expect(component).toMatchSnapshot();
    expect(setDirty).toHaveBeenCalled();
  });

  return {
    component: componentWithData()
  };
});
