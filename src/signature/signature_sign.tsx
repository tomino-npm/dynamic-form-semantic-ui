import * as React from 'react';

import { SignatureHandlers, css } from '../common';
import { Modal, Header, Button, Icon, Input, Label, Message } from 'semantic-ui-react';
import { FormElement, DataSet } from '@tomino/dynamic-form';

type Props = {
  allowComment: boolean;
  handlers: SignatureHandlers;
  formControl: FormElement;
  owner: DataSet;
  reason: string;
};

const margined = css`
  margin-top: 12px;
`;

const centered = css`
  text-align: center;
`;

const errorLabel = css`
  margin-left: 12px !important;
`;

export const SignatureSign: React.FC<Props> = ({
  allowComment,
  handlers,
  formControl,
  owner,
  reason
}) => {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [modelOpen, setModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  return (
    <Modal
      open={modelOpen}
      trigger={
        <Button
          onClick={() => handlers.validateForm() && setModalOpen(true)}
          icon="pencil alternate"
          content="Sign"
          labelPosition="left"
          primary
          floated={allowComment ? 'right' : null}
        />
      }
      size="small"
    >
      <Header icon="shield" content="Form Signature" />
      <Modal.Content>
        <div>
          <p>
            {formControl.controlProps && formControl.controlProps.submit
              ? `Do you wish to sign this form? Upon signing, you will no longer be able to make any
                  changes, the form will be automatically submitted and process will advance to a next
                  state.`
              : `Do you wish to sign this form? Upon signing, you will no longer be able to make any
                  changes. To submit this form go back to the process page and press the "Submit" button.
                  To make further changes to the form, you will need to remove your signature.`}
          </p>

          {reason && (
            <Message icon="comment outline" header="You left a comment" content={reason} />
          )}

          <form className={centered}>
            <label htmlFor="password">
              <b>Please provide your password to sign this form:</b>
              <br />
            </label>{' '}
            <Input
              className={margined}
              autoComplete="password"
              type="password"
              icon="lock"
              value={password}
              onChange={e => setPassword(e.currentTarget.value)}
            />
            {error && <Label color="red" content={error} className={errorLabel} />}
          </form>
        </div>
      </Modal.Content>
      <Modal.Actions>
        {!loading && (
          <Button onClick={() => setModalOpen(false)} loading={loading}>
            <Icon name="remove" /> Cancel
          </Button>
        )}
        <Button
          color="green"
          loading={loading}
          onClick={async () => {
            if (loading) {
              return;
            }

            if (password) {
              setLoading(true);
              setError('');
              let signature = await handlers.sign(
                formControl.source,
                false,
                password,
                reason,
                formControl.controlProps && !!formControl.controlProps.submit
              );
              setLoading(false);
              // setPassword('');
              if (signature) {
                owner.setValue(formControl.source, signature);
              }
              // setTimeout(() => setSignModalOpen(false), 500);
            } else {
              setError('Please provide password');
            }
          }}
        >
          <Icon name="pencil alternate" />{' '}
          {formControl.controlProps && formControl.controlProps.submit ? 'Sign and Submit' : 'Sign'}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

SignatureSign.displayName = 'SignatureSign';
