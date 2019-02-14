module.exports = function(wallaby) {
  var path = require('path');
  process.env.NODE_PATH =
    path.join(__dirname, '../node_modules') + path.delimiter + path.join(__dirname, 'node_modules');

  return {
    files: [
      'package.json',
      'tsconfig.json',
      'src/**/*.+(js|jsx|ts|tsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg|graphql)',
      '!src/**/*.test.+(ts|tsx)'
    ],
    filesWithNoCoverageCalculated: [],
    tests: ['src/**/search_view.test.+(ts|tsx)'],

    env: {
      type: 'node',
      runner: 'node'
    },
    workers: {
      initial: 1,
      regular: 1
    },
    testFramework: 'mocha',
    setup() {
      const expect = require('expect');
      const toMatchSnapshot = require('expect-mocha-snapshot');
      expect.extend({
        toMatchSnapshot: (_args, ctx) => {
          return toMatchSnapshot({ ..._args, ...ctx });
        }
      });

      global.expect = expect;

      process.env.JEST_ROOT_OUTPUT_PATH = require('path').resolve(
        '/Users/tomi/Github/apps/interfaces/dynamic-form-semantic-ui/src'
      );
    }
  };
};
