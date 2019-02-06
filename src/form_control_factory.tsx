import * as React from 'react';

// import { Button } from 'semantic-ui-react';
import { FormElement, DataSet, config } from '@tomino/dynamic-form';

import { CheckboxView } from './checkbox_view';
import { FormView } from './form_view';
import { FormulaView } from './formula_view';
import { InputView } from './input_view';
import { RadioView } from './radio_view';
import { RepeaterView } from './repeater_view';
import { SelectView } from './select_view';
import { TableView } from './table_view';
import { SignatureView } from './signature_view';
import { TextAreaView } from './textarea_view';
import { css, SignatureHandlers } from './common';
import { Button } from 'semantic-ui-react';
import { CommentView } from './comment_view';
import { SearchView } from './search_view';

const formText = css`
  margin-top: 20px;
`;

export function renderControl(
  control: FormElement,
  dataSet: DataSet,
  handlers: SignatureHandlers & { deleteRow?: any; approve?: any; reject?: any },
  readOnly: boolean
) {
  const formElement = control as FormElement;

  switch (formElement.control) {
    case 'Formula':
      return <FormulaView owner={dataSet} formControl={formElement} readOnly={readOnly} />;
    case 'Input':
      return <InputView owner={dataSet} formControl={formElement} readOnly={readOnly} />;
    case 'Search':
      return (
        <SearchView
          owner={dataSet}
          formControl={formElement}
          readOnly={readOnly}
          handlers={handlers}
        />
      );
    case 'Form':
      return (
        <div className="ui form">
          <FormView
            owner={control.source ? dataSet.getValue(control.source) : dataSet}
            formControl={formElement}
            handlers={handlers}
            child={true}
            readOnly={readOnly || control.readOnly}
          />
        </div>
      );
    case 'Select':
      return <SelectView owner={dataSet} formControl={formElement} readOnly={readOnly} />;
    case 'Checkbox':
      return <CheckboxView owner={dataSet} formControl={formElement} readOnly={readOnly} />;
    case 'Radio':
      return <RadioView owner={dataSet} formControl={formElement} readOnly={readOnly} />;
    case 'Repeater':
      return (
        <RepeaterView
          owner={dataSet}
          formControl={formElement}
          handlers={handlers}
          readOnly={readOnly}
        />
      );
    case 'Table':
      return (
        <TableView
          owner={dataSet}
          formControl={formElement}
          handlers={handlers}
          readOnly={readOnly}
        />
      );
    case 'Textarea':
      return <TextAreaView owner={dataSet} formControl={formElement} readOnly={readOnly} />;
    case 'DeleteButton':
      return <Button icon="trash" color="red" onClick={handlers && handlers.deleteRow} />;
    case 'ApproveButton':
      return (
        <Button
          icon="check"
          primary
          onClick={() => {
            if (control.source) {
              dataSet.setValue(control.source, true);
            }
            handlers.approve();
          }}
          content={config.i18n`Approve`}
          labelPosition="left"
        />
      );
    case 'RejectButton':
      return (
        <Button
          icon="ban"
          color="red"
          onClick={() => {
            if (control.source) {
              dataSet.setValue(control.source, true);
            }
            handlers.reject();
          }}
          content={config.i18n`Reject`}
          labelPosition="left"
        />
      );
    case 'Value':
      return (
        <span className="formText" {...formElement.controlProps}>
          {dataSet.getValue(formElement.source)}
        </span>
      );
    case 'Text':
      return (
        <div
          className={'formText ' + (formElement.inline ? '' : formText)}
          {...formElement.controlProps}
          dangerouslySetInnerHTML={{ __html: formElement.label }}
        />
      );
    case 'Image':
      return <img src={formElement.url} alt={formElement.label} {...formElement.controlProps} />;
    case 'Signature':
      return (
        <SignatureView
          owner={dataSet}
          formControl={formElement}
          handlers={handlers as any}
          readOnly={readOnly}
        />
      );
    case 'Comment':
      return (
        <CommentView
          owner={dataSet}
          formControl={formElement}
          handlers={handlers as any}
          readOnly={readOnly}
        />
      );
  }

  throw new Error('Not implemented: ' + formElement.control);
}
