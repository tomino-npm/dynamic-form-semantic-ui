import * as React from 'react';

import { observer } from 'mobx-react';
import { Checkbox, CheckboxProps, Form } from 'semantic-ui-react';

import { ErrorView } from './error_view';
import { FormControlProps } from './common';

export class CheckboxComponent extends React.Component<FormControlProps> {
  handleToggleChange = (_e: any, control: CheckboxProps) => {
    // find value
    this.props.owner.setValue(this.props.formControl.source, control.checked ? true : undefined);
  };

  render() {
    const {
      formControl: { source, controlProps, label },
      owner
    } = this.props;

    return (
      <Form.Field>
        <Checkbox
          {...controlProps}
          name={source}
          label={label}
          readOnly={this.props.readOnly}
          checked={!!owner.getValue(source)}
          onChange={this.handleToggleChange}
        />
        <ErrorView owner={owner} source={source} newLine={true} />
      </Form.Field>
    );
  }
}

export const CheckboxView = observer(CheckboxComponent);
