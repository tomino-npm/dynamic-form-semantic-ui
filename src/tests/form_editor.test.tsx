import * as React from 'react';

import { FormEditor } from '../editor/form_editor';
import { JSONSchema, FormModel } from '@tomino/dynamic-form';
import { baseForm, baseSchema } from './fixtures';

const element = {
  elements: [
    {
      row: 0,
      column: 2,
      width: 2,
      control: 'Input',
      label: 'Momo'
    },
    {
      row: 0,
      column: 9,
      width: 2,
      control: 'Input',
      label: '123'
    },
    {
      row: 1,
      column: 4,
      width: 4,
      control: 'Input',
      label: ''
    }
  ]
};

function component() {
  return (
    <FormEditor
      owner={{ getSchema: () => null as any } as any}
      formControl={element as any}
      handlers={{
        loadGlobalDatasets: () => Promise.resolve() as any
      }}
      readOnly={false}
    />
  );
}

describe('Editor', () => {
  it('fails', () => {
    expect(false).toBeFalsy();
  });
  return { component };
});
