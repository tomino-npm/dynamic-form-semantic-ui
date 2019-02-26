import * as React from 'react';

// import { Button } from 'semantic-ui-react';
import { FormElement, config, DataSet } from '@tomino/dynamic-form';
import { Input, Radio, Button, TextArea, Dropdown, Checkbox, Icon } from 'semantic-ui-react';
import { FormEditorView } from './editor_form_view';
import { css } from '../common';
import { toJS } from 'mobx';
import { CommentView } from '../comment_view';
import { FormulaView } from '../formula_view';
import { SignatureView } from '../signature_view';
import { TableView } from '../table_view';

const options = [{ value: '1', text: 'Option 1' }, { value: '2', text: 'Option 2' }];

const margined = css`
  margin-top: 20px;
`;

const signatureHandlers = {
  signatureFont() {
    return 'Pacifico';
  }
};

export function renderEditControl(formElement: FormElement, owner: DataSet) {
  let { source, controlProps, label } = formElement;
  controlProps = toJS(controlProps);

  switch (formElement.control) {
    case 'Formula':
      return <FormulaView owner={owner} formControl={formElement} readOnly={true} />;
    case 'Input':
      return <Input fluid disabled placeholder="Input" />;
    case 'Radio':
      return <Radio disabled label={formElement.control} />;
    case 'EditorCell':
      return '';
    case 'Form':
      return (
        <FormEditorView
          readOnly={true}
          owner={formElement.source ? owner.getValue(formElement.source) : owner}
          formControl={formElement}
        />
      );
    case 'Select':
      return <Dropdown fluid selection readOnly={true} options={options} />;
    case 'Checkbox':
      return (
        <Checkbox
          {...controlProps}
          name={source}
          label={label}
          readOnly={false}
          checked={!!owner.getValue(source)}
        />
      );
    case 'Repeater':
      return <FormEditorView formControl={formElement} owner={owner} readOnly={true} />;
    case 'Table':
      return (
        <FormEditorView formControl={formElement} owner={owner} readOnly={true} disableAdd={true} />
      );
    case 'Textarea':
      return <TextArea readOnly={true} {...controlProps} />;
    case 'DeleteButton':
      return <Button icon="trash" color="red" {...controlProps} />;
    case 'ApproveButton':
      return (
        <Button
          icon="check"
          primary
          content={config.i18n`Approve`}
          labelPosition="left"
          {...controlProps}
        />
      );
    case 'RejectButton':
      return (
        <Button
          icon="ban"
          color="red"
          content={config.i18n`Reject`}
          labelPosition="left"
          {...controlProps}
        />
      );
    case 'Value':
      if (!formElement.source || !owner.getValue(formElement.source)) {
        return (
          <div className="formText" {...controlProps}>
            $Value
          </div>
        );
      }
      return (
        <div className="formText" {...controlProps}>
          {owner.getValue(formElement.source)}
        </div>
      );
    case 'Text':
      if (!formElement.label) {
        return <Icon name="font" circular />;
      }
      return (
        <div
          className={'formText ' + (formElement.inline ? '' : margined)}
          {...controlProps}
          dangerouslySetInnerHTML={{ __html: formElement.label }}
        />
      );
    case 'Image':
      return (
        <div style={{ overflow: 'hidden' }}>
          {formElement.url ? (
            <img src={formElement.url} alt={formElement.label} {...controlProps} />
          ) : (
            <Icon name="image" />
          )}
        </div>
      );
    case 'Signature':
      return (
        <SignatureView
          owner={owner}
          formControl={formElement}
          handlers={signatureHandlers as any}
          readOnly={true}
        />
      );
    case 'Comment':
      return <CommentView owner={owner} formControl={formElement} readOnly={false} />;
  }

  throw new Error('Not implemented: ' + formElement.control);
}
