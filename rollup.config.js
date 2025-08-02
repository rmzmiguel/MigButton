import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { dts } from 'rollup-plugin-dts';

const packageJson = require('./package.json');

export default [
  {
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
        declaration: false, // Lo manejamos por separado
      }),
    ],
    external: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      // Hacer que React sea opcional incluso durante el build
      (id) => id.includes('react'),
    ],
    onwarn: (warning, warn) => {
      // Suprimir advertencias de peer dependencies no encontradas
      if (warning.code === 'UNRESOLVED_IMPORT' && warning.source?.includes('react')) {
        return;
      }
      warn(warning);
    },
  },
  {
    input: 'dist/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.css$/],
    onwarn: (warning, warn) => {
      if (warning.code === 'UNRESOLVED_IMPORT') {
        return;
      }
      warn(warning);
    },
  },
];