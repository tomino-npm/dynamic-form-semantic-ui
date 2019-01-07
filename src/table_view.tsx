import * as React from 'react';

import { observer } from 'mobx-react';
import { Button, Form } from 'semantic-ui-react';
import { FormElement, DataSet } from '@tomino/dynamic-form';

import { ErrorView } from './error_view';
import { css } from './common';
import { renderControl } from './form_control_factory';

const formGroup = css`
  margin-bottom: 0px !important;
`;

type RowProps = {
  formControl: FormElement;
  owner: DataSet;
  data: DataSet;
  handlers: { [index: string]: () => void };
  index: number;
};

class TableRow extends React.PureComponent<RowProps> {
  handlers = {
    delete: (_e: any, { value }: any) => {
      this.props.data.removeRowIndex(this.props.formControl.source, value);
    }
  };
  render() {
    return (
      <Form.Group>
        {this.props.formControl.elements.map((e, i) => (
          <Form.Field width={e.width as any} key={i}>
            {renderControl(e, this.props.owner, this.props.handlers)}
          </Form.Field>
        ))}
        <Form.Field width={1}>
          <Button
            color="red"
            icon="trash"
            value={this.props.index}
            onClick={this.handlers.delete}
          />
        </Form.Field>
      </Form.Group>
    );
  }
}

type Props = {
  formControl: FormElement;
  owner: DataSet;
  handlers: { [index: string]: () => void };
};

export class TableComponent extends React.Component<Props> {
  addRow = () => {
    const {
      formControl: { source },
      owner
    } = this.props;
    owner.addRow(source);
  };

  render() {
    const owner = this.props.owner;
    const formControl = this.props.formControl as FormElement;
    const source = formControl.source;
    const list: DataSet[] = owner.getValue(source);

    return (
      <div className="ui form">
        {list && list.length && (
          <Form.Group className={formGroup}>
            {formControl.elements.map((e, i) => (
              <Form.Field key={i} label={e.label} width={e.width as any} />
            ))}
          </Form.Group>
        )}
        {list.map((row, i) => (
          <TableRow
            key={i}
            index={i}
            formControl={formControl}
            owner={row}
            data={owner}
            handlers={this.props.handlers}
          />
        ))}

        <Button primary icon="plus" content="Add" labelPosition="left" onClick={this.addRow} />
        <ErrorView
          owner={this.props.owner}
          source={this.props.formControl.source}
          pointing="left"
        />
      </div>
    );
  }
}

export const TableView = observer(TableComponent);
