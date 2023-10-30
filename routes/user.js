var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product-helpers')
const userHelper = require('../helpers/user-helpers');
const { response } = require('../app');
const { log } = require('handlebars');
const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next()
  } else {
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
  userHelper.getThreeProducts().then((places) => {
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


// // For testing the search box part

// const places = [
//   { name: "Location 1" },
//   { name: "Location 2" },
//   { name: "Location 3" },
//   { name: "Location 3" },
//   { name: "Location 3" },
//   { name: "Thrissur" },
//   { name: "Kollam" },
//   { name: "Alappuzha" },
//   // Add more location objects here
// ];
router.get("/search", async (req, res) => {
  const searchTerm = req.query.term.toLowerCase();
  await userHelper.searchPlaces().then((response) => {
    // console.log(response);
    // console.log(searchTerm);
    const matchingLocations = response.filter((location) =>
      location.Name.toLowerCase().includes(searchTerm)
    );
    // console.log(matchingLocations);
    res.json(matchingLocations);
  })
});

//

// router.get('/location', async (req, res) => {
//   const id = req.query.id
//   // const name = req.query.name
//   // console.log(req.session.user);
//   // checkWeather(name)
//   await userHelper.viewLocation(id).then((location) => {
//     console.log(response);
//     res.render('user/location', { user: true, Account: true, location, userSession: req.session.user })
//   })
// })

// Move the checkWeather function inside the route handler
router.get('/location', async (req, res) => {
  const id = req.query.id;
  const name = req.query.name;

  try {
    // Fetch the weather data and location details concurrently
    const [weatherData, location] = await Promise.all([
      userHelper.checkWeather(name),
      userHelper.viewLocation(id),
    ]);
    console.log("weatherData",weatherData);
    // Render the view after you have both weather data and location details
    res.render('user/location', { user: true, Account: true, location, userSession: req.session.user, weatherData });
  } catch (error) {
    // Handle errors appropriately
    res.status(500).send('Error fetching data.');
  }
});


module.exports = router;
