import { FormElement, DataSet } from '@tomino/dynamic-form';
import { initCss } from '@tomino/toolbelt';

export type FormControlProps = {
  formControl: FormElement;
  owner: DataSet;
  handlers?: { [index: string]: (...params: any[]) => any };
};

export const { css, renderCss } = initCss('d-form');
