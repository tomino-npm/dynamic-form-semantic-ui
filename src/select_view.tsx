import * as React from 'react';

import { observer } from 'mobx-react';
import { Dropdown, DropdownProps, Input, DropdownItemProps } from 'semantic-ui-react';

import { ErrorView } from './error_view';
import { FormControlProps } from './common';
import { EnumOption } from '@tomino/dynamic-form/dist/json_schema';

export class SelectComponent extends React.Component<FormControlProps> {
  state = {
    loading: false
  };
  options: DropdownItemProps[];

  async componentWillMount() {
    const { formControl, owner } = this.props;
    const { list } = formControl;

    if (formControl.handler) {
      if (!this.props.handlers['loadDropdownOptions']) {
        throw new Error('Missing handler: loadDropdownOptions(dropdownName: string)');
      }
      this.options = [];
      this.setState({ loading: true });
      this.options = await this.props.handlers.loadDropdownOptions(formControl.handler);
      this.setState({ loading: false });
    } else {
      const listSource = owner.getSchema(list);
      if (listSource == null) {
        debugger;
      }
      this.options = listSource.$enum;
    }
  }

  handleSelectChange = (_e: any, control: DropdownProps) => {
    // React.ChangeEvent<HTMLInputElement>
    // find value
    // console.log(this.props.owner.getSchema(this.props.formControl.source).validate(''));

    this.props.owner.setValue(this.props.formControl.source, control.value.toString());
  };

  render() {
    const { formControl, owner } = this.props;
    const { source, controlProps, filterSource, filterColumn } = formControl;

    const options = filterSource
      ? this.options.filter((v: any) => v[filterColumn] === owner.getValue(filterSource))
      : this.options;

    if (this.props.readOnly) {
      return (
        <Input
          {...controlProps}
          name={source}
          disabled={true}
          value={
            this.state.loading
              ? ''
              : (options.find(f => f.value === owner.getValue(source)) || ({} as EnumOption)).text
          }
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
          loading={this.state.loading}
          value={(owner.getValue(source) || '').toString()}
          disabled={this.props.readOnly}
          onChange={this.handleSelectChange}
        />

        <ErrorView owner={owner} source={source} />
      </>
    );
  }
}

export const SelectView = observer(SelectComponent);
