const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');

const packageJson = require('./package.json');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal({
      includeDependencies: false,
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs({
      include: ['node_modules/**'],
    }),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: ['**/*.test.*', '**/*.stories.*', 'examples/**'],
    }),
  ],
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    (id) => id.includes('react'),
  ],
  onwarn: (warning, warn) => {
    if (warning.code === 'UNRESOLVED_IMPORT' && warning.source?.includes('react')) {
      return;
    }
    warn(warning);
  },
};