import * as React from 'react';

import { Button } from 'semantic-ui-react';
import { FormElement, DataSet } from '@tomino/dynamic-form';

import { CheckboxView } from './checkbox_view';
import { FormView } from './form_view';
import { FormulaView } from './formula_view';
import { InputView } from './input_view';
import { RadioView } from './radio_view';
import { RepeaterView } from './repeater_view';
import { SelectView } from './select_view';
import { TableView } from './table_view';
import { SignatureView } from './signature_view';

export function renderControl(
  control: FormElement,
  dataSet: DataSet,
  handlers: { [index: string]: () => void }
) {
  const formElement = control as FormElement;

  switch (formElement.control) {
    case 'Formula':
      return <FormulaView owner={dataSet} formControl={formElement} />;
    case 'Input':
      return <InputView owner={dataSet} formControl={formElement} />;
    case 'Form':
      return (
        <div className="ui form">
          <FormView
            owner={dataSet.getValue(control.source)}
            formControl={formElement}
            handlers={handlers}
            child={true}
          />
        </div>
      );
    case 'Select':
      return <SelectView owner={dataSet} formControl={formElement} />;
    case 'Checkbox':
      return <CheckboxView owner={dataSet} formControl={formElement} />;
    case 'Radio':
      return <RadioView owner={dataSet} formControl={formElement} />;
    case 'Repeater':
      return <RepeaterView owner={dataSet} formControl={formElement} handlers={handlers} />;
    case 'Table':
      return <TableView owner={dataSet} formControl={formElement} handlers={handlers} />;
    case 'DeleteButton':
      return <Button icon="trash" color="red" onClick={handlers && handlers.delete} />;
    case 'Text':
      return <span className="formText">{dataSet.getValue(formElement.source)}</span>;
    case 'Signature':
      return <SignatureView owner={dataSet} formControl={formElement} handlers={handlers} />;
  }

  throw new Error('Not implemented: ' + formElement.control);
}
