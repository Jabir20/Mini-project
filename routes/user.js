var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product-helpers')

/* GET home page. */
router.get('/', function (req, res, next) {
  const banner = "/images/banner.jpg"
  productHelper.getAllProducts().then((places) => {

    res.render('user/view-location', { places, banner, user: true, footer:true, Account: true});
  })
});
router.get('/login', (req, res) => {
  res.render('login', { user: true})
})
router.get('/signup', (req, res) => {
  res.render('signup', { user: true})
})
router.get('/back', (req, res) => {
  res.redirect('/')
})
module.exports = router;
