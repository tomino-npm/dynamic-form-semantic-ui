import * as React from 'react';
import * as styles from './editor_styles';

import SplitPane from 'react-split-pane';
import { config, FormElement } from '@tomino/dynamic-form';
import { observer } from 'mobx-react';
import { Input, Menu } from 'semantic-ui-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { FormControlProps } from '../common';
import { FormControls } from './form_controls';
import { PropertyPanel } from './property_panel';
import { FormEditorView } from './editor_form_view';

@DragDropContext(HTML5Backend)
@observer
export class FormEditor extends React.Component<FormControlProps> {
  elements: FormElement[];

  // componentWillMount() {
  //   let rowCount = this.props.formControl.elements.reduce(
  //     (prev, next) => (prev <= next.row ? next.row + 1 : prev),
  //     0
  //   );
  //   if (rowCount < minRows) {
  //     rowCount = minRows;
  //   }

  //   // EDITOR Preprocessing
  //   let rows = groupByArray(this.props.formControl.elements, 'row');
  //   let result = [];

  //   for (let i = 0; i < rowCount; i++) {
  //     let row = rows.find(r => r.key === i);
  //     if (!row) {
  //       row = { key: i, values: [] };
  //       rows.push(row);
  //     }
  //     // fill in missing fields
  //     let lastColumn = 15;
  //     for (let rowElementIndex = row.values.length - 1; rowElementIndex >= 0; rowElementIndex--) {
  //       let element = row.values[rowElementIndex];
  //       let index = element.column;
  //       for (let j = 0; j < lastColumn - index; j++) {
  //         row.values.push({
  //           row: i,
  //           column: lastColumn - j,
  //           width: 1,
  //           control: 'EditorCell',
  //           parent: this.props.formControl
  //         });
  //       }
  //       lastColumn = index;
  //     }
  //     // fill from beginning
  //     for (let j = lastColumn - 1; j >= 0; j--) {
  //       row.values.push({
  //         row: i,
  //         column: j,
  //         width: 1,
  //         control: 'EditorCell',
  //         parent: this.props.formControl
  //       });
  //     }

  //     // now sort the row
  //     rows[i].values = rows[i].values.sort((a, b) => (a.column < b.column ? -1 : 1));

  //     // add to the result
  //     result.push(...rows[i].values);
  //   }

  //   this.elements = observable(result);
  // }

  public render() {
    return (
      <SplitPane
        className={styles.editorGrid}
        split="vertical"
        minSize={100}
        defaultSize={parseInt(localStorage.getItem('CORPIX.v-split-1') || '280px', 10)}
        onChange={(size: number) => localStorage.setItem('CORPIX.v-split-1', size.toString())}
      >
        <div className={styles.paneContent}>
          <Menu secondary inverted color="blue">
            <Menu.Item icon="caret down" className={styles.caret} />
            <Menu.Item icon="database" content={config.i18n`Data`} />
            <Menu.Item fitted className={styles.flexed}>
              <Input icon="search" placeholder="Search ..." fluid />
            </Menu.Item>
          </Menu>

          <div>werwer</div>

          <FormControls />
        </div>
        <SplitPane
          primary="second"
          split="vertical"
          minSize={100}
          defaultSize={parseInt(localStorage.getItem('CORPIX.v-split-2') || '280px', 10)}
          onChange={(size: number) => localStorage.setItem('CORPIX.v-split-2', size.toString())}
        >
          <div className={styles.editorPane}>
            <FormEditorView
              readOnly={true}
              owner={this.props.owner}
              formControl={this.props.formControl}
            />
          </div>
          <PropertyPanel />
        </SplitPane>
      </SplitPane>
    );
  }
}
