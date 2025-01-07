module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }], '@babel/preset-react', '@babel/preset-typescript'],
  env: {
    test: {
      presets: ['@babel/preset-env', '@babel/preset-typescript']
    }
  },
  plugins: ['@babel/plugin-transform-runtime']
}
