import * as React from 'react';

import { observer } from 'mobx-react';
import { Menu, Segment } from 'semantic-ui-react';

import { FormControlProps, css } from './common';
import { EnumOption } from '@tomino/dynamic-form/dist/json_schema';
import { FormView } from './form_view';
import { observable } from 'mobx';
import { DataSet, FormElement } from '@tomino/dynamic-form';

export class MenuComponent extends React.Component<FormControlProps> {
  @observable selection: string = '';

  handleToggleChange: any = (
    _e: React.ChangeEvent<HTMLInputElement>,
    control: HTMLInputElement
  ) => {
    // find value
    this.props.owner.setValue(this.props.formControl.source, control.value);
  };

  componentWillMount() {
    const { source, list } = this.props.formControl;
    if (source && list) {
      let values = this.props.owner.getValue(source);
      if (values && values.length) {
        this.selection = values[0][list];
      }
    } else if (list) {
      this.selection = this.props.owner.getSchema(list).$enum[0].value;
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
    } else if (list) {
      menus = owner.getSchema(list).$enum;
      // each menu item holds reference to a different form control
      currentFormControl = formControl.elements.find(c => c.source === this.selection);
    } else {
      throw new Error('You need to provide list source');
    }

    // select owner
    currentOwner = owner.getValue(this.selection);

    return (
      <>
        <Menu {...menuProps}>
          {menus.map((m, i) => (
            <Menu.Item
              icon={m.icon}
              content={m.text}
              key={i}
              onClick={() => (this.selection = m.value)}
              active={m.value === this.selection}
            />
          ))}
        </Menu>

        <Segment {...contentProps}>
          <FormView
            formControl={currentFormControl}
            owner={currentOwner}
            handlers={handlers}
            readOnly={readOnly}
          />
        </Segment>
      </>
    );
  }
}

export const MenuView = observer(MenuComponent);
