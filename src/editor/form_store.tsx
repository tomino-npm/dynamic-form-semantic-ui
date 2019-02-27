import { JSONSchema } from '@tomino/dynamic-form';
import { types } from 'mobx-state-tree';

const formElement: JSONSchema = {
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
    parent: { type: 'object' },
    list: { type: 'string' },
    readOnly: { type: 'boolean' },
    filterSource: { type: 'string' },
    filterColumn: { type: 'string' },
    control: { type: 'string' },
    controlProps: {
      type: 'object'
    },
    vertical: { type: 'boolean' },
    elements: { type: 'array', items: { type: 'object', default: '__self' } },
    url: { type: 'string' }
  }
};

const form: JSONSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    elements: {
      type: 'array',
      items: formElement
    }
  }
};

const N = types.model();

const M = types.model({
  n: N,
  recursive: types.late(() => M)
});
