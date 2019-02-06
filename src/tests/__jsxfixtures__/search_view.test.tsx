import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { create } from '../form_query_data';
import { JSONSchema, FormDefinition, FormModel, config } from '@tomino/dynamic-form';
import { TestComponent } from '../common';

const schema: JSONSchema = {
  type: 'object',
  properties: {
    country: {
      type: 'string'
    }
  }
};

const options = [
  { title: 'Sydney', value: 'SYD', country: 'AU' },
  { title: 'Melbourne', value: 'MEL', country: 'AU' },
  { title: 'Kosice', value: 'KE', country: 'SK' },
  { title: 'Bratislava', value: 'BA', country: 'SK' }
];

const formDefinition: FormDefinition = create.form({
  elements: [
    create.formElement({
      row: 0,
      column: 0,
      width: 8,
      list: 'findCountry',
      control: 'Search',
      label: 'Country',
      source: 'country'
    })
  ]
});

function componentWithData() {
  const form = new FormModel(formDefinition, schema, {});

  // just another notation
  return (
    <TestComponent
      form={form}
      handlers={{
        findCountry: name => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(options.filter(o => o.title.indexOf(name) >= 1));
            }, 400);
          });
        }
      }}
    />
  );
}

export default componentWithData();
