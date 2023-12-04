var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product-helpers')
/* GET users listing. */
router.get('/', function (req, res, next) {
  productHelper.getAllProducts().then((places) => {

    res.render('admin/view-locations', { places, admin: true })
  })
});

router.get('/add-location', (req, res) => {
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
  productHelper.updateLocation(locationId, req.body).then(()=>{
    if (req.files && req.files.Image) {
      let image = req.files.Image
      res.redirect('/admin')
      image.mv('./public/location-images/' + locationId + '.jpg')
    }else{
      res.redirect('/admin')
    }
  })
})

router.get('/view-feedback', (req, res) => {
  productHelper.getAllFeedbacks().then((feedbacks) => {
    console.log(feedbacks);
    res.render('admin/view-feedback', { feedbacks, admin: true })
  })
});

router.get('/view-suggestion', (req, res) => {
  productHelper.getAllSuggestions().then((suggestions) => {
    console.log(suggestions);
    res.render('admin/view-suggestion', { suggestions, admin: true })
  })
});

module.exports = router;
