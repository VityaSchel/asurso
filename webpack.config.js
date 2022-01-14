import path from 'path'

export default {
  target: 'node',
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'index.min.js',
    path: path.resolve(new URL('.', import.meta.url).pathname, './lib')
  },
};
