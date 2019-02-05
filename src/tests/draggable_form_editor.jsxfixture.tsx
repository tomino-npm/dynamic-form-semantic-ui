import * as React from 'react';

import { FormEditor } from '../editor/form_editor';

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
      control: 'Input'
    },
    {
      row: 1,
      column: 4,
      width: 4,
      control: 'Input'
    }
  ]
};

export default <FormEditor owner={{ getSchema: () => null as any } as any} formControl={element} />;
