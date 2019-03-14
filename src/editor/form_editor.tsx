import * as React from 'react';
import * as styles from './editor_styles';

import { FormElement, FormModel } from '@tomino/dynamic-form';
import { observer } from 'mobx-react';
import { Menu } from 'semantic-ui-react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { FormControlProps } from '../common';
import { FormControls } from './form_controls';
import { PropertyPanel } from './property_panel';
import { FormEditorView } from './editor_form_view';
import { DatasetEditor } from './dataset_editor';
import { TopMenu } from './editor_top.menu';

const SplitPane = require('react-split-pane');

@DragDropContext(HTML5Backend)
export class FormEditor extends React.Component<FormControlProps> {
  elements: FormElement[];

  public render() {
    // let formModel = new FormModel(baseForm, baseSchema, {});

    return (
      <>
        <TopMenu />
        <SplitPane
          className={styles.editorGrid}
          split="vertical"
          minSize={100}
          defaultSize={parseInt(localStorage.getItem('CORPIX.v-split-1') || '280px', 10)}
          onChange={(size: number) => localStorage.setItem('CORPIX.v-split-1', size.toString())}
        >
          <div className={styles.paneContent}>
            <DatasetEditor context={{ dataset: this.props.owner }} handlers={this.props.handlers} />

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
      </>
    );
  }
}
