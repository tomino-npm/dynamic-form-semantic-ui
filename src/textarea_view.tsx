import * as React from 'react';

import { observer } from 'mobx-react';
import { TextArea, LabelProps } from 'semantic-ui-react';

import { FormControlProps } from './common';
import { ErrorView } from './error_view';

export class TextAreaComponent extends React.Component<FormControlProps> {
  static displayName = 'TextAreaView';

  handleInputChange = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    // find value
    this.props.owner.setValue(this.props.formControl.source, e.currentTarget.value);
  };

  render() {
    const { formControl, owner } = this.props;
    const { source, controlProps } = formControl;
    const value = owner.getValue(source);

    const label: LabelProps =
      owner.isRequired(source) && !value ? { label: { icon: 'asterisk', color: 'red' } } : {};

    return (
      <React.Fragment>
        <TextArea
          {...controlProps}
          placeholder={controlProps && controlProps.placeholder}
          name={source}
          {...label}
          disabled={this.props.readOnly || owner.getSchema(source).readOnly}
          error={owner.getError(source) || ''}
          value={value}
          onChange={this.handleInputChange}
        />

        <ErrorView owner={owner} source={source} />
      </React.Fragment>
    );
  }
}

export const TextAreaView = observer(TextAreaComponent);
