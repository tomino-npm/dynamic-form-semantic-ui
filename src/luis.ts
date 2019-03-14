import { renderLuis } from 'luis';

// import './tests/proxies';

renderLuis({
  // ...require('./summary'),
  loadTests: () => require('**.test')
});
