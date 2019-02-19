import * as React from 'react';

// import { Button } from 'semantic-ui-react';
import { FormElement, config, DataSet } from '@tomino/dynamic-form';
import { Input, Radio, Button, TextArea, Dropdown, Checkbox } from 'semantic-ui-react';
import { FormEditorView } from './editor_form_view';

export function renderEditControl(formElement: FormElement, owner: DataSet) {
  switch (formElement.control) {
    case 'Formula':
      return <Input disabled placeholder="#Formula" />;
    case 'Input':
      return <Input disabled placeholder="Input" />;
    case 'Radio':
      return <Radio disabled label={formElement.control} />;
    case 'EditorCell':
      return '';
    case 'Form':
      return (
        <div className="ui form">
          <FormEditorView
            readOnly={true}
            owner={formElement.source ? owner.getValue(formElement.source) : owner}
            formControl={formElement}
          />
        </div>
      );
    case 'Select':
      return <Dropdown select readOnly={true} />;
    case 'Checkbox':
      return <Checkbox readOnly={true} />;
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
    case 'Textarea':
      return <TextArea formControl={formElement} readOnly={true} />;
    // case 'DeleteButton':
    //   return <Button icon="trash" color="red" onClick={handlers && handlers.deleteRow} />;
    case 'ApproveButton':
      return <Button icon="check" primary content={config.i18n`Approve`} labelPosition="left" />;
    case 'RejectButton':
      return <Button icon="ban" color="red" content={config.i18n`Reject`} labelPosition="left" />;
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
