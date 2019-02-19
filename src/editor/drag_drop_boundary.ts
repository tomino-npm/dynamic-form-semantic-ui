import { FormElement } from '@tomino/dynamic-form';
import { action } from 'mobx';
import { findConflict } from './editor_helpers';

export function dragElement(
  e: React.MouseEvent<HTMLDivElement>,
  element: FormElement,
  direction: 'left' | 'right'
) {
  // let widthPx = 0;
  e.preventDefault();
  e.stopPropagation();
  let formWidth = element.width;

  // create a clone of the currentTarget element
  // const form = document.querySelector('#editorForm');
  const sibling = (direction === 'left'
    ? e.currentTarget.nextSibling
    : e.currentTarget.previousSibling) as HTMLDivElement;
  const clone = sibling.cloneNode(true) as HTMLDivElement;
  const rect = sibling.getBoundingClientRect();
  const parentRect = sibling.parentElement.parentElement.parentElement.getBoundingClientRect();

  // debugger;

  let originalX = direction === 'left' ? rect.left : rect.right;
  let clientWidth = rect.width;
  let originalWidth = parentRect.width;
  let widthDivision = originalWidth / formWidth;
  let newWidth = Math.floor(originalWidth / widthDivision);

  // used in validation
  let cells = element.parent.elements.filter(e => e.row === element.row && e !== element);

  // insert the clone to the page
  // TODO: position the clone appropriately
  document.body.appendChild(clone);

  clone.style.position = 'absolute';
  clone.style.top = rect.top + 'px';
  clone.style.left = rect.left + 'px';
  clone.style.width = rect.width + 'px';
  clone.style.height = rect.height + 'px';

  const closeDragElement = action(() => {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;

    if (validateDrag() && newFormWidth() > 0) {
      element.column = newColumn();
      element.width = newFormWidth();
    }

    document.body.removeChild(clone);
  });

  e = e || (window.event as any);
  // get the mouse cursor position at startup:
  document.onmouseup = closeDragElement;
  // call a function whenever the cursor moves:
  document.onmousemove = elementDrag;

  function newFormWidth() {
    return Math.ceil(newWidth / widthDivision);
  }

  function newColumn() {
    return direction === 'left'
      ? element.column - (newFormWidth() - element.width)
      : element.column;
  }

  function validateDrag() {
    // try one adjustment moving the item left or right from the conflict cell
    console.log(`${newColumn()}`);

    return !findConflict(cells, newColumn(), newColumn() + newFormWidth() - 1);
  }

  function elementDrag(e: MouseEvent) {
    e = e || (window.event as any);
    e.preventDefault();

    if (direction === 'left') {
      // set the element's new position:
      newWidth = originalX - e.clientX + clientWidth;
      if (validateDrag()) {
        clone.style.width = newWidth + 'px';
        clone.style.left = e.clientX - 2 + 'px'; // clone.offsetLeft - pos1 + 'px';
      }
    } else {
      newWidth = e.clientX - originalX + clientWidth;
      if (validateDrag()) {
        clone.style.width = newWidth + 'px';
      }
    }
  }
}
