const { renderLuis } = require('luis');

// please run the jest with the luis reporter
// add { reporters: ['luis/reporter] } to your jest.config.js
// OR comment this out if you do not plan to wisualise your tests

const { snapshots, report } = require('./summary');

renderLuis({
  snapshots,
  report,
  tests: () => require('~/**.test')
});