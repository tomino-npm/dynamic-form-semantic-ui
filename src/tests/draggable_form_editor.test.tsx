import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { FormEditor } from '../editor/form_editor';
import { observable } from 'mobx';

describe('Draggable Form Editor', () => {
  function componentWithData() {
    return (
      <FormEditor
        owner={{ getSchema: () => null as any } as any}
        formControl={observable({ elements: [] })}
        readOnly={false}
      />
    );
  }

  it('renders correctly', () => {
    const component = renderer.create(componentWithData());
    expect(component).toMatchSnapshot();
  });

  return { componentWithData };
});
