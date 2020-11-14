const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const app = express();

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');
const posts = require('./routes/api/posts');

// Body parser config
// urlencoded changes special chars in the route (such as ?, &) 
// means it encodes special chars so JS doesn't get confused.
// { extended: false } indicates to use default encoding methods, not custom ones

app.use(bodyparser.urlencoded({ extended: false }));
// converts incoming data into json format:
app.use(bodyparser.json());

// DB config
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Everything is fine, no problems'));
app.use('/api/users', users);
app.use('/api/profiles', profiles);
app.use('/api/posts', posts);

const port = 9000;
app.listen(port, () => console.log(`Server running on port ${port}`));

// remote.origin.url=https://github.com/cloudobserver/devconnector.git
