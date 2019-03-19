import * as React from 'react';

import * as styles from './editor_styles';

import { observer } from 'mobx-react';
import { Form } from 'semantic-ui-react';
import { FormElement, FormControl } from '@tomino/dynamic-form';

export type EditorProperty = {
  label: string;
  type: 'input' | 'number' | 'checkbox' | 'radio' | 'combo';
  source: string;
  parse: (value: string, prev: any) => any;
  limit?: FormElement[];
};

type EditorProps = EditorProperty & { activeElement: FormControl & { [index: string]: any } };

export const stringParse = (value: string) => value;

export const PropertyPair: React.FC<EditorProps> = observer(
  ({ activeElement, label, type, source, parse = stringParse }: EditorProps) => (
    <Form.Group>
      <Form.Field width={6} className={styles.propertyLabel}>
        <label>{label}</label>
      </Form.Field>
      <Form.Input
        width={10}
        type={type}
        value={activeElement.getValue(source)}
        onChange={e =>
          activeElement.setValue(source, parse(e.currentTarget.value, activeElement[source]))
        }
      />
    </Form.Group>
  )
);
