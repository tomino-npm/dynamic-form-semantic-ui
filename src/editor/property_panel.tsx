import * as React from 'react';

import * as styles from './editor_styles';

import { observer } from 'mobx-react';
import { Menu, Input, Form } from 'semantic-ui-react';
import { config, FormElement, FormControl } from '@tomino/dynamic-form';
import { editorState } from './editor_state';
import { findConflict } from './editor_helpers';

// const intParse = (value: string) => parseInt(value, 10);
const stringParse = (value: string) => value;
// const floatParse = (value: string) => parseFloat(value);

type EditorProperty = {
  label: string;
  type: 'input' | 'number' | 'checkbox' | 'radio' | 'combo';
  source: string;
  parse: (value: string, prev: any) => any;
  limit?: FormElement[];
};

type EditorProps = EditorProperty & { activeElement: FormControl & { [index: string]: any } };

let options: EditorProperty[] = [
  {
    label: config.i18n`Label:`,
    parse: stringParse,
    source: 'label',
    type: 'input'
  },
  {
    label: config.i18n`Source:`,
    parse: stringParse,
    source: 'source',
    type: 'input'
  },
  {
    label: config.i18n`Width:`,
    parse: (val, prev) => {
      let newWidth = parseInt(val, 10);
      if (newWidth < 1) {
        newWidth = 1;
      }
      if (newWidth > 15) {
        newWidth = 15;
      }
      const element = editorState.selectedElement;
      const currentColumn = element.column;

      if (element.column + newWidth - 1 > 15) {
        element.column = 15 - newWidth + 1;
      }
      const conflict = findConflict(
        element.parent.elements.filter(s => s.row === element.row && s !== element),
        element.column,
        element.column + newWidth - 1
      );
      if (conflict) {
        element.column = currentColumn;
      }
      return conflict ? prev : newWidth;
    },
    source: 'width',
    type: 'number'
  },
  {
    label: config.i18n`Column:`,
    parse: (val, prev) => {
      let current = parseInt(val, 10);
      if (current < 0) {
        current = 0;
      }
      if (current > 15) {
        current = 15;
      }
      const element = editorState.selectedElement;
      if (current + element.width - 1 > 15) {
        current = 15 - element.width + 1;
      }
      const conflict = findConflict(
        editorState.selectedParent.elements.filter(s => s.row === element.row && s !== element),
        current,
        current + element.width - 1
      );
      return conflict ? prev : current;
    },
    source: 'column',
    type: 'number'
  },
  // {
  //   label: config.i18n`Row`,
  //   parse: (val, prev) => {
  //     let current = parseInt(val, 10);
  //     if (current < 0) {
  //       current = 0;
  //     }
  //     // if (current > 15) {
  //     //   current = 15;
  //     // } // TODO
  //     const element = editorState.selectedElement;
  //     // if (current + element.width - 1 > 15) {
  //     //   current = 15 - element.width + 1;
  //     // }
  //     const conflict = findConflict(
  //       editorState.selectedParent.elements.filter(s => s.row === current && s !== element),
  //       element.column,
  //       element.column + element.width - 1
  //     );
  //     return conflict ? prev : current;
  //   },
  //   source: 'row',
  //   type: 'number'
  // }
  {
    label: config.i18n`Import:`,
    parse: stringParse,
    source: 'sourceRef',
    type: 'input'
  },
  {
    label: config.i18n`Inline:`,
    parse: stringParse,
    source: 'inline',
    type: 'input'
  },
  {
    label: config.i18n`List:`,
    parse: stringParse,
    source: 'list',
    type: 'input'
  },
  {
    label: config.i18n`Filter:`,
    parse: stringParse,
    source: 'inline',
    type: 'input'
  },
  {
    label: config.i18n`Column:`,
    parse: stringParse,
    source: 'inline',
    type: 'input'
  },
  {
    label: config.i18n`Props:`,
    parse: stringParse,
    source: 'inline',
    type: 'input'
  },
  {
    label: config.i18n`Vertical:`,
    parse: stringParse,
    source: 'inline',
    type: 'input'
  },
  {
    label: config.i18n`Url:`,
    parse: stringParse,
    source: 'inline',
    type: 'input'
  }
];

let schemaOptions: EditorProperty[] = [
  {
    label: config.i18n`Source`,
    parse: stringParse,
    source: 'source',
    type: 'input'
  }
];

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
        onChange={e =>
          (activeElement[source] = parse(e.currentTarget.value, activeElement[source]))
        }
      />
    </Form.Group>
  )
);

export const PropertyPanel = observer(() => {
  const activeElement = editorState.selectedElement;
  return (
    <div className={styles.paneContent + ' ' + styles.propertyFields}>
      <Menu secondary inverted color="blue">
        <Menu.Item icon="caret down" className={styles.caret} />
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

      {activeElement.control && (
        <>
          <Menu secondary inverted color="blue">
            <Menu.Item icon="caret down" className={styles.caret} />
            <Menu.Item icon="folder" content={config.i18n`Schema`} />
            <Menu.Item fitted className={styles.flexed}>
              <Input icon="search" placeholder="Search ..." fluid />
            </Menu.Item>
          </Menu>

          <div className={styles.controlsMenu}>
            <Form className={styles.propertyFields}>
              {schemaOptions.map((o, i) => (
                <PropertyPair key={i} activeElement={activeElement as any} {...o} />
              ))}
            </Form>
          </div>
        </>
      )}
    </div>
  );
});
