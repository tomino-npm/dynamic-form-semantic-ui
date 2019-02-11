import * as React from 'react';

import { observer } from 'mobx-react';

import { DateInput, TimeInput, DateTimeInput, DatesRangeInput } from 'semantic-ui-calendar-react';

import { FormControlProps } from './common';

export class DateComponent extends React.Component<
  FormControlProps & { type: 'Date' | 'Time' | 'DateTime' | 'DateRange' }
> {
  handleChange = (_e: React.SyntheticEvent<HTMLElement>, { name, value }: any) => {
    // find value
    this.props.owner.setValue(name, value);
  };

  render() {
    const {
      formControl,
      formControl: { source },
      owner,
      type
    } = this.props;

    let Component: any =
      type === 'Date'
        ? DateInput
        : type === 'Time'
        ? TimeInput
        : type === 'DateTime'
        ? DateTimeInput
        : DatesRangeInput;

    return (
      <Component
        iconPosition="left"
        {...formControl.controlProps || {}}
        name={source}
        clearable={true}
        value={owner.getValue(source) || ''}
        onChange={this.handleChange}
      />
    );
  }
}

export const DateView = observer(DateComponent);
