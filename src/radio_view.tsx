import * as React from 'react';

import { observer } from 'mobx-react';
import { Radio } from 'semantic-ui-react';

import { FormControlProps, css } from './common';

const formRadio = css`
  margin-right: 12px;
  margin-bottom: 6px;
`;

export class RadioComponent extends React.Component<FormControlProps> {
  handleToggleChange: any = (
    _e: React.ChangeEvent<HTMLInputElement>,
    control: HTMLInputElement
  ) => {
    // find value
    this.props.owner.setValue(this.props.formControl.source, control.value);
  };

  render() {
    const {
      formControl: { source, controlProps, list, vertical },
      owner
    } = this.props;
    const radioValues = owner.getSchema(list).enum;

    return (
      <>
        {radioValues.map(item => (
          <React.Fragment key={item.value}>
            <Radio
              {...controlProps}
              className={formRadio}
              name={source}
              label={item.text}
              readOnly={this.props.readOnly}
              value={item.value}
              checked={owner.getValue(source) === item.value}
              onChange={this.handleToggleChange}
            />
            {vertical && <br />}
          </React.Fragment>
        ))}
      </>
    );
  }
}

export const RadioView = observer(RadioComponent);
