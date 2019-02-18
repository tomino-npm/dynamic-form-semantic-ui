import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { create } from './form_query_data';
import { JSONSchema, FormDefinition, FormModel } from '@tomino/dynamic-form';
import { TestComponent } from './common';
import { clone } from '@tomino/toolbelt';

describe('Menu', () => {
  describe('Projection', () => {
    const formData = {
      description: 'Some Description'
    };

    const schema: JSONSchema = {
      type: 'object',
      properties: {
        menu: {
          type: 'string',
          $enum: [
            { icon: 'user', value: 'person', text: 'Person' },
            { icon: 'car', value: 'car', text: 'Car' }
          ]
        },
        person: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            address: { type: 'string' }
          }
        },
        car: {
          type: 'object',
          properties: {
            brand: { type: 'string' },
            model: { type: 'string' }
          }
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
          control: 'Menu',
          list: 'menu',
          controlProps: {
            menuProps: {
              attached: 'top',
              tabular: true
            },
            contentProps: {
              attached: 'bottom'
            }
          },
          elements: [
            {
              source: 'car',
              control: 'Form',
              elements: [
                {
                  row: 0,
                  column: 0,
                  width: 8,
                  source: 'brand',
                  label: 'Brand',
                  control: 'Input'
                },
                {
                  row: 0,
                  column: 8,
                  width: 8,
                  source: 'model',
                  label: 'Model',
                  control: 'Input'
                }
              ]
            },
            {
              source: 'person',
              control: 'Form',
              elements: [
                {
                  row: 0,
                  column: 0,
                  width: 8,
                  source: 'name',
                  label: 'Name',
                  control: 'Input'
                },
                {
                  row: 0,
                  column: 8,
                  width: 8,
                  source: 'address',
                  label: 'Address',
                  control: 'Input'
                }
              ]
            }
          ]
        })
      ]
    });

    describe('Tabular', () => {
      function component() {
        const form = new FormModel(formDefinition, schema, formData);

        // just another notation
        return <TestComponent form={form} />;
      }

      it('renders', () => {
        const wrapper = renderer.create(component());
        expect(wrapper).toMatchSnapshot();
      });

      return { component };
    });

    describe('Side Menu', () => {
      function component() {
        let modified: FormDefinition = clone(formDefinition);
        let menu = modified.elements[0];
        menu.controlProps = {
          menuProps: {
            vertical: true,
            secondary: true
          },
          contentProps: {
            style: { float: 'left' }
          }
        };

        const form = new FormModel(modified, schema, formData);

        // just another notation
        return <TestComponent form={form} />;
      }

      it('renders', () => {
        const wrapper = renderer.create(component());
        expect(wrapper).toMatchSnapshot();
      });

      return { component };
    });

    describe('Top Menu', () => {
      function component() {
        let modified: FormDefinition = clone(formDefinition);
        let menu = modified.elements[0];
        menu.controlProps = {
          menuProps: {
            secondary: true
          }
        };

        const form = new FormModel(modified, schema, formData);

        // just another notation
        return <TestComponent form={form} />;
      }

      it('renders', () => {
        const wrapper = renderer.create(component());
        expect(wrapper).toMatchSnapshot();
      });

      return { component };
    });
  });
});
