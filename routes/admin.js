var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')

/* GET users listing. */
router.get('/', function(req, res, next) {

  let products = [    //Created an array to pass products to index.hbs
    {
      name: "iPhone 13",
      category: "Mobile",
      desc: "This is a good phone",
      image: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iphone13_hero_09142021_inline.jpg.slideshow-xlarge_2x.jpg"
    },
    {
      name: "POCO F1",
      category: "Mobile",
      desc: "This is a good phone",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/6/315736858/YB/UG/YJ/9138920/poco-f1-by-xiaomi-128-gb-6-gb-ram-.jpg"
    },
    {
      name: "Oneplus 7T",
      category: "Mobile",
      desc: "This is a good phone",
      image: "https://5.imimg.com/data5/SELLER/Default/2022/3/XW/BW/XG/149641071/new-oneplus-7t-8gb-128gb-glacier-blue.jpg"
    },
    {
      name: "Redmi Note 8",
      category: "Mobile",
      desc: "This is a good phone",
      image: "https://turcolatino.com/wp-content/uploads/2021/05/XIAOMI-REDMI-NOTE-8-64GB-1.jpg"
    }
  ]

  res.render('admin/view-products', {admin:true, products});
});
router.get('/add-product',function(req,res){
  res.render('admin/add-product')
})
router.post('/add-product',(req,res)=>{
  // console.log(req.body)
  // console.log(req.files.Image);
  productHelper.addProduct(req.body,(id)=>{
    console.log(id);
    let image = req.files.Image
    image.mv('./public/product-images/'+id+'.jpg',(err,done)=>{
      if (!err){
        res.render('admin/add-product')
      }
      else{
        console.log(err);
      }
    })
  })

})


module.exports = router;
