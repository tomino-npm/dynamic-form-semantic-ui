import * as React from 'react';

import { Form, SemanticWIDTHSNUMBER, Button } from 'semantic-ui-react';

import { groupByArray } from '@tomino/toolbelt/group-by-array';
import { FormElement, DataSet, FormControl } from '@tomino/dynamic-form';
import { observable, isObservable } from 'mobx';

import { css, FormControlProps } from '../common';
import { Group } from '@tomino/toolbelt/common';
import { observer } from 'mobx-react';
import { editorState } from '../editor/editor_state';
import { renderEditControl } from './editor_form_control_factory';
import { DropCell } from './editor_cell';
import { fieldSet, formStyle } from '../form_view';
import { dragElement } from './drag_drop_boundary';

export interface IFieldOwner {
  elements?: FormElement[];
}

const sortRow = (a: FormElement, b: FormElement) => (a.column < b.column ? -1 : 1);

const selected = css`
  /* name:selected */
  &.field > .cellContent {
    outline: dotted 3px #919191;
    outline-offset: -1px;
  }
`;

const borderHandler = css`
  width: 5px;
  height: 100%;
  flex: 1 5px;
  cursor: ew-resize;
`;
const cellContent = css`
  flex: 1 100%;
`;

type Props = FormControlProps & {
  child?: boolean;
  disableAdd?: boolean;
};

type State = {
  rows: number;
};

@observer
export class FormEditorView extends React.Component<Props, State> {
  state = {
    rows: this.props.formControl.elements.reduce(
      (prev, next) => (prev <= next.row ? next.row + 1 : prev),
      0
    )
  };

  control: FormElement = null;

  componentWillMount() {
    if (!isObservable(this.props.formControl.elements)) {
      this.props.formControl.elements = observable(this.props.formControl.elements);
    }
    if (this.state.rows === 0) {
      this.setState({ rows: 1 });
    }
  }

  renderColumn(formControl: FormElement, parent: FormElement, dataset: DataSet) {
    let columns = [];

    let renderedControl = renderEditControl(formControl, dataset);
    formControl.parent = parent;

    columns.push(
      <Form.Field
        className={editorState.selectedElement === formControl ? selected : ''}
        key={formControl.column}
        width={formControl.inline ? undefined : (formControl.width as SemanticWIDTHSNUMBER)}
        inline={formControl.inline}
      >
        <DropCell formControl={formControl} owner={this.props.owner} parentFormControl={parent}>
          <>
            {formControl.control !== 'EditorCell' && (
              <div
                className={borderHandler + ' handle'}
                draggable={true}
                onDragStart={ev => dragElement(ev, formControl, 'left')}
                data-row={formControl.row}
                data-column={formControl.column}
              />
            )}
            <div
              className={cellContent}
              style={formControl.control === 'Select' ? undefined : { overflow: 'hidden' }}
            >
              {formControl.elements && formControl.elements.length && formControl.label ? (
                <fieldset className={fieldSet}>
                  {formControl.label && <legend>{formControl.label}</legend>}
                  {renderedControl}
                </fieldset>
              ) : (
                <>
                  {formControl.label &&
                    formControl.control !== 'Image' &&
                    formControl.control !== 'Text' &&
                    formControl.control !== 'Signature' &&
                    formControl.control !== 'Checkbox' &&
                    formControl.control !== 'Radio' && (
                      <label htmlFor={(formControl.source && formControl.source) || undefined}>
                        {formControl.label}
                      </label>
                    )}
                  {renderedControl}
                </>
              )}
            </div>
            {formControl.control !== 'EditorCell' && (
              <div
                className={borderHandler + ' handle'}
                draggable={true}
                onDragStart={ev => dragElement(ev, formControl, 'right')}
                data-row={formControl.row}
                data-column={formControl.column}
              />
            )}
          </>
        </DropCell>
      </Form.Field>
    );

    return columns;
  }

  prepareEditor(rows: Group<FormElement>[]) {
    // EDITOR Preprocessing
    rows.sort((a, b) => (a.key < b.key ? -1 : 1));

    for (let i = 0; i < this.state.rows; i++) {
      let row = rows.find(r => r.key === i);
      if (!row) {
        row = { key: i, values: [] };
        rows.splice(i, 0, row);
      }

      // sort this row
      row.values.sort(sortRow);

      // fill in missing fields
      let lastColumn = 15;
      for (let rowElementIndex = row.values.length - 1; rowElementIndex >= 0; rowElementIndex--) {
        let element = row.values[rowElementIndex];

        let index = element.column;
        for (let j = 0; j < lastColumn - (element.column + element.width - 1); j++) {
          row.values.push({
            row: i,
            column: lastColumn - j,
            width: 1,
            control: 'EditorCell'
          });
        }
        lastColumn = index - 1;
      }
      // fill from beginning
      for (let j = lastColumn; j >= 0; j--) {
        row.values.push({
          row: i,
          column: j,
          width: 1,
          control: 'EditorCell'
        });
      }

      // now sort the row
      rows[i].values = rows[i].values.sort(sortRow);
    }

    // initiate grid
    for (let i = 0; i < rows.length; i++) {
      let row: any = {};
      for (let j = 0; j < 16; j++) {
        row[j] = 0;
      }
      editorState.grid[i] = observable(row);
    }
  }

  render() {
    let rows = groupByArray(this.props.formControl.elements, 'row');

    this.prepareEditor(rows);
    return (
      <>
        <div className={'ui form ' + (this.props.readOnly ? formStyle : '')} id="editorForm">
          {rows.map(row => (
            <Form.Group key={row.key}>
              {row.values.map(element =>
                this.renderColumn(element, this.props.formControl, this.props.owner)
              )}
            </Form.Group>
          ))}

          {!this.props.disableAdd && (
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
