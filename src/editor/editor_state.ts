import { observable } from 'mobx';
import { FormElement } from '@tomino/dynamic-form';

class EditorState {
  @observable.shallow selectedElement: FormElement = {} as any;
  grid: { [index: number]: { [index: number]: number } } = {};
  selectedParent: FormElement;
  lastHightLight: number[][] = [];

  clearHighlight() {
    for (let cell of editorState.lastHightLight) {
      editorState.grid[cell[0]][cell[1]] = 0;
    }
    editorState.lastHightLight = [];
  }
}

export const editorState = new EditorState();
