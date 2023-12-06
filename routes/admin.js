var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product-helpers')
const verifyLogin = (req, res, next) => {
  if (req.session.login) {
    next()
  } else {
    res.redirect('/admin')
  }
}
router.post('/login', (req, res) => {
  productHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.login = true
      req.session.admin = response.admin
      productHelper.getAllProducts().then((places) => {

        res.render('admin/view-locations', { places, admin: true })
      })
      // res.render('admin/view-locations')
    } else {
      req.session.loginErr = true
      res.redirect('/login')
    }
  })
})
/* GET users listing. */
router.get('/all-locations', verifyLogin, function (req, res, next) {
  productHelper.getAllProducts().then((places) => {

    res.redirect('admin/view-locations', { places, admin: true })
  })
});

router.get('/', (req, res, next) => {
  res.render('admin/login', { admin: true })
})

router.get('/add-location', verifyLogin, (req, res) => {
  res.render('admin/add-location')
});

router.post('/add-location', (req, res) => {
  productHelper.addProduct(req.body, (id) => {
    let image = req.files.Image
    image.mv('./public/location-images/' + id + '.jpg', (err) => {
      if (!err)
        res.render('admin/add-location')
      else
        console.log(err);
    })
  })
})
router.get('/delete-location', (req, res) => {
  let locationId = req.query.id
  productHelper.deleteLocation(locationId).then((response) => {
    res.redirect('/admin')
  })
})
router.get('/edit-location', async (req, res) => {
  let locationId = req.query.id
  let location = await productHelper.getProduct(locationId)
  console.log(location);
  res.render('admin/edit-location', { location })
})
router.post('/edit-location', (req, res) => {
  let locationId = req.query.id
  productHelper.updateLocation(locationId, req.body).then(() => {
    if (req.files && req.files.Image) {
      let image = req.files.Image
      res.redirect('/admin')
      image.mv('./public/location-images/' + locationId + '.jpg')
    } else {
      res.redirect('/admin')
    }
  })
})

router.get('/view-feedback', verifyLogin, (req, res) => {
  productHelper.getAllFeedbacks().then((feedbacks) => {
    console.log(feedbacks);
    res.render('admin/view-feedback', { feedbacks, admin: true })
  })
});

router.get('/view-suggestion', verifyLogin, (req, res) => {
  productHelper.getAllSuggestions().then((suggestions) => {
    console.log(suggestions);
    res.render('admin/view-suggestion', { suggestions, admin: true })
  })
});

module.exports = router;
