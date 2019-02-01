import * as React from 'react';

import { observer } from 'mobx-react';

import { FormControlProps, css, SignatureHandlers, SignatureType } from './common';
import { SignedSignature } from './signature/signature_signed';
import { SignatureRejected } from './signature/signature_rejected';
import { SignatureRoot } from './signature/signature';

const signatureStyle = css`
  .signature {
    border: solid 1px #ededed;
    border-radius: 5px;
  }

  .signature .image {
    width: 32px !important;
  }

  .signature .button {
    margin-top: 6px !important;
  }

  .signature .items,
  .signature .list {
    margin-top: 6px !important;
  }

  .signature img {
    width: 32px !important;
    vertical-align: middle;
    margin-right: 6px;
    cursor: pointer;
  }
`;

export class Signature extends React.Component<FormControlProps & { handlers: SignatureHandlers }> {
  state = {
    modalOpen: false,
    modalRejectOpen: false,
    reason: '',
    password: '',
    loading: false,
    error: '',
    fontReady: false
  };

  handleOpen = () => this.setState({ modalOpen: true });
  handleClose = () => !this.state.loading && this.setState({ modalOpen: false });

  async componentDidMount() {
    const value = this.props.owner.getValue(this.props.formControl.source) as SignatureType;
    if (value.signature) {
      const state = await this.props.handlers.verifySignature(value.uid, value.signature);
      console.log(state);
      value.setValue('verifiedState', state);
    }
  }

  render() {
    const {
      formControl,
      formControl: { source, controlProps },
      owner,
      handlers
    } = this.props;

    // check if all handlers are present
    if (
      !this.props.readOnly &&
      (!handlers ||
        !handlers.verifySignature ||
        !handlers.sign ||
        !handlers.signatureFont ||
        !handlers.validateForm)
    ) {
      throw new Error(
        `You must implement following handlers to use signatures:
          - validateForm (): boolean
          - verifySignature(uid: string, signature: string): boolean
          - sign(source: string, reject: boolean, password: string, reason: string, submit: boolean): string
          - signatureFont(): string`
      );
    }

    const value = owner.getValue(source) as SignatureType;
    const { allowComment } = controlProps || ({} as any);
    const font = handlers.signatureFont();

    // load font if needed
    if (value.signature && typeof window !== undefined) {
      // use three possible fonts

      if (typeof window !== 'undefined') {
        require('webfontloader').load({
          google: { families: [font] },
          fontactive: () => !this.state.fontReady && this.setState({ fontReady: true })
        });
      }
    }

    return (
      <fieldset className={signatureStyle}>
        <legend>{formControl.label}</legend>
        {value.signature && this.state.fontReady && (
          <SignedSignature value={value} font={font} readonly={this.props.readOnly} />
        )}
        {value.rejected && <SignatureRejected value={value} />}
        {!value.date && (
          <SignatureRoot
            allowComment={allowComment}
            handlers={this.props.handlers}
            formControl={this.props.formControl}
            owner={this.props.owner}
            readOnly={this.props.readOnly}
          />
        )}
      </fieldset>
    );
  }
}

export const SignatureView = observer(Signature);
