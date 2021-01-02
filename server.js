const express = require('express');
const port = process.env.PORT || 8285;
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const path = require('path');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts')

// 'urlencoded' changes special chars 
// in route (such as ?, &) so JS doesn't get confused.
// { extended: false } indicates to use default encoding 
// methods, not custom ones
app.use(express.urlencoded({ extended: false }));
// converts incoming data to json format:
app.use(express.json());

app.use(passport.initialize());

// weird syntax - simply executes function in passport.js:
// (not saving in var because don't need it again)
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

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
} else {
  app.get(
    '/',
    (req, res) => res.send('Running in development mode')
  );
}

app.listen(
  port,
  () => console.log(`Server running on port ${port}`)
);
