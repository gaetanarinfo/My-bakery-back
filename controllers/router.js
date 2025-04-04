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
  footer = require('./footer'),
  products = require('./products'),
  credits = require('./credits'),
  paypal = require('./paypal'),
  banners = require('./campaign'),
  sitemap = require('./sitemap'),
  mollie = require('./mollie'),
  multer = require("multer");

/*
 * Router
 ***********/

// set up storage
const storage = multer.diskStorage({
  destination: __dirname + process.env.DIR_BAKERY_STORAGE,
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

const storage2 = multer.diskStorage({
  destination: __dirname + process.env.DIR_BANNER_STORAGE,
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

const storage3 = multer.diskStorage({
  destination: __dirname + process.env.DIR_USER_STORAGE,
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

const upload2 = multer({
  storage: storage2,
  limits: {
    fileSize: 1684688109387, // 150 KB for a 1080x1080 JPG 90
  },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  }
})

const upload3 = multer({
  storage: storage3,
  limits: {
    fileSize: 1684688109387, // 150 KB for a 1080x1080 JPG 90
  },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  }
})

function checkFileType (file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
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

router.route('/')
  .get(function (req, res) {
    res.redirect('https://my-bakery.fr');
  })

// Liste des boulangeries
router.route('/bakerys/:limite')
  .get(bakerys.get)
router.route('/bakerys-all')
  .get(bakerys.getAll)
router.route('/bakerys-pagination/:page')
  .get(bakerys.getAllPagePagination)
router.route('/bakerys-page-search')
  .post(bakerys.getAllPage)
router.route('/bakery/:url')
  .get(bakerys.getBakery)
router.route('/bakery-comment')
  .post(bakerys.postComment)
router.route('/add-bakery')
  .post(upload.array('file', 4), bakerys.postAddBakery)
router.route('/bakery-update')
  .post(bakerys.updateView)
router.route('/update-bakery')
  .post(upload.array('file', 4), bakerys.updateBakery)
router.route('/bakery-click')
  .post(bakerys.addClick)
router.route('/bakerys-list')
  .get(bakerys.bakerysList)
router.route('/list-search-bakery/:search')
  .get(bakerys.bakerysListSearch)
router.route('/list-search-bakery-clear')
  .get(bakerys.bakerysListSearchClear)
router.route('/bakery-search-place')
  .post(bakerys.searchPlace)

// ---> Admin
router.route('/bakerys-admin/:email')
  .get(bakerys.getBakerysAdmin)
router.route('/bakerys-admin-update')
  .post(bakerys.updateBakeryAdmin)

// Liste des articles du blog
router.route('/blogs/:url')
  .get(blogs.getBlog)
router.route('/blogs')
  .get(blogs.get)
router.route('/blogs-all')
  .get(blogs.getAll)
router.route('/blogs-page/:page')
  .get(blogs.getAllPage)
router.route('/blogs-page-search')
  .post(blogs.getSearchAll)
router.route('/blogs-categories')
  .get(blogs.getCategories)
router.route('/blogs-all-views')
  .get(blogs.getBlogsViews)

// Liste des votes pour My bakery
router.route('/ratings')
  .get(ratings.get)

// Sauvegarde du contact
router.route('/contact')
  .post(contact.post)

// Sauvegarde de la newsletter
router.route('/newsletter')
  .post(newsletter.post)
router.route('/newsletter-send/:methode/:email')
  .get(newsletter.send)
router.route('/newsletter-admin/:email')
  .get(newsletter.get)
router.route('/newsletter-unsubscribe/:id')
  .get(newsletter.unsubsribe)

router.route('/favorites/:favorites')
  .get(favorites.get)

// Google
// router.route('/villes-france')
//   .get(google_api.getAllCity)
// router.route('/google-local/:q')
//   .get(google_api.get)
router.route('/google-local-place')
  .get(google_api.getPlace)
// router.route('/update-all-bakery')
//   .get(google_api.updateBakery)
// router.route('/auth/google/:plateforme')
//   .get(google_api.redirect)
// router.route('/auth/google-call/callback/:plateforme')
//   .get(google_api.callback)
// router.route('/auth/google/validate')
//   .post(google_api.validate)


// My account 
router.route('/register')
  .post(account.create)
router.route('/activate-account/:token')
  .get(account.activate)
router.route('/login')
  .post(account.login)
router.route('/authenticate/:token')
  .get(account.verification)
router.route('/forgot-password')
  .post(account.forgot)
router.route('/forgot-password-token')
  .post(account.tokenForgot)
router.route('/forgot-verif-password-token/:token')
  .get(account.tokenVerifForgot)
router.route('/user-profil/:email')
  .get(account.userInfo)
router.route('/user-activity/:email/:id')
  .get(account.userActivity)
router.route('/user-delete/:email/:id')
  .get(account.userDelete)
router.route('/user-activity-delete/:email/:id')
  .get(account.userActivityDelete)
router.route('/user-orders/:email/:id/:years')
  .get(account.userOrders)
router.route('/order-show/:paiementId')
  .get(account.orderShow)
router.route('/user-budgets/:year')
  .get(account.userBudget)
router.route('/user-bakery/:email/:id')
  .get(account.userBakery)
router.route('/user-establishement-delete')
  .post(account.userEstablishementDelete)
router.route('/user-establishement/:year/:bakeryId')
  .get(account.userEstablishement)
router.route('/user-banners/:email/:id')
  .get(account.userBanners)
router.route('/user-banner/:year/:bannerId')
  .get(account.userBanner)
router.route('/update-profil-picture')
  .post(upload3.array('file', 1), account.userUpdatePicture)
router.route('/update-profil')
  .post(account.userUpdate)

// Footer
router.route('/villes-france-home/:limit')
  .get(footer.villesFrance)

// Bakerys Department
router.route('/bakerys-markers/:ville/:id')
  .get(bakerys.bakerysMarkers)
router.route('/bakerys-markers-home/:lat/:lng')
  .get(bakerys.bakerysMarkersHome)

// Banner
router.route('/bakery-banner-events')
  .get(bakerys.bakeryEventsBanner)
router.route('/add-banner')
  .post(upload2.array('file', 2), bakerys.addBannerEvent)

// Products
router.route('/products')
  .get(products.allProducts)
router.route('/products-cart/:cart')
  .get(products.productsCart)

// Credits
router.route('/credits')
  .post(credits.allCredits)
router.route('/credits-debit')
  .post(credits.debitCredits)
router.route('/credits-debit-validate')
  .post(credits.deitCreditsValidate)

// Paypal
router.route('/order-insert')
  .post(paypal.orderInsert)
router.route('/paypal/create/:orderId')
  .get(paypal.create);
router.route('/order-validate/:orderId')
  .get(paypal.succes)
router.route('/order-cancel/:orderId')
  .get(paypal.cancel)
router.route('/order-refund')
  .post(paypal.refund)

// Mobilie
router.route('/order-insert-mobilie')
  .post(mollie.orderInsert)
router.route('/mobilie/create/:orderId')
  .get(mollie.create)
router.route('/order-validate-mobilie/:orderId')
  .get(mollie.succes)
router.route('/order-validate-mobilie/:orderId')
  .get(mollie.cancel)
router.route('/order-refund-mobilie')
  .post(mollie.refund)

// Banner
router.route('/banner')
  .get(banners.firstBanner)
router.route('/banner-add-click')
  .post(banners.addclick)
router.route('/banner-add-views')
  .post(banners.addViews)

// SiteMap
router.route('/sitemap')
  .get(sitemap.get)

// on export router pour le récupérer dans ../server.js
module.exports = router;
