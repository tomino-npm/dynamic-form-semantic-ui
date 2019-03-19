import * as React from 'react';

import * as styles from './editor_styles';

import { Menu, Input, Form } from 'semantic-ui-react';
import { config } from '@tomino/dynamic-form';
import { PropertyPair, stringParse, EditorProperty } from './property_pair';

let schemaOptions: EditorProperty[] = [
  {
    label: config.i18n`Source`,
    parse: stringParse,
    source: 'source',
    type: 'input'
  }
];

export const SchemaEditor = ({ activeElement }: any) => (
  <div className={styles.paneContent}>
    <Menu secondary inverted color="blue">
      <Menu.Item icon="caret down" className={styles.caret} />
      <Menu.Item icon="folder" content={config.i18n`Schema`} />
      <Menu.Item fitted className={styles.flexed}>
        <Input icon="search" placeholder="Search ..." fluid />
      </Menu.Item>
    </Menu>

    {activeElement && (
      <div className={styles.controlsMenu + ' ' + styles.toolBox}>
        <Form className={styles.propertyFields}>
          {schemaOptions.map((o, i) => (
            <PropertyPair key={i} activeElement={activeElement as any} {...o} />
          ))}
        </Form>
      </div>
    )}
  </div>
);
