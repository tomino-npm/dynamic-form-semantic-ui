import { renderLuis } from 'luis';

renderLuis({
  ...require('./summary'),
  tests: () => require('**.test')
});
