const express = require('express');
const port = process.env.PORT || 8285;
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts')

// 'urlencoded' changes special chars 
// in the route (such as ?, &) so JS doesn't get confused.
// { extended: false } indicates to use default encoding 
// methods, not custom ones
app.use(express.urlencoded({ extended: false }));
// converts incoming data to json format:
app.use(express.json());

app.use(passport.initialize());

// weird syntax - simply executes function in passport.js:
// (not saving in variable because don't need it again)
// just tells passport where things are
require('./config/passport')(passport);

// DB config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get(
  '/',
  (req, res) => res.send('Everything is fine, no problems')
);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

app.listen(
  port,
  () => console.log(`Server running on port ${port}`)
);
