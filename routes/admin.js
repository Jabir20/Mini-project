var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers');
const { response } = require('../app');
/* GET users listing. */
router.get('/', function (req, res, next) {
  productHelper.getAllProduct().then((products) => {
    // console.log(products)
    res.render('admin/view-products', { admin: true, products });
  })




  // This is removed becauses we are going to use the datas directly from database
  // --------------------------------------------------------------------------------------------------------------------------------
  // let products = [    //Created an array to pass products to index.hbs
  //   {
  //     name: "iPhone 13",
  //     category: "Mobile",
  //     desc: "This is a good phone",
  //     image: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone13_hero_09142021_inline.jpg.slideshow-xlarge_2x.jpg"
  //   },
  //   {
  //     name: "POCO F1",
  //     category: "Mobile",
  //     desc: "This is a good phone",
  //     image: "https://5.imimg.com/data5/SELLER/Default/2023/6/315736858/YB/UG/YJ/9138920/poco-f1-by-xiaomi-128-gb-6-gb-ram-.jpg"
  //   },
  //   {
  //     name: "Oneplus 7T",
  //     category: "Mobile",
  //     desc: "This is a good phone",
  //     image: "https://5.imimg.com/data5/SELLER/Default/2022/3/XW/BW/XG/149641071/new-oneplus-7t-8gb-128gb-glacier-blue.jpg"
  //   },
  //   {
  //     name: "Redmi Note 8",
  //     category: "Mobile",
  //     desc: "This is a good phone",
  //     image: "https://turcolatino.com/wp-content/uploads/2021/05/XIAOMI-REDMI-NOTE-8-64GB-1.jpg"
  //   }
  // ]
  // --------------------------------------------------------------------------------------------------------------------------------

});

router.get('/add-product', function (req, res) {
  let value = true
  res.render('admin/add-product', { admin: true, value })
})

router.post('/add-product', (req, res) => {
  // console.log(req.body)
  // console.log(req.files.Image);
  productHelper.addProduct(req.body, (id) => {
    console.log(id);
    let image = req.files.Image
    image.mv('./public/product-images/' + id + '.jpg', (err, done) => {
      if (!err) {

        res.render('admin/add-product')
        // -----If you want to render the view product page with newly added product use this code ---------
        // productHelper.getAllProduct().then((products) => {
        //   // console.log(products)
        //   res.render('admin/view-products', { admin: true, products });
        // })
        // ----------- If you want to render the same add-product page with a successfull msg use this code -----------
        // res.render('admin/view-products', { admin: true, successMessage: 'Product added successfully' })
      }
      else {
        console.log(err);
      }
    })
  })

})
router.get('/products', function (req, res) {
  res.redirect('/admin')
})

// either we can use this way
router.get('/delete-product/:id', (req, res) => {
  let productId = req.params.id
  console.log(productId);
  productHelper.deleteProduct(productId).then((response) => {
    res.redirect('/admin')
  })
})
// or we can use by this method
// router.get('/delete-product',(req,res)=>{
//   let productId = req.query.id
//   console.log(productId);
// })


module.exports = router;
