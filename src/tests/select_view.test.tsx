import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { create } from './form_query_data';
import { JSONSchema, FormDefinition, FormModel, config } from '@tomino/dynamic-form';
import { TestComponent } from './common';

describe('Form', function() {
  const schema: JSONSchema = {
    type: 'object',
    properties: {
      country: {
        type: 'string'
      },
      city: {
        type: 'string'
      },
      countries: {
        $enum: [{ text: 'Australia', value: 'AU' }, { text: 'Slovakia', value: 'SK' }]
      },
      cities: {
        $enum: [
          { text: 'Sydney', value: 'SYD', country: 'AU' },
          { text: 'Melbourne', value: 'MEL', country: 'AU' },
          { text: 'Kosice', value: 'KE', country: 'SK' },
          { text: 'Bratislava', value: 'BA', country: 'SK' }
        ]
      }
    }
  };

  const controlData = { country: 'SK', city: 'KE' };

  const formDefinition: FormDefinition = create.form({
    elements: [
      create.formElement({
        row: 0,
        column: 0,
        width: 8,
        list: 'countries',
        control: 'Select',
        label: 'Country',
        source: 'country',
        inline: true
      }),
      create.formElement({
        row: 0,
        column: 8,
        width: 8,
        control: 'Select',
        list: 'cities',
        filterSource: 'country',
        filterColumn: 'country',
        controlProps: {
          search: true
        },
        source: 'city',
        label: 'City'
      })
    ]
  });

  describe('Select', function() {
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

    it('changes value and all related formulas', () => {
      const component = renderer.create(componentWithData());
      const root = component.root;
      const country = root.findByProps({ name: 'country' });
      country.props.onChange(null, { value: 'AU' });

      const city = root.findByProps({ name: 'city' });
      city.props.onChange(null, { value: 'SYD' });

      expect(component).toMatchSnapshot();
      expect(setDirty).toBeCalled();
    });

    return { componentWithData };
  });
});
