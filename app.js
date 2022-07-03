const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const passportSetup = require('./config/passport-setup');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = 'mongodb+srv://heemanth:himmu1801@cluster0.lp2xemd.mongodb.net/Heemanth?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));


app.use(passport.initialize());
app.use(passport.session());




// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});






/*
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});
*/



// auth routes
app.use('/auth',authRoutes);
app.use('/profile',profileRoutes);










// blog routes
app.use('/blogs', blogRoutes);


// routes
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});



// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});