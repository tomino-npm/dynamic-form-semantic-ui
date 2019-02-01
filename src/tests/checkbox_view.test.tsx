import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { JSONSchema, FormModel, config } from '@tomino/dynamic-form';

import { create } from './form_query_data';
import { TestComponent } from './common';

describe('Form', () => {
  const setDirty = jest.fn();

  beforeAll(() => {
    config.setDirty = () => setDirty();
  });
  describe('Checkbox', () => {
    function componentWithData() {
      const schema: JSONSchema = {
        type: 'object',
        properties: {
          agree: {
            type: 'boolean'
          },
          disagree: {
            type: 'boolean'
          },
          must: {
            type: 'boolean',
            errorMessage: 'You must agree to terms and conditions'
          }
        },
        required: ['must']
      };

      const data = { agree: true, disagree: false };

      const form = new FormModel(
        create.form({
          elements: [
            create.formElement({
              row: 0,
              column: 0,
              width: 8,
              control: 'Checkbox',
              label: 'Agree With Terms and Conditions',
              source: 'agree'
            }),
            create.formElement({
              row: 1,
              column: 0,
              width: 8,
              control: 'Checkbox',
              controlProps: {
                toggle: true
              },
              label: 'Disagree With Terms and Conditions',
              source: 'disagree'
            }),
            create.formElement({
              row: 2,
              column: 0,
              width: 8,
              control: 'Checkbox',
              label: 'Must Agree With Terms and Conditions',
              source: 'must'
            })
          ]
        }),
        schema,
        data
      );

      form.validateWithReport();

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
      const agree = root.findByProps({ name: 'agree' });
      agree.props.onChange(null, { checked: false });

      const disagree = root.findByProps({ name: 'disagree' });
      disagree.props.onChange(null, { checked: true });

      const must = root.findByProps({ name: 'must' });
      must.props.onChange(null, { checked: true });
      expect(component).toMatchSnapshot();
      expect(setDirty).toBeCalled();
    });

    return { componentWithData };
  });
});
