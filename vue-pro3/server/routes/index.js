var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.cookies.islogin)
  {
    console.log('cookies:' + req.cookies.islogin);
    req.session.username = req.cookies.islogin;
    res.render('index', { title: req.cookies.islogin});
  }

  if(req.session.username)
  {
    console.log('session:' + req.session.username);
    res.locals.username = req.session.username;
     res.render('index', { title: req.session.username});
  }
  res.render('index', { title: 'Express' });
});

router.get('/api/getData', function(req, res, next) {
  res.json({name:'g321',pwd:'g1345'});
});
router.post('/api/getData', function(req, res, next) {
  res.json({name:'p321',pwd:'p1345',random:Math.random()});
});




module.exports = router;
