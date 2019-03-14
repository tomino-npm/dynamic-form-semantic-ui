import * as React from 'react';
import { Menu, Divider } from 'semantic-ui-react';

import { undoManager } from '@tomino/dynamic-form';

export const TopMenu = () => (
  <Menu fixed="top" inverted color="blue">
    <Menu.Item icon="lightbulb outline" content="Formix" />
    <Menu.Item icon="save" />
    <Divider />
    <Menu.Item icon="undo" onClick={undoManager.undo} />
    <Menu.Item icon="redo" onClick={undoManager.redo} />
  </Menu>
);
