import { FormDefinition, FormElement } from '@tomino/dynamic-form';

export const defaultForm: FormDefinition = {
  name: 'Form',
  description: 'Test Form',
  elements: []
};

export const defaultFormElement: FormElement = {
  column: 0,
  control: null,
  controlProps: null,
  filterColumn: null,
  filterSource: null,
  inline: false,
  label: null,
  list: null,
  row: 0,
  source: null,
  vertical: null,
  width: null,
  elements: null
};

export const create = {
  form(form: Partial<FormDefinition> = {}): FormDefinition {
    return { ...defaultForm, ...form };
  },
  formElement(form: Partial<FormElement> = {}): FormElement {
    return { ...defaultFormElement, ...form };
  }
};
