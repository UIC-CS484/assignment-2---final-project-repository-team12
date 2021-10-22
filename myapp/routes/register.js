var express = require('express');
var router = express.Router();


/* GET create account page. */
router.get('/', function(req, res, next) {
  res.setHeader("Content-Type", "text/html")
  res.render('register', { title: 'register' });
});

module.exports = router;

