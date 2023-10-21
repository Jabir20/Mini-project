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

module.exports = router;
