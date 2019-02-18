import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { create } from './form_query_data';
import { JSONSchema, FormDefinition, FormModel } from '@tomino/dynamic-form';
import { TestComponent } from './common';

const schema: JSONSchema = {
  type: 'object',
  properties: {
    description: {
      type: 'string'
    }
  },
  required: ['name']
};

const formDefinition: FormDefinition = create.form({
  elements: [
    create.formElement({
      row: 0,
      column: 0,
      width: 16,
      control: 'Comment',
      label: 'Description',
      source: 'description'
    })
  ]
});

const formData = {
  description: 'Some Description'
};

describe('Comment', () => {
  function component() {
    const form = new FormModel(formDefinition, schema, formData);

    // just another notation
    return <TestComponent form={form} />;
  }

  it('renders correctly', () => {
    const comment = renderer.create(component());
    expect(comment).toMatchSnapshot();
  });

  return { component };
});
