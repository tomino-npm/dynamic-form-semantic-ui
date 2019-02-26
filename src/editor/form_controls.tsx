import * as React from 'react';
import * as styles from './editor_styles';

import { Menu, Input } from 'semantic-ui-react';
import { ToolItem } from './tool_item';
import { config, FormControl } from '@tomino/dynamic-form';
import { SemanticICONS } from 'semantic-ui-react/dist/commonjs/generic';

const standard: Array<{ control: FormControl; title: string; icon: SemanticICONS }> = [
  { control: 'ApproveButton', title: 'Approve Button', icon: 'check' },
  { control: 'Checkbox', title: 'CheckBox', icon: 'check square outline' },
  { control: 'Comment', title: 'Comment', icon: 'comment' },
  { control: 'DeleteButton', title: 'Delete Button', icon: 'trash' },
  { control: 'Form', title: 'Form', icon: 'wpforms' },
  { control: 'Formula', title: 'Formula', icon: 'code' },
  { control: 'Image', title: 'Image', icon: 'image outline' },
  { control: 'Input', title: 'Input', icon: 'square outline' },
  { control: 'Radio', title: 'Radio', icon: 'dot circle outline' },
  { control: 'RejectButton', title: 'Reject Button', icon: 'ban' },
  { control: 'Repeater', title: 'Repeater', icon: 'list' },
  { control: 'Select', title: 'Select', icon: 'dropdown' },
  { control: 'Signature', title: 'Signature', icon: 'edit' },
  { control: 'Table', title: 'Table', icon: 'table' },
  { control: 'Text', title: 'Text', icon: 'font' },
  { control: 'Textarea', title: 'Textarea', icon: 'window maximize outline' },
  { control: 'Value', title: 'Value', icon: 'dollar sign' }
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
        <Menu.Item key={s.control}>
          <ToolItem {...s} />
        </Menu.Item>
      ))}
    </Menu>
  </div>
);

FormControls.displayName = 'FormControls';
