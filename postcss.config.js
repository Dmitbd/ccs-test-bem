const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  plugins: [
    autoprefixer,
    cssnano({ preset: 'default' })
  ]
}; 
// module.exports = {
//   plugins: [
//     require('autoprefixer'),
//     require('postcss-nested')
//   ]
// }
