import * as React from 'react';
import * as styles from './editor_styles';

import { Menu, Input } from 'semantic-ui-react';
import { ToolItem } from './tool_item';
import { config } from '@tomino/dynamic-form';

const standard = [
  // 'ApproveButton',
  // 'CheckBox',
  // 'Comment',
  // 'DeleteButton',
  // 'Form',
  // 'Formula',
  // 'Image',
  'Input',
  'Radio'
  // 'RejectButton',
  // 'Repeater',
  //'Select'
  // 'Signature',
  // 'Table',
  // 'Text',
  // 'Textarea',
  // 'Value'
];

export const FormControls = () => (
  <div className={styles.flexibleContent}>
    <Menu secondary inverted color="blue" className={styles.compact}>
      <Menu.Item icon="caret down" className={styles.caret} />
      <Menu.Item icon="puzzle" content={config.i18n`Form`} />
      <Menu.Item fitted className={styles.flexed}>
        <Input icon="search" placeholder="Search ..." fluid />
      </Menu.Item>
    </Menu>

    <Menu text vertical compact fluid className={styles.controlsMenu}>
      <Menu.Item header>Controls</Menu.Item>

      {standard.map(s => (
        <Menu.Item key={s}>
          <ToolItem name={s} />
        </Menu.Item>
      ))}
    </Menu>
  </div>
);

FormControls.displayName = 'FormControls';
