const bcryptjs = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email}).then(user => {
    if(!user){
      return res.redirect('/signup');
    }
    bcryptjs.compare(password, user.password).then(onMatch => {
      if(onMatch){
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(() => {
          res.redirect('/');
        })
      }
      res.redirect('/login');
    }).catch(err => {
      res.redirect('/login');
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  })
}

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email}).then(user => {
    if(user) {
      return res.redirect('/signup');
    };
    return bcryptjs.hash(password, 12).then(bcrypted => {
      const newUser = new User({
        email: email,
        password: bcrypted,
        card: {items: []}
      });
      return newUser.save();
  })
  }).then(result => {
    res.redirect('/login');
  }).catch(err => {
    console.log(err);
  })
}