import * as React from 'react';

import { observer } from 'mobx-react';

import { Button } from 'semantic-ui-react';
import { FormElement, DataSet } from '@tomino/dynamic-form';

import { ErrorView } from './error_view';
import { FormView } from './form_view';
import { css, FormControlProps } from './common';

const noItems = css`
  margin: 6px 0px 12px 0px;
`;

type RowProps = {
  formControl: FormElement;
  owner: DataSet;
  data: DataSet;
  handlers: { [index: string]: () => void };
};

class RepeaterRow extends React.PureComponent<RowProps> {
  // handlers = {
  //   delete: () => {
  //     this.props.owner.removeRowData(this.props.formControl.source, this.props.data);
  //   }
  // };
  render() {
    return (
      <FormView
        owner={this.props.data}
        formControl={this.props.formControl}
        handlers={this.props.handlers}
      />
    );
  }
}

export class RepeaterComponent extends React.Component<FormControlProps> {
  handleToggleChange = (_e: React.ChangeEvent<HTMLInputElement>, control: HTMLInputElement) => {
    // find value
    this.props.owner.parseValue(this.props.formControl.source, control.checked);
  };

  addRow = () => {
    const {
      formControl: { source },
      owner
    } = this.props;
    owner.addRow(source);
    // owner.validateValue(source, owner.getValue(source));
  };

  render(): JSX.Element {
    const { formControl, owner } = this.props;
    const source = formControl.source;
    const list: DataSet[] = owner.getValue(source);
    return (
      <>
        {list == null || list.length === 0 ? (
          <div className={noItems}>{`This collection contains no items ...`}</div>
        ) : (
          <>
            {list.map((listItemDataSet: DataSet, i) => (
              <RepeaterRow
                key={i + Date.now()}
                owner={owner}
                formControl={formControl}
                data={listItemDataSet}
                handlers={this.props.handlers}
              />
            ))}
          </>
        )}
        <Button primary icon="plus" content="Add" labelPosition="left" onClick={this.addRow} />
        <ErrorView owner={owner} source={source} pointing="left" />
      </>
    );
  }
}

export const RepeaterView = observer(RepeaterComponent);
