import { observable } from 'mobx';
import { FormControl, FormElement } from '@tomino/dynamic-form';

class EditorState {
  @observable.shallow selectedElement: FormElement = {} as any;
}

export const editorState = new EditorState();
