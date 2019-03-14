const {
  FuseBox,
  JSONPlugin,
  CSSPlugin,
  ImageBase64Plugin,
  EnvPlugin,
  WebIndexPlugin
} = require('fuse-box');

const StubPlugin = require('proxyrequire').FuseBoxStubPlugin(/\.tsx?/);
const SnapshotPlugin = require('luis/fuse-box/snapshot-plugin').SnapshotPlugin;

const luisFuse = FuseBox.init({
  homeDir: 'src',
  output: 'public/$name.js',
  target: 'browser',
  sourceMaps: true,
  plugins: [
    SnapshotPlugin(),
    StubPlugin,
    ImageBase64Plugin(),
    JSONPlugin(),
    EnvPlugin({ NODE_ENV: 'test' }),
    CSSPlugin({
      group: 'luis.css',
      outFile: `public/styles/luis.css`,
      inject: false
    }),
    WebIndexPlugin({ template: 'luis.fuse.html', target: 'index.html' })
  ]
});

luisFuse.dev({
  fallback: 'index.html',
  port: 9001
});

luisFuse.bundle('luis-vendor').instructions(` ~ luis.ts`); // nothing has changed here

luisFuse
  .bundle('luis-client')
  .watch() // watch only client related code
  .hmr()
  .sourceMaps(true)
  .instructions(
    ` !> [luis.ts] + proxyrequire + **/*.fixture.* + **/*.story.* + **/*.test.* + **/__fixtures__/* + **/__stories__/* + **/__tests__/* + **/tests/*`
  )
  .globals({
    proxyrequire: '*'
  });

luisFuse.run();
