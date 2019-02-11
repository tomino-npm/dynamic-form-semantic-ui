import * as React from 'react';

import { create } from '../form_query_data';
import { JSONSchema, FormDefinition, FormModel } from '@tomino/dynamic-form';
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

const controlledOptions = [
  { titles: ['Australia', 'Sydney'], value: 'SYD' },
  { titles: ['Australia', 'Melbourne'], value: 'SYD' },
  { titles: ['New Zealand', 'Christchurch'], title: 'Kiwis', value: 'SYD' }
];

const formDefinition: FormDefinition = create.form({
  elements: [
    create.formElement({
      row: 0,
      column: 0,
      width: 8,
      handler: 'findCountry',
      control: 'Search',
      label: 'Country',
      source: 'country'
    }),
    create.formElement({
      row: 0,
      column: 0,
      width: 8,
      handler: 'findCountryWithControl',
      control: 'Search',
      label: 'Country With Control',
      source: 'country',
      renderer: `<table><tr><td width="100">{0}<!--country--></td><td>{1}<!--city--></td></tr></table>`
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
        findCountry: (name: string) => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(options.filter(o => o.title.indexOf(name) >= 1));
            }, 100);
          });
        },
        findCountryWithControl: () => {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(controlledOptions);
            }, 100);
          });
        }
      }}
    />
  );
}

export default componentWithData();
