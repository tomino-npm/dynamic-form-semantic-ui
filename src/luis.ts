// luis.ts
import { renderLuis, setupTestBridge } from 'luis';

// this needs to be there to set up custom global function that luis uses
setupTestBridge({ testResults: [] } as any);

(global as any).jest = {
  fn: () => {}
};

// import all your stories and tests
// import './tests/checkbox_view.test';
// import './tests/input_view.test';
// import './tests/radio_view.test';
// import './tests/repeater_view.test';
// import './tests/select_view.test';
// import './tests/signature_view.test';
// import './tests/table_view.test';
import './tests/draggable_form_editor.test';
// import './tests/form_editor.test';
// import './tests/text_area_view.test';
// import './tests/buttons.view.test';
// import './tests/comment_view.test';

// render luis ui to '#react-root'
renderLuis();
