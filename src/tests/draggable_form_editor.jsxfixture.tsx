import * as React from 'react';

import { FormEditor } from '../editor/form_editor';
import { observable } from 'mobx';

export default (
  <FormEditor
    owner={{ getSchema: () => null as any } as any}
    formControl={observable({ elements: [] })}
    readOnly={false}
  />
);
