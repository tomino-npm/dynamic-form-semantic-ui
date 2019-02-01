import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { create } from './form_query_data';
import { JSONSchema, FormDefinition, FormModel } from '@tomino/dynamic-form';
import { TestComponent } from './common';

describe('Form', () => {
  const schema: JSONSchema = {
    type: 'object',
    properties: {
      approved: {
        type: 'boolean'
      },
      value: {
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
        width: 4,
        control: 'Input',
        source: 'value'
      }),
      create.formElement({
        row: 0,
        column: 4,
        width: 6,
        control: 'ApproveButton',
        source: 'approved'
      }),
      create.formElement({
        row: 0,
        column: 10,
        width: 6,
        control: 'RejectButton',
        source: 'approved'
      })
    ]
  });

  const formData = {
    description: 'Some Description'
  };

  describe('Buttons', () => {
    function componentWithData() {
      const form = new FormModel(formDefinition, schema, formData);

      // just another notation
      return <TestComponent form={form} />;
    }

    it('renders correctly', () => {
      const component = renderer.create(componentWithData());
      expect(component).toMatchSnapshot();
    });

    return { componentWithData };
  });
});
