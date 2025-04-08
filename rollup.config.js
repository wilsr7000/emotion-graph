import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';
import { writeFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url)));

// Copy CSS to dist folder
const css = readFileSync(new URL('./src/emotion-graph.css', import.meta.url), 'utf8');
writeFileSync(new URL('./dist/emotion-graph.css', import.meta.url), css);

const input = 'src/index.ts';
const extensions = ['.ts', '.js'];

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
      exports: 'named',
      banner
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        babelHelpers: 'bundled',
        extensions,
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
      exports: 'named',
      banner
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        babelHelpers: 'bundled',
        extensions,
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
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        babelHelpers: 'bundled',
        extensions,
        exclude: 'node_modules/**'
      })
    ]
  }
]; 