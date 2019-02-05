import * as React from 'react';

import * as styles from './editor_styles';

import { observer } from 'mobx-react';
import { Menu, Input, Form } from 'semantic-ui-react';
import { config, FormElement, FormControl } from '@tomino/dynamic-form';
import { editorState } from './editor_state';

const intParse = (value: string) => parseInt(value, 10);
const stringParse = (value: string) => value;
const floatParse = (value: string) => parseFloat(value);

type EditorProperty = {
  label: string;
  type: 'input' | 'number' | 'checkbox' | 'radio' | 'combo';
  source: string;
  parse: Function;
};

type EditorProps = EditorProperty & { activeElement: FormControl & { [index: string]: any } };

export const PropertyPair: React.FC<EditorProps> = observer(
  ({ activeElement, label, type, source, parse = stringParse }: EditorProps) => (
    <Form.Group>
      <Form.Field width={6} className={styles.propertyLabel}>
        <label>{label}</label>
      </Form.Field>
      <Form.Input
        width={10}
        type={type}
        value={activeElement[source]}
        onChange={e => (activeElement[source] = parse(e.currentTarget.value))}
      />
    </Form.Group>
  )
);

let options: EditorProperty[] = [
  {
    label: config.i18n`Label`,
    parse: stringParse,
    source: 'label',
    type: 'input'
  },
  {
    label: config.i18n`Width`,
    parse: intParse,
    source: 'width',
    type: 'number'
  },
  {
    label: config.i18n`Column`,
    parse: intParse,
    source: 'column',
    type: 'number'
  },
  {
    label: config.i18n`Row`,
    parse: intParse,
    source: 'row',
    type: 'number'
  }
];

export const PropertyPanel = observer(() => {
  const activeElement = editorState.selectedElement;
  return (
    <div className={styles.paneContent + ' ' + styles.propertyFields}>
      <Menu secondary inverted color="blue">
        {/* <Menu.Item icon="caret down" className={styles.caret} /> */}
        <Menu.Item icon="tasks" content={config.i18n`Properties`} />
        <Menu.Item fitted className={styles.flexed}>
          <Input icon="search" placeholder="Search ..." fluid />
        </Menu.Item>
      </Menu>

      <div className={styles.controlsMenu}>
        {!activeElement.control && <span>Please select a form control.</span>}
        {activeElement.control && (
          <Form className={styles.propertyFields}>
            {options.map((o, i) => (
              <PropertyPair key={i} activeElement={activeElement as any} {...o} />
            ))}
          </Form>
        )}
      </div>
    </div>
  );
});
