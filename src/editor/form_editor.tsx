import * as React from 'react';
import * as styles from './editor_styles';

import { FormElement } from '@tomino/dynamic-form';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { FormControlProps } from '../common';
import { FormControls } from './form_controls';
import { PropertyPanel } from './property_panel';
import { FormEditorView } from './editor_form_view';
import { DatasetEditor } from './dataset_editor';
import { TopMenu } from './editor_top.menu';
import { SchemaEditor } from './schema_panel';

const SplitPane = require('react-split-pane');

type Props = {
  showTopMenu: boolean;
};

@DragDropContext(HTML5Backend)
export class FormEditor extends React.Component<FormControlProps & Props> {
  elements: FormElement[];

  public render() {
    // let formModel = new FormModel(baseForm, baseSchema, {});

    return (
      <>
        {this.props.showTopMenu && <TopMenu />}
        <SplitPane
          className={styles.editorGrid(this.props.showTopMenu)}
          split="vertical"
          minSize={100}
          defaultSize={parseInt(localStorage.getItem('CORPIX.v-split-1') || '280px', 10)}
          onChange={(size: number) => localStorage.setItem('CORPIX.v-split-1', size.toString())}
        >
          <div className={styles.paneContent}>
            <SplitPane
              className={styles.editorGrid(this.props.showTopMenu)}
              split="horizontal"
              minSize={100}
              defaultSize={parseInt(localStorage.getItem('CORPIX.h-split-tools') || '280px', 10)}
              onChange={(size: number) =>
                localStorage.setItem('CORPIX.h-split-tools', size.toString())
              }
            >
              <DatasetEditor
                context={{ dataset: this.props.owner }}
                handlers={this.props.handlers}
              />
              <FormControls />
            </SplitPane>
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
            <SplitPane
              className={styles.editorGrid(this.props.showTopMenu)}
              split="horizontal"
              minSize={100}
              defaultSize={parseInt(
                localStorage.getItem('CORPIX.h-split-properties') || '280px',
                10
              )}
              onChange={(size: number) =>
                localStorage.setItem('CORPIX.h-split-tproperties', size.toString())
              }
            >
              <PropertyPanel />
              <SchemaEditor />
            </SplitPane>
          </SplitPane>
        </SplitPane>
      </>
    );
  }
}
