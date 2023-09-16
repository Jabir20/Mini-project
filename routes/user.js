var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let products = [    //Created an array to pass products to index.hbs
    {
      name: "iPhone 13",
      category: "Mobile",
      desc: "This is a good phone",
      image: "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_09142021_inline.jpg.large.jpg"
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
  res.render('index', { products, user:true }); //user or admin param is just passed to check the if condition to check who logs in and display header accordingly
});

module.exports = router;
