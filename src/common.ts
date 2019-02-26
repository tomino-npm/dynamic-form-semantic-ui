import { FormElement, DataSet } from '@tomino/dynamic-form';
import { initCss } from '@tomino/toolbelt';

export type SignatureType = {
  comment: string;
  signature: string;
  verifiedState: 'Pending' | 'Verified' | 'Rejected';
  rejected?: boolean;
  uid: string;
  name: string;
  date: Date;
  setValue?(name: string, value: any): any;
};

export type SignatureHandlers = {
  validateForm(): boolean;
  verifySignature(uid: string, signature: string): Promise<string>;
  sign(
    source: string,
    reject: boolean,
    password: string,
    reason: string,
    submit: boolean
  ): Promise<SignatureType>;
  signatureFont(): string;
};

export type FormControlProps = {
  formControl: FormElement;
  owner: DataSet;
  handlers?: { [index: string]: any };
  readOnly: boolean;
};

export const { css, renderCss } = initCss('form-');
