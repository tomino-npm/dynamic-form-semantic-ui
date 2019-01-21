import * as React from 'react';

import { Form, Icon, SemanticWIDTHSNUMBER } from 'semantic-ui-react';

import { groupByArray } from '@tomino/toolbelt/group-by-array';
import { DataSet, FormElement } from '@tomino/dynamic-form';

import { renderControl } from './form_control_factory';
import { renderCss, css } from './common';

export interface IFieldOwner {
  elements?: FormElement[];
}

interface Props {
  owner: DataSet;
  formControl: IFieldOwner;
  handlers?: { [index: string]: (...props: string[]) => any };
  child?: boolean;
}

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

export class FormView extends React.Component<Props> {
  lastRow = -1;
  lastColumn = -1;

  renderColumn(control: FormElement) {
    if (control.row !== this.lastRow) {
      this.lastRow = control.row;
      this.lastColumn = 0;
    }
    // we initialise all columns and add missing ones in between
    let columns = [];
    const formControl = control;

    if (formControl.control === 'DeleteButton') {
      formControl.label = '\xA0';
    }

    const schema = this.props.owner.getSchema(formControl.source);

    // insert missing start column
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
            {renderControl(control, this.props.owner, this.props.handlers)}
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
            {renderControl(control, this.props.owner, this.props.handlers)}
          </>
        )}
      </Form.Field>
    );

    this.lastColumn = control.column + control.width;
    return columns;
  }

  render() {
    this.lastColumn = 0;
    this.lastRow = 0;

    const rows = groupByArray(this.props.formControl.elements, 'row');
    const css = !this.props.child && <style>{renderCss()}</style>;
    return (
      <>
        {css}
        <div className="ui form">
          {rows.map(row => (
            <Form.Group key={row.key}>
              {row.values.map(element => this.renderColumn(element))}
            </Form.Group>
          ))}
        </div>
      </>
    );
  }
}
