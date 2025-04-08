import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

const input = 'src/index.js';
const extensions = ['.js'];

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * ${pkg.homepage}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * Released under the ${pkg.license} License
 */`;

export default [
  // UMD build for browsers
  {
    input,
    output: {
      file: 'dist/emotion-graph.js',
      format: 'umd',
      name: 'EmotionGraph',
      banner
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })
    ]
  },
  
  // Minified UMD build
  {
    input,
    output: {
      file: 'dist/emotion-graph.min.js',
      format: 'umd',
      name: 'EmotionGraph',
      banner
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      }),
      terser({
        format: {
          comments: /^!/
        }
      })
    ]
  },
  
  // ESM build for modern environments
  {
    input,
    output: {
      file: pkg.module,
      format: 'esm',
      banner
    },
    plugins: [
      resolve({ extensions }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**'
      })
    ]
  }
]; 