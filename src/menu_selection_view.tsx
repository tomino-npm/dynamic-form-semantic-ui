import * as React from 'react';

import { observer } from 'mobx-react';
import { Menu, Segment } from 'semantic-ui-react';

import { FormControlProps } from './common';
import { EnumOption } from '@tomino/dynamic-form/dist/json_schema';
import { FormView } from './form_view';
import { observable } from 'mobx';
import { DataSet, FormElement } from '@tomino/dynamic-form';
import { vertical } from './menu_projection_view';
import { PropMap } from '@tomino/dynamic-form/dist/form_definition';

export class MenuComponent extends React.Component<FormControlProps> {
  @observable selection: string = '';

  componentWillMount() {
    const { source } = this.props.formControl;
    let values = this.props.owner.getValue(source);
    if (values && values.length) {
      this.selection = `${source}.0`;
    }
  }

  render() {
    const {
      formControl,
      formControl: { source, controlProps, list },
      owner,
      readOnly,
      handlers
    } = this.props;
    const { menuProps, contentProps } = controlProps;

    let menus: EnumOption[];
    let currentOwner: DataSet;
    let currentFormControl: FormElement;

    // 1. if source and list are defined, we will display as many menus as there are fields in the array
    // 2. If only list is defined, we will take values from the enumerator and project into dataset

    if (source && list) {
      let values = owner.getValue(source) || [];
      menus = values.map((v: any) => ({ text: v['title'] || v[list], value: v[list] }));
      // all items share the same form control
      currentFormControl = formControl.elements[0];
    } else {
      throw new Error('You need to provide list source');
    }

    // select owner
    currentOwner = owner.getValue(this.selection);

    return (
      <div className={menuProps && (menuProps as PropMap).vertical ? vertical : 'none'}>
        <Menu {...menuProps}>
          {menus.map((m, i) => (
            <Menu.Item
              icon={m.icon}
              content={m.text}
              key={i}
              onClick={() => (this.selection = source + '.' + i)}
              active={m.value === currentOwner.getValue(list)}
            />
          ))}
        </Menu>

        {menuProps && (menuProps as PropMap).vertical && <div />}

        <Segment {...contentProps}>
          <FormView
            formControl={currentFormControl}
            owner={currentOwner}
            handlers={handlers}
            readOnly={readOnly}
          />
        </Segment>
      </div>
    );
  }
}

export const MenuSelectionView = observer(MenuComponent);
