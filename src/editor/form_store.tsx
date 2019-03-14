import {
  JSONSchema,
  FormElement,
  buildStore,
  Schema,
  FormDefinition,
  setUndoManager,
  DataSet
} from '@tomino/dynamic-form';
import { unprotect } from 'mobx-state-tree';

export const formSchema: JSONSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    elements: {
      type: 'array',
      items: { $ref: '#/definitions/formElement' }
    }
  },
  definitions: {
    formElement: {
      type: 'object',
      properties: {
        row: { type: 'number' },
        column: { type: 'number' },
        width: { type: 'number' },
        source: { type: 'string' },
        sourceRef: { type: 'string' },
        label: { type: 'string' },
        renderer: { type: 'string' },
        handler: { type: 'string' },
        inline: { type: 'boolean' },
        list: { type: 'string' },
        readOnly: { type: 'boolean' },
        filterSource: { type: 'string' },
        filterColumn: { type: 'string' },
        control: { type: 'string' },
        controlProps: { type: 'object' },
        vertical: { type: 'boolean' },
        elements: { type: 'array', items: { $ref: '#' } },
        url: { type: 'string' }
      }
    }
  }
};

type FormElementType = Partial<DataSet<FormElement>>;
export interface FormDataSet extends FormElementType {
  elements?: FormElementType[];
}

const store = buildStore<FormElement>(formSchema);

export function buildFormEditorDataset(form: FormDefinition) {
  let s = store.create(form as any);
  setUndoManager(s);
  // unprotect(s);

  return s;
}
