const express = require('express');
const mongoose = require('mongoose');
const app = express();


// DB config
const db = require('./config/keys').mongoURI;
mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

//  First route
app.get('/', (req, res) => res.send('Salutations to the World!' )); 
const port = 9000;
app.listen(port, () => console.log(`Server running on port ${port}` ));

// remote.origin.url=https://github.com/cloudobserver/devconnector.git