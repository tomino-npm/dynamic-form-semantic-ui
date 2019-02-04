import * as React from 'react';

import { Form, Icon, SemanticWIDTHSNUMBER, Button } from 'semantic-ui-react';

import { groupByArray } from '@tomino/toolbelt/group-by-array';
import { FormElement } from '@tomino/dynamic-form';

import { renderControl } from './form_control_factory';
import { renderCss, css, FormControlProps } from './common';
import { Group } from '@tomino/toolbelt/common';

export interface IFieldOwner {
  elements?: FormElement[];
}

type Props = FormControlProps & {
  child?: boolean;
  fieldWrapper?: React.FC;
  emptyField?: React.FC;
  editMode?: boolean;
};

const fieldSet = css`
  .fieldSet {
    border: solid 1px #ddd;
    border-radius: 5px;
    background-color: #fafafa;
  }

  .fieldSet legend {
    padding: 0px 6px;
    font-weight: bold;
  }
`;

const formStyle = css`
  .form .disabled,
  .form :disabled {
    opacity: 1 !important;
    cursor: auto;
  }

  .form label {
    cursor: auto !important;
  }

  .form label:before {
    border: solid 1px #d4d4d5 !important;
  }
`;

type State = {
  rows: number;
};

export class FormView extends React.Component<Props, State> {
  lastRow = -1;
  lastColumn = -1;

  state = {
    rows: this.props.editMode ? 1 : 0
  };

  renderColumn(control: FormElement) {
    let columns = [];
    const formControl = control;

    if (control.row !== this.lastRow) {
      this.lastRow = control.row;
      this.lastColumn = 0;
    }
    // we initialise all columns and add missing ones in between

    if (formControl.control === 'DeleteButton') {
      formControl.label = '\xA0';
    }

    const schema = this.props.owner.getSchema(formControl.source);

    // insert missing start column
    // EDITOR is using empty column
    if (control.column > this.lastColumn) {
      columns.push(
        <Form.Field
          key={this.lastColumn}
          width={(control.column - this.lastColumn) as SemanticWIDTHSNUMBER}
        >
          &nbsp;
        </Form.Field>
      );
    }

    let renderedControl = renderControl(
      control,
      this.props.owner,
      this.props.handlers,
      this.props.readOnly,
      this.props.fieldWrapper,
      this.props.emptyField,
      this.props.editMode
    );
    if (this.props.editMode) {
      renderedControl = (
        <this.props.emptyField
          owner={this.props.owner}
          parentFormControl={this.props.formControl}
          formControl={control}
        >
          {renderedControl}
        </this.props.emptyField>
      );
    }

    columns.push(
      <Form.Field
        key={control.column}
        width={formControl.inline ? undefined : (control.width as SemanticWIDTHSNUMBER)}
        inline={formControl.inline}
      >
        {formControl.elements && formControl.elements.length && formControl.label ? (
          <fieldset className={fieldSet}>
            {formControl.label && (
              <legend>
                {formControl.label}
                &nbsp;
                {schema.minItems > 0 && <Icon color="red" size="small" name="asterisk" />}
              </legend>
            )}
            {this.props.fieldWrapper ? (
              <this.props.fieldWrapper>{renderedControl}</this.props.fieldWrapper>
            ) : (
              renderedControl
            )}
          </fieldset>
        ) : (
          <>
            {formControl.label &&
              formControl.control !== 'Image' &&
              formControl.control !== 'Text' &&
              formControl.control !== 'Signature' &&
              formControl.control !== 'Checkbox' &&
              formControl.label !== 'Radio' && (
                <label htmlFor={(formControl.source && formControl.source) || undefined}>
                  {formControl.label}
                </label>
              )}
            {renderedControl}
          </>
        )}
      </Form.Field>
    );

    this.lastColumn = control.column + control.width;
    return columns;
  }

  prepareEditor(rows: Group<FormElement>[]) {
    // EDITOR Preprocessing

    for (let i = 0; i < this.state.rows; i++) {
      let stringKey = i.toString();
      let row = rows.find(r => r.key === stringKey);
      if (!row) {
        row = { key: stringKey, values: [] };
        rows.push(row);
      }
      // fill in missing fields
      let lastColumn = 15;
      for (let rowElementIndex = row.values.length - 1; rowElementIndex >= 0; rowElementIndex--) {
        let element = row.values[rowElementIndex];
        let index = element.column;
        for (let j = 0; j < lastColumn - index; j++) {
          row.values.push({
            row: i,
            column: j,
            width: 1,
            control: 'EditorCell',
            parent: this.props.formControl
          });
        }
        lastColumn = index;
      }
      // fill from beginning
      for (let j = lastColumn - 1; j >= 0; j--) {
        row.values.push({
          row: i,
          column: j,
          width: 1,
          control: 'EditorCell',
          parent: this.props.formControl
        });
      }

      // now sort the row
      rows[i].values = rows[i].values.sort((a, b) => (a.column < b.column ? -1 : 1));
    }
  }

  render() {
    this.lastColumn = 0;
    this.lastRow = 0;

    let rows = groupByArray(this.props.formControl.elements, 'row');
    const css = !this.props.child && <style>{renderCss()}</style>;

    if (this.props.editMode) {
      this.prepareEditor(rows);
    }

    return (
      <>
        {css}
        <div className={'ui form ' + (this.props.readOnly ? formStyle : '')}>
          {rows.map(row => (
            <Form.Group key={row.key}>
              {(this.props.readOnly
                ? row.values.filter(r => r.control.indexOf('Button') === -1) // in readonly mode we do not render any buttons
                : row.values
              ).map(element => this.renderColumn(element))}
            </Form.Group>
          ))}
          {this.props.editMode && (
            <Button
              primary
              content="Add Row"
              onClick={() => this.setState({ rows: this.state.rows + 1 })}
            />
          )}
        </div>
      </>
    );
  }
}
