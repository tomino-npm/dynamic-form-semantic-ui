import * as React from 'react';

import { create } from '../form_query_data';
import { JSONSchema, FormDefinition, FormModel } from '@tomino/dynamic-form';
import { TestComponent } from '../common';

const schema: JSONSchema = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      format: 'date'
    },
    range: {
      type: 'string'
    }
  }
};

const formDefinition: FormDefinition = create.form({
  elements: [
    create.formElement({
      row: 0,
      column: 0,
      width: 4,
      control: 'Date',
      label: 'Date',
      source: 'date'
    }),
    create.formElement({
      row: 0,
      column: 4,
      width: 4,
      control: 'Time',
      label: 'Time',
      source: 'date'
    }),
    create.formElement({
      row: 0,
      column: 8,
      width: 4,
      control: 'DateTime',
      label: 'Date Time',
      source: 'date'
    }),
    create.formElement({
      row: 0,
      column: 8,
      width: 4,
      control: 'DateRange',
      label: 'Date Range',
      source: 'range'
    })
  ]
});

function componentWithData() {
  const form = new FormModel(formDefinition, schema, {});

  // just another notation
  return <TestComponent form={form} />;
}

export default componentWithData();
