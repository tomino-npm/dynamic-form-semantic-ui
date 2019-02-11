import * as React from 'react';

import { observer } from 'mobx-react';
import { Form, Input, InputProps, LabelProps } from 'semantic-ui-react';
import { DataSet } from '@tomino/dynamic-form';

import { FormControlProps } from './common';
import { ErrorLabel, ErrorView } from './error_view';

export class InputComponent extends React.Component<FormControlProps> {
  static displayName = 'InputView';

  handleInputChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    // find value
    this.props.owner.setValue(this.props.formControl.source, e.currentTarget.value);
  };

  render() {
    const { formControl, owner } = this.props;
    const { source, controlProps } = formControl;
    const value = owner.getValue(source);

    const label: LabelProps =
      owner.isRequired(source) && !value
        ? { label: { icon: 'asterisk', color: 'red' }, labelPosition: 'right corner' }
        : {};

    return (
      <React.Fragment>
        <Input
          {...controlProps}
          name={source}
          {...label}
          disabled={this.props.readOnly || owner.getSchema(source).readOnly}
          error={!!owner.getError(source)}
          value={value || ''}
          onChange={this.handleInputChange}
        />

        <ErrorView inline={formControl.inline} owner={owner} source={source} />
      </React.Fragment>
    );
  }
}

export const InputView = observer(InputComponent);

interface InputBoundProps {
  name: string;
  owner: DataSet;
  label: string;
}

export class FormComponent extends React.Component<InputBoundProps & InputProps> {
  handleInputChange: React.ReactEventHandler<HTMLInputElement> = e => {
    // find value
    this.props.owner.setValue(this.props.name, e.currentTarget.value);
  };

  render() {
    const { owner, name, label, ...rest } = this.props;

    return (
      <Form.Field>
        <label>{label}</label>
        <Input
          {...rest}
          name={name}
          error={!!owner.getError(name)}
          value={owner.getValue(name)}
          onChange={this.handleInputChange}
          disabled={this.props.readOnly}
        />

        <ErrorLabel error={owner.getError(name)} />
      </Form.Field>
    );
  }
}

export const FormInput = observer(FormComponent);
