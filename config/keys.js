// module.exports = {
//   mongoURI: 'mongodb+srv://AndrewAdmin:EHZWsHFTAtknkjeQ@devconnector.bcmoo.mongodb.net/multipurpose?retryWrites=true&w=majority',
//   secretOrKey: 'secret'
// }

// mongodb 
// user - AndrewAdmin
// EHZWsHFTAtknkjeQ

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./keys_prod');
} else {
  module.exports = require('./keys_dev');
}
