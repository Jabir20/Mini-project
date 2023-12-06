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
const banner5 = "/images/banner-image5.jpg"
const banner6 = "/images/banner-image6.jpg"
const bgimage = "/images/bgimage.jpg"
const image1 = "/images/image1.jpg"
const image2 = "/images/image2.jpg"
const image3 = "/images/image3.jpg"
const image4 = "/images/image4.jpg"
const iosBadge = "/images/AppBadge__ios.png"
const androidBadge = "/images/AppBadge__android.png"
const apppromo = "/images/apppromo.png"
const comingSoon = "/images/coming-soon.png"
const upArrow = "/images/up-arrow.png"
const showSearch = true

/* GET home page. */
router.get('/', function (req, res, next) {
  let userSession = req.session.user
  // console.log(userSession);
  userHelper.getThreeProducts().then((places) => {
    res.render('user/view-location', { places, showSearch, banner1, banner2, banner3, banner4, banner5, banner6, bgimage, image1, image2, image3, image4, comingSoon, iosBadge, androidBadge, apppromo, upArrow, user: true, footer: true, Account: true, userSession });
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
router.post('/signup', async (req, res) => {
  try {
    const response = await userHelper.doSignup(req.body);
    req.session.loggedIn = true;
    req.session.user = response;
    res.redirect('/');
  } catch (error) {
    // Handle the specific error when the email already exists
    if (error === 'Email ID already exists.') {
      res.render('user/signup', { emailError: 'Email ID already exists. Please use a different email.' });
    } else {
      // Handle other errors (e.g., database error)
      console.error('Signup error:', error);
      res.status(500).send('Error during signup. Please try again.');
    }
  }
});
router.post('/login', (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      if (response.user.isFrozen) {
        // User account is frozen, render a page with a message
        res.render('user/account-restricted', {user:true, message: 'Access to your account is restricted due to a violation of Privacy Policy.' });
      } else {
        req.session.loggedIn = true
        req.session.user = response.user
        res.redirect('/')
      }
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
    // if (matchingLocations === null || (Array.isArray(matchingLocations) && matchingLocations.length === 0))
    //   console.log('erorr');
    console.log(matchingLocations);
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
      userHelper.checkWeather(name, res),
      userHelper.viewLocation(id),
    ]);

    // Check if location details are not found
    if (!location) {
      // Handle the case where the location is not found
      return res.status(404).render('error', { message: 'Location not found' });
    }

    // Render the view after you have both weather data and location details
    const activityType = ['Clear', 'Rainy', 'Windy'];
    res.render('user/location', { user: true, Account: true, showSearch, location, userSession: req.session.user, weatherData, activityType });
  } catch (error) {
    // Handle other errors appropriately
    console.error('Error fetching data:', error);
    res.status(500).render('error', { message: 'Error fetching data' });
  }
});


router.get('/all-places', verifyLogin, (req, res) => {
  let userSession = req.session.user
  userHelper.getAllProducts().then((places) => {
    res.render('user/all-places', { places, user: true, footer: true, Account: true, userSession });
  })
})

router.get('/feedback', verifyLogin, (req, res) => {
  let userSession = req.session.user
  res.render('user/feedback', { user: true, Account: true, footer: true, userSession })
})
router.get('/suggestion', verifyLogin, (req, res) => {
  let userSession = req.session.user
  res.render('user/suggestion', { user: true, Account: true, footer: true, userSession })
})

router.post('/feedback', (req, res) => {
  // console.log(req.session.user.Name);
  // console.log(req.session.user.Email);
  // console.log(req.body);
  const user = req.session.user.Email
  const feedback = req.body.feedback
  userHelper.storeFeedback(user, feedback).then((response => {
    console.log(response);
  }))
})



router.post('/suggestion', (req, res) => {
  const user = req.session.user.Email
  const location = req.body.location
  const suggestion = req.body.suggestion
  userHelper.storeSuggestion(user, location, suggestion).then((response => {
    console.log(response);
    res.json({ success: true, message: "Suggestion sent successfully" });
  }))
})

router.get("/search-locations", async (req, res) => {
  const searchTerm = req.query.term.toLowerCase();
  try {
    const locations = await userHelper.searchPlaces2();
    const matchingLocations = locations.filter((location) =>
      location.Name.toLowerCase().includes(searchTerm)
    );
    const filteredLocations = matchingLocations.map(({ Name, Description, _id }) => ({
      Name,
      Description,
      _id
    }));
    console.log(filteredLocations);
    res.json(filteredLocations);
  } catch (error) {
    console.error('Error searching locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
