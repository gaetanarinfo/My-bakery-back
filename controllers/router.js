/*
 * Import Module
 ****************/
const express = require('express'),
  router = express.Router(),
  multer = require("multer")

/*
 * Controller
 *************/
const bakerys = require('./bakerys'),
  blogs = require('./blogs'),
  ratings = require('./ratings'),
  contact = require('./contact'),
  newsletter = require('./newsletter'),
  favorites = require('./favorites'),
  google_api = require('./apis-google')

/*
 * Router
 ***********/

const storageEngine = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
  },
});

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
      return cb(null, true);
  } else {
      cb("Error: You can Only Upload Images!!");
  }
};

// Liste des boulangeries
router.route('/bakerys/:limite')
  .get(bakerys.get)
router.route('/bakerys-all')
  .get(bakerys.getAll)
router.route('/bakerys-page/:page/:search')
  .get(bakerys.getAllPage)
router.route('/bakerys-page-location/:page/:location')
  .get(bakerys.getAllPage2)
router.route('/bakerys-page-search-location/:page/:search/:location')
  .get(bakerys.getAllPage3)
router.route('/bakery/:url')
  .get(bakerys.getBakery)
router.route('/bakery-comment')
  .post(bakerys.postComment)

// Liste des articles du blog
router.route('/blogs')
  .get(blogs.get)
router.route('/blogs-all')
  .get(blogs.getAll)
router.route('/blogs-page/:page')
  .get(blogs.getAllPage)
router.route('/search/:search')
  .get(blogs.getSearchAll)

// Liste des votes pour My bakery
router.route('/ratings')
  .get(ratings.get)

// Sauvegarde du contact
router.route('/contact')
  .post(contact.post)

// Sauvegarde de la newsletter
router.route('/newsletter')
  .post(newsletter.post)

router.route('/favorites/:favorites')
  .get(favorites.get)

router.route('/google-local/:q')
  .get(google_api.get)

router.route('/google-local-place')
  .get(google_api.getPlace)

router.route('/google-local-photo')
  .get(google_api.postPhoto)


// Code postaux

// on export router pour le récupérer dans ../server.js
module.exports = router;