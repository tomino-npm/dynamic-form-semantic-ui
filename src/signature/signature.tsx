import * as React from 'react';

import { SignatureHandlers, css } from '../common';
import { TextArea } from 'semantic-ui-react';
import { FormElement, DataSet } from '@tomino/dynamic-form';
import { SignatureSign } from './signature_sign';
import { SignatureReject } from './signature_reject';
import { ErrorView } from '../error_view';

type Props = {
  allowComment: boolean;
  handlers: SignatureHandlers;
  formControl: FormElement;
  owner: DataSet;
  readOnly: boolean;
};

const signatureLine = css`
  height: 20px;
  margin: 12px;
  border-bottom: dashed 1px #d4d4d5;
`;

export const SignatureRoot: React.FC<Props> = props => {
  const [reason, setReason] = React.useState('');

  if (props.readOnly) {
    return <div className={signatureLine}>&nbsp;</div>;
  }

  return (
    <>
      {props.allowComment && (
        <TextArea
          placeholder="Please leave a comment ..."
          value={reason}
          onChange={e => setReason(e.currentTarget.value)}
        />
      )}

      <SignatureSign {...props} reason={reason} />

      {(props.formControl.controlProps || {}).allowReject && (
        <SignatureReject {...props} reason={reason} />
      )}

      <ErrorView owner={props.owner} source={props.formControl.source + '.name'} newLine={true} />
    </>
  );
};

SignatureRoot.displayName = 'Signature';
