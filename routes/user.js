var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product-helpers')
const userHelper = require('../helpers/user-helpers');
const { response } = require('../app');

/* Images */
const banner1 = "/images/banner-image1.jpg"
const banner2 = "/images/banner-image2.jpg"
const banner3 = "/images/banner-image3.jpg"
const banner4 = "/images/banner-image4.jpg"

/* GET home page. */
router.get('/', function (req, res, next) {
  let userSession = req.session.user
  console.log(userSession);
  productHelper.getAllProducts().then((places) => {
    res.render('user/view-location', { places, banner1, banner2, banner3, banner4, user: true, footer: true, Account: true, userSession });
  })
});
router.get('/login', (req, res) => {
  res.render('user/login', { user: true })
})
router.get('/signup', (req, res) => {
  res.render('user/signup', { user: true })
})
router.get('/back', (req, res) => {
  res.redirect('/')
})
router.post('/signup', (req, res) => {
  userHelper.doSignup(req.body).then((response) => {
    console.log(response);
  })
})
router.post('/login', (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      res.redirect('/login')
    }
  })
})
router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})
router.get('/location', (req, res) => {
  res.render('user/location', { user: true, banner1, banner2, banner3, banner4 })
})


module.exports = router;
