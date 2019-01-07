const {
  Sparky,
  FuseBox,
  JSONPlugin,
  CSSPlugin,
  CSSResourcePlugin,
  ImageBase64Plugin,
  EnvPlugin,
  WebIndexPlugin,
  UglifyJSPlugin,
  QuantumPlugin
} = require('fuse-box');

// const StubPlugin = require('proxyrequire').FuseBoxStubPlugin(/\.tsx?/);
// const JsxControlsPugin = require('jsx-controls-loader').fuseBoxPlugin;

const luisFuse = FuseBox.init({
  emitHMRDependencies: true,
  homeDir: 'src',
  output: 'public/$name.js',
  plugins: [
    ImageBase64Plugin(),
    JSONPlugin(),
    EnvPlugin({ NODE_ENV: 'test' }),
    CSSPlugin({
      group: 'luis.css',
      outFile: `public/styles/luis.css`,
      inject: false
    }),
    WebIndexPlugin({ template: 'index.html', target: 'index.html' })
  ],
  shim: {
    stream: {
      exports: '{ Writable: function() {}, Readable: function() {}, Transform: function() {} }'
    }
  }
});

luisFuse.dev({
  port: 9001
});

luisFuse
  .bundle('luis-vendor')
  // Watching (to add dependencies) it's damn fast anyway
  //.watch()
  // first bundle will get HMR related code injected
  // it will notify as well
  .sourceMaps(true)
  .hmr()
  .target('browser')
  .instructions(' ~ luis.ts'); // nothing has changed here

luisFuse
  .bundle('luis-client')
  .watch() // watch only client related code
  .hmr()
  .target('browser')
  .sourceMaps(true)
  .instructions(' !> [luis.ts]');

luisFuse.run();
