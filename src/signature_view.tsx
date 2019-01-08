import * as React from 'react';

import { observer } from 'mobx-react';

import { verified, rejected, pending } from './images';

import { FormControlProps, css } from './common';
import { Modal, Header, Item, Icon, List, TextArea, Button, Input, Label } from 'semantic-ui-react';

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

const signedStyle = css`
  font-size: 18px !important;
`;

const signedDate = css`
  font-size: 12px !important;
  color: #333;
`;

const margined = css`
  margin-top: 12px;
`;

const centered = css`
  text-align: center;
`;

const errorLabel = css`
  margin-left: 12px !important;
`;

export type SignatureType = {
  comment: string;
  signature: string;
  verifiedState: 'Pending' | 'Verified' | 'Rejected';
  rejected: boolean;
  uid: string;
  name: string;
  date: Date;
  setValue(name: string, value: any): any;
};

export class Signature extends React.Component<FormControlProps> {
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

  renderSigned(value: SignatureType, font: string) {
    return (
      <Item.Group>
        <Item>
          <Item.Image size="tiny">
            {value.verifiedState === 'Pending' && (
              <Modal
                trigger={
                  <img
                    src={pending}
                    title="Pending Signature Verification"
                    onClick={this.handleOpen}
                  />
                }
                basic
                size="small"
                open={this.state.modalOpen}
              >
                <Header icon="question" content="Pending Verification" />
                <Modal.Content>
                  <p>Please wait while we verify the signature.</p>
                </Modal.Content>
                <Modal.Actions>
                  <Button basic inverted onClick={this.handleClose}>
                    <Icon name="remove" /> Close
                  </Button>
                </Modal.Actions>
              </Modal>
            )}
            {value.verifiedState === 'Verified' && (
              <Modal
                trigger={<img src={verified} title="Valid Signature" onClick={this.handleOpen} />}
                basic
                size="small"
                open={this.state.modalOpen}
              >
                <Header icon="check" content="The Signature is Valid" />
                <Modal.Content>
                  <p>
                    The signature was verified. User {value.name} has signed this document and since
                    the document has been signed it has not been modified or tampered with.
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button basic inverted onClick={this.handleClose}>
                    <Icon name="remove" /> Close
                  </Button>
                </Modal.Actions>
              </Modal>
            )}
            {value.verifiedState === 'Rejected' && (
              <Modal
                trigger={<img src={rejected} title="Invalid Signature" onClick={this.handleOpen} />}
                basic
                size="small"
                open={this.state.modalOpen}
              >
                <Header icon="times circle" content="The Signature is Invalid" />
                <Modal.Content>
                  <p>
                    It is possible that the content of the form has been modified after user signed
                    the document. Please contact the process owner and the signatory.
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <Button basic inverted onClick={this.handleClose}>
                    <Icon name="remove" /> Close
                  </Button>
                </Modal.Actions>
              </Modal>
            )}
          </Item.Image>
          <Item.Content>
            <span className={signedStyle} style={{ fontFamily: font }}>
              {value.name}
            </span>
            <br />
            <span className={signedDate}>{value.date.toLocaleDateString()}</span>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }

  renderRejected(value: SignatureType) {
    return (
      <List>
        <List.Item
          icon="ban"
          content={`${value.name} rejected to sign on ${value.date.toLocaleDateString()}`}
        />
        {value.comment && <List.Item icon="comment" content={value.comment} />}
      </List>
    );
  }

  renderSign(_value: SignatureType, allowComment: boolean) {
    return (
      <>
        {allowComment && (
          <TextArea
            placeholder="Please leave a comment ..."
            value={this.state.reason}
            onChange={e => this.setState({ reason: e.currentTarget.value })}
          />
        )}

        <Modal
          open={this.state.modalOpen}
          trigger={
            <Button
              onClick={this.handleOpen}
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
                Do you wish to sign this form? Upon signing, you will no longer be able to make any
                changes, the form will be automatically submitted and process will advance to a next
                state.
              </p>

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
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.currentTarget.value })}
                />
                {this.state.error && (
                  <Label color="red" content={this.state.error} className={errorLabel} />
                )}
              </form>
            </div>
            {this.state.reason && (
              <p>
                <b>
                  <Icon name="comment" /> Comment
                </b>
                <br /> {this.state.reason}
              </p>
            )}
          </Modal.Content>
          <Modal.Actions>
            {!this.state.loading && (
              <Button onClick={this.handleClose} loading={this.state.loading}>
                <Icon name="remove" /> Cancel
              </Button>
            )}
            <Button
              color="green"
              loading={this.state.loading}
              onClick={async () => {
                if (this.state.loading) {
                  return;
                }

                if (this.state.password) {
                  this.setState({ loading: true, error: '' });
                  await this.props.handlers.sign(this.state.password, this.state.reason);
                  this.setState({ loading: false, modalOpen: false, password: '' });
                } else {
                  this.setState({ error: 'Please provide password' });
                }
              }}
            >
              <Icon name="pencil alternate" /> Sign
            </Button>
          </Modal.Actions>
        </Modal>

        <Modal
          open={this.state.modalRejectOpen}
          trigger={
            <Button
              icon="ban"
              content="Reject"
              labelPosition="left"
              onClick={() => this.setState({ modalRejectOpen: true })}
              color="red"
              floated={allowComment ? 'right' : null}
            />
          }
          size="small"
        >
          <Header icon="ban" content="Reject Signature" />
          <Modal.Content>
            <div>
              <p>
                Do you wish to reject this form? Upon rejecting, you will no longer be able to make
                any changes, the form will be automatically submitted and process will advance to a
                next state.
              </p>
              <form className={centered}>
                <label htmlFor="password">
                  <b>Please provide your password to reject this form:</b>
                </label>{' '}
                <br />
                <Input
                  className={margined}
                  type="password"
                  icon="lock"
                  autoComplete="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.currentTarget.value })}
                />
                {this.state.error && (
                  <Label color="red" content={this.state.error} className={errorLabel} />
                )}
              </form>
            </div>
            {this.state.reason && (
              <p>
                <b>
                  <Icon name="comment" /> Comment
                </b>
                <br /> {this.state.reason}
              </p>
            )}
          </Modal.Content>
          <Modal.Actions>
            {!this.state.loading && (
              <Button
                onClick={() => this.setState({ modalRejectOpen: false })}
                loading={this.state.loading}
              >
                <Icon name="remove" /> Cancel
              </Button>
            )}
            <Button
              color="red"
              loading={this.state.loading}
              onClick={async () => {
                if (this.state.loading) {
                  return;
                }

                if (this.state.password) {
                  this.setState({ loading: true, error: '' });
                  await this.props.handlers.reject(this.state.password, this.state.reason);
                  this.setState({ loading: false, modalOpen: false, password: '' });
                } else {
                  this.setState({ error: 'Please provide password' });
                }
              }}
            >
              <Icon name="ban" /> Reject
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
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
      !handlers ||
      !handlers.verifySignature ||
      !handlers.sign ||
      !handlers.reject ||
      !handlers.signatureFont
    ) {
      throw new Error(
        'You must implement and pass "verifySignature(uid, signature)", "sign(password, reason)" and "reject(password, reason)" and "signatureFont(): string" handler to use signature component'
      );
    }

    const value = owner.getValue(source) as SignatureType;
    const { allowComment } = controlProps;
    const font = handlers.signatureFont();

    // load font if needed
    if (value.signature && typeof window !== undefined) {
      // use three possible fonts
      require('webfontloader').load({
        google: { families: [font] },
        fontactive: () => !this.state.fontReady && this.setState({ fontReady: true })
      });
    }

    return (
      <fieldset className={signatureStyle}>
        <legend>{formControl.label}</legend>
        {value.signature && this.state.fontReady && this.renderSigned(value, font)}
        {value.rejected && this.renderRejected(value)}
        {!value.date && this.renderSign(value, allowComment)}
      </fieldset>
    );
  }
}

export const SignatureView = observer(Signature);
