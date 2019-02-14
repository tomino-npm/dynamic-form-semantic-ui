import * as React from 'react';

import { create } from './form_query_data';
import { JSONSchema, FormDefinition, FormModel } from '@tomino/dynamic-form';
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

const form = new FormModel(formDefinition, schema, controlData);

// just another notation
describe('Radio', () => {
  return {
    componentWithData: () => <TestComponent form={form} />
  };
});
