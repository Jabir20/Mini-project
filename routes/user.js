var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product-helpers')
const userHelper = require('../helpers/user-helpers');
const { response } = require('../app');
const verifyLogin = (req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}
/* Images */
const banner1 = "/images/banner-image1.jpg"
const banner2 = "/images/banner-image2.jpg"
const banner3 = "/images/banner-image3.jpg"
const banner4 = "/images/banner-image4.jpg"

/* GET home page. */
router.get('/', function (req, res, next) {
  let userSession = req.session.user
  // console.log(userSession);
  productHelper.getAllProducts().then((places) => {
    res.render('user/view-location', { places, banner1, banner2, banner3, banner4, user: true, footer: true, Account: true, userSession });
  })
});
router.get('/login', (req, res) => {
    res.render('user/login', { user: true, "loginErr": req.session.loginErr })
    req.session.loginErr = false
})
router.get('/signup', (req, res) => {
  res.render('user/signup', { user: true })
})
router.get('/back', (req, res) => {
  res.redirect('/')
})
router.post('/signup', (req, res) => {
  userHelper.doSignup(req.body).then((response) => {
    req.session.loggedIn = true
    req.session.user = response
    res.redirect('/') 
  })
})
router.post('/login', (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true
      req.session.user = response.user
      res.redirect('/')
    } else {
      req.session.loginErr = true
      res.redirect('/login')
    }
  })
})
router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})
router.get('/location', verifyLogin, (req, res) => {
  res.render('user/location', { user: true, banner1, banner2, banner3, banner4 })
})

// For testing the search box part
const locations = [
  { name: "Location 1" },
  { name: "Location 2" },
  { name: "Location 3" },
  { name: "Location 3" },
  { name: "Location 3" },
  { name: "Thrissur" },
  { name: "Kollam" },
  { name: "Alappuzha" },
  // Add more location objects here
];
router.get("/search", (req, res) => {
  const searchTerm = req.query.term.toLowerCase();
  const matchingLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchTerm)
  );
  res.json(matchingLocations);
}); 



// 

module.exports = router;
