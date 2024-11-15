/*
 * Import Module
 ****************/
const express = require('express'),
  router = express.Router(),
  path = require('path')

/*
 * Controller
 *************/
const bakerys = require('./bakerys'),
  blogs = require('./blogs'),
  ratings = require('./ratings'),
  contact = require('./contact'),
  newsletter = require('./newsletter'),
  favorites = require('./favorites'),
  google_api = require('./apis-google'),
  account = require('./account'),
  multer = require("multer");

/*
 * Router
 ***********/

// Middlewar login

// set up storage
const storage = multer.diskStorage({
  destination: __dirname + process.env.DIR_BAKERY_STORAGE,
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

// a method we'll use to parse the incoming multipart FormData
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1684688109387, // 150 KB for a 1080x1080 JPG 90
  },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  }
})

function checkFileType (file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}

// Liste des boulangeries
router.route('/bakerys/:limite')
  .get(bakerys.get)
router.route('/bakerys-all')
  .get(bakerys.getAll)
router.route('/bakerys-pagination/:page')
  .get(bakerys.getAllPagePagination)
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
router.route('/add-bakery')
  .post(upload.array('file', 4), bakerys.postAddBakery)
router.route('/bakery-update/:url')
  .get(bakerys.updateView)
router.route('/update-bakery')
  .post(upload.array('file', 4), bakerys.updateBakery)

// Liste des articles du blog
router.route('/blogs/:url')
  .get(blogs.getBlog)
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

router.route('/villes-france')
  .get(google_api.getAllCity)
router.route('/google-local/:q')
  .get(google_api.get)
router.route('/google-local-place')
  .get(google_api.getPlace)

// My account 
router.route('/register')
  .post(account.create)
router.route('/activate-account/:token')
  .get(account.activate)
router.route('/login')
  .post(account.login)
router.route('/authenticate/:token')
  .get(account.verification)
router.route('/forgot-password/:token?')
  .post(account.forgot)
router.route('/forgot-password-token/:token')
  .get(account.tokenForgot)
router.route('/user-profil/:email')
  .get(account.userInfo)
router.route('/user-activity/:email/:id')
  .get(account.userActivity)

// on export router pour le récupérer dans ../server.js
module.exports = router;