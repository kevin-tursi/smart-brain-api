const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  ssl: { rejectUnathorized: false }
});

const register = require('./controllers/register'); 
const signin = require('./controllers/signin');
const getProfile = require('./controllers/getprofile');
const image = require('./controllers/image');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// SHOWS PORT IS CONNECTED
app.get('/', (req, res) => { res.send('success') });


// SIGN IN
app.post('/signin', (req, res) => { signin.handleSignin(req, res, knex, bcrypt) })

// REGISTER
app.post('/register', (req, res) => { register.handleRegister(req, res, knex, bcrypt) })

// GET user by profile
app.get('/profile/:id', (req, res) => { getProfile.handleGetProfile(req, res, knex) })

// SUBMITTING IMAGE AND INCREASING ENTRIES COUNT BY ONE
app.put('/image', (req, res) => { image.handleImage(req, res, knex) })

//SUBMITTING IMAGE URL
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


// ROOT 
app.listen(process.env.PORT || 3001, () => {
    console.log(`Your app is listening on port ${process.env.PORT}`);
});
