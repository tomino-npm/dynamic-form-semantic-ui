import { observable } from 'mobx';
import { FormElement } from '@tomino/dynamic-form';

class EditorState {
  @observable.shallow selectedElement: FormElement = {} as any;
  selectedParent: FormElement;
}

export const editorState = new EditorState();
