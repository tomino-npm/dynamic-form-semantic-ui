import * as React from 'react';

import { Form, Icon, SemanticWIDTHSNUMBER } from 'semantic-ui-react';

import { groupByArray } from '@tomino/toolbelt/group-by-array';
import { FormElement } from '@tomino/dynamic-form';

import { renderControl } from './form_control_factory';
import { renderCss, css, FormControlProps } from './common';
import { observer } from 'mobx-react';
import { editorState } from './editor/editor_state';

export interface IFieldOwner {
  elements?: FormElement[];
}

type Props = FormControlProps & {
  child?: boolean;
  renderCss?: boolean;
};

export const fieldSet = css`
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

export const formStyle = css`
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

const selected = css`
  background-color: pink;
  overflow: hidden;
`;

type State = {
  rows: number;
};

// const sortRow = (a: FormElement, b: FormElement) => (a.column < b.column ? -1 : 1);

@observer
export class FormView extends React.Component<Props, State> {
  lastRow = -1;
  lastColumn = -1;

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
      this.props.readOnly
    );

    columns.push(
      <Form.Field
        className={editorState.selectedElement === formControl ? selected : ''}
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
            {renderedControl}
          </fieldset>
        ) : (
          <>
            {formControl.label &&
              formControl.control.indexOf('Button') === -1 &&
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

  render() {
    this.lastColumn = 0;
    this.lastRow = 0;

    let rows = groupByArray(this.props.formControl.elements, 'row');
    const css = this.props.renderCss && <style>{renderCss()}</style>;

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
        </div>
      </>
    );
  }
}
