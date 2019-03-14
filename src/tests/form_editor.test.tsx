import * as React from 'react';

import { FormEditor } from '../editor/form_editor';
import { baseForm, baseSchema } from './fixtures';
import { buildFormEditorDataset } from '../editor/form_store';
import { buildDataSet } from '@tomino/dynamic-form/dist/mst_builder';
import { FormElement } from '@tomino/dynamic-form';

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
  // let form = new FormModel(formDefinition as any, baseSchema, {}, true);
  let formDefinition = buildFormEditorDataset(baseForm);
  let dataSet = buildDataSet(baseSchema);
  return (
    <FormEditor
      owner={dataSet}
      formControl={formDefinition}
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
