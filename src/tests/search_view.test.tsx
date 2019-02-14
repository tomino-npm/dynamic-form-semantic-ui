import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { create } from './form_query_data';
import { JSONSchema, FormDefinition, FormModel } from '@tomino/dynamic-form';
import { TestComponent } from './common';

const schema: JSONSchema = {
  type: 'object',
  properties: {
    country: {
      type: 'string'
    },
    selectedCountry: {
      type: 'string'
    }
  }
};

const options = [{ title: 'Australia', value: 'AUS' }, { title: 'Slovakia', value: 'SVK' }];

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
      width: 6,
      handler: 'findCountry',
      control: 'Search',
      label: 'Country',
      source: 'country'
    }),
    create.formElement({
      row: 0,
      column: 6,
      width: 6,
      handler: 'findCountryWithControl',
      control: 'Search',
      label: 'Country With Control',
      source: 'country',
      renderer: `<table><tr><td width="100">{0}<!--country--></td><td>{1}<!--city--></td></tr></table>`
    }),
    create.formElement({
      row: 0,
      column: 12,
      width: 4,
      handler: 'findCountry',
      control: 'Search',
      label: 'Selected',
      source: 'selectedCountry'
    })
  ]
});

function componentWithData() {
  const form = new FormModel(formDefinition, schema, { selectedCountry: 'SVK' });

  // just another notation
  return (
    <TestComponent
      form={form}
      handlers={{
        search: (name: string, searchString: string, id: string) => {
          if (name === 'findCountry') {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                  options.filter(o => (id ? o.value === id : o.title.indexOf(searchString) >= 1))
                );
              }, 100);
            });
          } else {
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(
                  controlledOptions.filter(o =>
                    id ? o.value === id : o.titles[0].indexOf(searchString) >= 1
                  )
                );
              }, 100);
            });
          }
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

describe('Search', () => {
  it('renders', () => {
    const component = renderer.create(componentWithData());
    expect(component).toMatchSnapshot();
  });
  return { componentWithData };
});
