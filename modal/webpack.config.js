module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path: './umd',
    filename: 'react-towel.js',
    libraryTarget: 'umd',
    library: 'react-towel',
  }
}
