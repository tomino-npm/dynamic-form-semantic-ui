import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { create } from './form_query_data';
import { JSONSchema, FormDefinition, FormModel } from '@tomino/dynamic-form';
import { TestComponent } from './common';
import { clone } from '@tomino/toolbelt';

describe('Menu', () => {
  describe('Selection', () => {
    const formData = {
      description: 'Some Description',
      people: [
        {
          name: 'Tomas Trescak',
          address: 'Sydney, Slovakia'
        },
        {
          name: 'Valeria Toscani',
          address: 'Sydney, Italy'
        },
        {
          name: 'Vittoria Trescakova',
          address: 'Sydney, Australia',
          title: 'Princess'
        }
      ]
    };

    const schema: JSONSchema = {
      type: 'object',
      properties: {
        people: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              address: { type: 'string' },
              title: { type: 'string' }
            }
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
          source: 'people',
          list: 'name',
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

      it('renders tab menu', () => {
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

      it('renders tab menu', () => {
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

      it('renders tab menu', () => {
        const wrapper = renderer.create(component());
        expect(wrapper).toMatchSnapshot();
      });

      return { component };
    });
  });
});
