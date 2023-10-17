var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let places = [
    {
      location: "Alappuzha",
      desc: "Venice of the east",
      image: "/images/home1.jpg"
    },
    {
      location: "Kochi",
      desc: "Venice of the east",
      image: "/images/home1.jpg"
    },
    {
      location: "Kollam",
      desc: "Venice of the east",
      image: "/images/home1.jpg"
    },
    {
      location: "Thrissur",
      desc: "Venice of the east",
      image: "/images/home1.jpg"
    },
    {
      location: "Malappuram",
      desc: "Venice of the east",
      image: "/images/home1.jpg"
    }
  ]
  res.render('index', { places });
});

module.exports = router;
