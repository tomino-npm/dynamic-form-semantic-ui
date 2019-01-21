import * as React from 'react';

import { observer } from 'mobx-react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { FormElement, DataSet } from '@tomino/dynamic-form';

import { ErrorView } from './error_view';

type Props = {
  formControl: FormElement;
  owner: DataSet;
};

export class SelectComponent extends React.Component<Props> {
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

    return (
      <>
        <Dropdown
          {...controlProps}
          options={
            filterSource
              ? listSource.enum.filter((v: any) => v[filterColumn] === owner.getValue(filterSource))
              : listSource.enum
          }
          name={source}
          selection={true}
          value={owner.getValue(source)}
          onChange={this.handleSelectChange}
        />

        <ErrorView owner={owner} source={source} />
      </>
    );
  }
}

export const SelectView = observer(SelectComponent);
