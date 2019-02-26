import * as React from 'react';

import { observer } from 'mobx-react';

import { FormControlProps, css } from './common';

const formula = css`
  padding: 9px 0px;
`;

export class FormulaComponent extends React.Component<FormControlProps> {
  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // find value
    this.props.owner.setValue(this.props.formControl.source, e.target.value);
  };

  render() {
    const {
      formControl: { source },
      owner
    } = this.props;

    const value = source ? owner.getValue(source) : undefined;

    return (
      <div className="ui input">
        <div className={formula}>{value == null ? '#Formula' : value}</div>
      </div>
    );
  }
}

export const FormulaView = observer(FormulaComponent);
