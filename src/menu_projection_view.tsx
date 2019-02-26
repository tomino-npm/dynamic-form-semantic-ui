import * as React from 'react';

import { observer } from 'mobx-react';
import { Menu, Segment } from 'semantic-ui-react';

import { FormControlProps, css } from './common';
import { EnumOption } from '@tomino/dynamic-form/dist/json_schema';
import { FormView } from './form_view';
import { observable } from 'mobx';
import { DataSet, FormElement } from '@tomino/dynamic-form';

export const vertical = css`
  /* name:vertical */
  display: flex;

  div:nth-child(1) {
    flex: 1 auto;
  }

  div:nth-child(2) {
    flex: 1 16px;
  }

  div:nth-child(3) {
    flex: 1 100%;
    margin-top: 0px;
  }
`;

export class MenuComponent extends React.Component<FormControlProps> {
  @observable selection: string = '';

  componentWillMount() {
    const { list } = this.props.formControl;
    this.selection = this.props.owner.getSchema(list).$enum[0].value;
  }

  render() {
    const {
      formControl,
      formControl: { controlProps, list },
      owner,
      readOnly,
      handlers
    } = this.props;
    const { menuProps, contentProps } = controlProps;

    let menus: EnumOption[];
    let currentOwner: DataSet;
    let currentFormControl: FormElement;

    if (list) {
      menus = owner.getSchema(list).$enum;
      // each menu item holds reference to a different form control
      currentFormControl = formControl.elements.find(c => c.source === this.selection);
    } else {
      throw new Error('You need to provide list source');
    }

    // select owner
    currentOwner = owner.getValue(this.selection);

    return (
      <div className={menuProps && menuProps.vertical && vertical}>
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

        {menuProps && menuProps.vertical && <div />}

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

export const MenuProjectionView = observer(MenuComponent);
