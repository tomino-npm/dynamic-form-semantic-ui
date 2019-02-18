import { renderLuis } from 'luis';

renderLuis({
  ...require('./summary'),
  loadTests: () => require('**.test')
});
