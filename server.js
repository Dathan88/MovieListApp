const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const movies = require('./routes/api/movies');

const app = express();

// BODYPARSER MIDDLEWARE
app.use(bodyParser.json());

// DB CONFIG
const db = require('./config/keys').mongoURI;

// CONNECT TO MONGO
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB Connected...'))
	.catch(err => console.log(err));

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/', (req, res) => {
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/', (req, res) => {
	res.send('Hello');
});

// USE ROUTES
app.use('/api/movies', movies);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
