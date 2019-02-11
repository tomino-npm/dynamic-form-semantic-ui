import * as React from 'react';

// import { Button } from 'semantic-ui-react';
import { FormElement } from '@tomino/dynamic-form';
import { Input, Radio } from 'semantic-ui-react';

export function renderEditControl(formElement: FormElement) {
  switch (formElement.control) {
    // case 'Formula':
    //   return <FormulaView owner={dataSet} formControl={formElement} readOnly={readOnly} />;
    case 'Input':
      return <Input disabled placeholder="Input" />;
    case 'Radio':
      return <Radio disabled label={formElement.control} />;
    case 'EditorCell':
      return '';
    // case 'Form':
    //   return (
    //     <div className="ui form">
    //       <FormView
    //         owner={control.source ? dataSet.getValue(control.source) : dataSet}
    //         formControl={formElement}
    //         handlers={handlers}
    //         child={true}
    //         readOnly={readOnly || control.readOnly}
    //         editMode={editMode}
    //         emptyField={EmptyField}
    //         fieldWrapper={fieldWrapper}
    //       />
    //     </div>
    //   );
    // case 'Select':
    //   return <SelectView owner={dataSet} formControl={formElement} readOnly={readOnly} />;
    // case 'Checkbox':
    //   return <CheckboxView owner={dataSet} formControl={formElement} readOnly={readOnly} />;
    // case 'Radio':
    //   return <RadioView owner={dataSet} formControl={formElement} readOnly={readOnly} />;
    // case 'Repeater':
    //   return (
    //     <RepeaterView
    //       owner={dataSet}
    //       formControl={formElement}
    //       handlers={handlers}
    //       readOnly={readOnly}
    //       editMode={editMode}
    //       emptyField={EmptyField}
    //       fieldWrapper={fieldWrapper}
    //     />
    //   );
    // case 'Table':
    //   return (
    //     <TableView
    //       owner={dataSet}
    //       formControl={formElement}
    //       handlers={handlers}
    //       readOnly={readOnly}
    //     />
    //   );
    // case 'Textarea':
    //   return <TextAreaView owner={dataSet} formControl={formElement} readOnly={readOnly} />;
    // case 'DeleteButton':
    //   return <Button icon="trash" color="red" onClick={handlers && handlers.deleteRow} />;
    // case 'ApproveButton':
    //   return (
    //     <Button
    //       icon="check"
    //       primary
    //       onClick={() => {
    //         if (control.source) {
    //           dataSet.setValue(control.source, true);
    //         }
    //         handlers.approve();
    //       }}
    //       content={config.i18n`Approve`}
    //       labelPosition="left"
    //     />
    //   );
    // case 'RejectButton':
    //   return (
    //     <Button
    //       icon="ban"
    //       color="red"
    //       onClick={() => {
    //         if (control.source) {
    //           dataSet.setValue(control.source, true);
    //         }
    //         handlers.reject();
    //       }}
    //       content={config.i18n`Reject`}
    //       labelPosition="left"
    //     />
    //   );
    // case 'Value':
    //   return (
    //     <span className="formText" {...formElement.controlProps}>
    //       {dataSet.getValue(formElement.source)}
    //     </span>
    //   );
    // case 'Text':
    //   return (
    //     <div
    //       className={'formText ' + (formElement.inline ? '' : formText)}
    //       {...formElement.controlProps}
    //       dangerouslySetInnerHTML={{ __html: formElement.label }}
    //     />
    //   );
    // case 'Image':
    //   return <img src={formElement.url} alt={formElement.label} {...formElement.controlProps} />;
    // case 'Signature':
    //   return (
    //     <SignatureView
    //       owner={dataSet}
    //       formControl={formElement}
    //       handlers={handlers as any}
    //       readOnly={readOnly}
    //     />
    //   );
    // case 'Comment':
    //   return (
    //     <CommentView
    //       owner={dataSet}
    //       formControl={formElement}
    //       handlers={handlers as any}
    //       readOnly={readOnly}
    //     />
    //   );
  }

  throw new Error('Not implemented: ' + formElement.control);
}
