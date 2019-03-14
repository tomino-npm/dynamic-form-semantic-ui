import * as React from 'react';
import * as styles from './editor_styles';

import {
  Menu,
  Input,
  DropdownProps,
  DropdownItemProps,
  Dropdown,
  Divider
} from 'semantic-ui-react';
import { config, DataSet } from '@tomino/dynamic-form';

export type Props = {
  context: {
    dataset: DataSet;
  };
  handlers: any;
};

const GlobalHandlers: React.FC<Props> = ({ context, handlers }) => {
  const [loaded, setLoaded] = React.useState(false);
  const [options, setOptions] = React.useState([]);

  if (!loaded) {
    handlers.loadGlobalDatasets().then((result: DropdownItemProps[]) => {
      setOptions(result || []);
      setLoaded(true);
    });
  }

  let schema = context.dataset.getSchema();
  let values = [];
  for (let key of Object.getOwnPropertyNames(schema.properties)) {
    let s = schema.properties[key];
    if (s.$import) {
      values.push(s.$import);
    }
  }

  return (
    <Menu text vertical fluid>
      <Menu.Item header content={config.i18n`Shared Data`} />
      <Menu.Item>ererer</Menu.Item>
      <Divider />
      <Menu.Item header content={config.i18n`Process Data`} />
      <Menu.Item>ererer</Menu.Item>
      <Divider />
      <Menu.Item header content={config.i18n`Custom Types`} />
      <Menu.Item>ererer</Menu.Item>
    </Menu>
  );
};

export const DatasetEditor: React.FC<Props> = ({ context, handlers }) => {
  if (!handlers || !handlers.loadGlobalDatasets) {
    throw new Error('Please specify "loadGlobalDatasets(): DropdownOption" handler');
  }

  return (
    <>
      <Menu secondary inverted color="blue" className={styles.marginLess}>
        <Menu.Item icon="caret down" className={styles.caret} />
        <Menu.Item icon="database" content={config.i18n`Data`} />
        <Menu.Item fitted className={styles.flexed}>
          <Input icon="search" placeholder="Search ..." fluid />
        </Menu.Item>
      </Menu>

      <GlobalHandlers context={context} handlers={handlers} />
    </>
  );
};
