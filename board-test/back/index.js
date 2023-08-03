const express = require('express');
const app = express();
const port = 3000;


require('dotenv').config()

app.use('/api/members', require('./memberapi.js'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))
app.use('/api/boards', require('./authmiddleware.js'));
app.use('/api/boards', require('./boardapi'));

app.use( (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});


app.listen(port, () => {
	console.log('Listening...');
});