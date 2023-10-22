var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product-helpers')
const userHelper = require('../helpers/user-helpers');
const { response } = require('../app');

/* GET home page. */
router.get('/', function (req, res, next) {
  const banner = "/images/banner.jpg"
  productHelper.getAllProducts().then((places) => {

    res.render('user/view-location', { places, banner, user: true, footer:true, Account: true});
  })
});
router.get('/login', (req, res) => {
  res.render('user/login', { user: true})
})
router.get('/signup', (req, res) => {
  res.render('user/signup', { user: true})
})
router.get('/back', (req, res) => {
  res.redirect('/')
})
router.post('/signup',(req,res)=>{
  userHelper.doSignup(req.body).then((response)=>{
    console.log(response);
  })
})
router.post('/login',(req,res)=>{
  userHelper.doLogin(req.body).then((response)=>{
    if(response.status){
      res.redirect('/')
    }else{
      res.redirect('/login')
    }
  })
})



module.exports = router;
