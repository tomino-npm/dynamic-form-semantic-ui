import * as React from 'react';

import { observer } from 'mobx-react';
import { Dropdown, DropdownProps, Input } from 'semantic-ui-react';

import { ErrorView } from './error_view';
import { FormControlProps } from './common';
import { EnumOption } from '@tomino/dynamic-form/dist/json_schema';

export class SelectComponent extends React.Component<FormControlProps> {
  handleSelectChange = (_e: any, control: DropdownProps) => {
    // React.ChangeEvent<HTMLInputElement>
    // find value
    // console.log(this.props.owner.getSchema(this.props.formControl.source).validate(''));

    this.props.owner.setValue(this.props.formControl.source, control.value.toString());
  };

  render() {
    const { formControl, owner } = this.props;
    const { source, controlProps, list, filterSource, filterColumn } = formControl;

    const listSource = owner.getSchema(list);
    if (listSource == null) {
      debugger;
    }
    const options = filterSource
      ? listSource.$enum.filter((v: any) => v[filterColumn] === owner.getValue(filterSource))
      : listSource.$enum;

    if (this.props.readOnly) {
      return (
        <Input
          {...controlProps}
          name={source}
          disabled={true}
          value={(options.find(f => f.value === owner.getValue(source)) || ({} as EnumOption)).text}
        />
      );
    }

    return (
      <>
        <Dropdown
          {...controlProps}
          options={options}
          name={source}
          selection={true}
          value={owner.getValue(source)}
          disabled={this.props.readOnly}
          onChange={this.handleSelectChange}
        />

        <ErrorView owner={owner} source={source} />
      </>
    );
  }
}

export const SelectView = observer(SelectComponent);
