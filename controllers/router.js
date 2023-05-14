/*
 * Import Module
 ****************/
const express = require('express'),
  router = express.Router(),
  cors = require('cors')

/*
 * Controller
 *************/
const bakerys = require('./bakerys'),
  blogs = require('./blogs'),
  ratings = require('./ratings'),
  contact = require('./contact'),
  newsletter = require('./newsletter'),
  regions = require('./regions')

/*
 * Router
 ***********/

// Liste des boulangeries
router.route('/bakerys')
  .get(bakerys.get)
router.route('/bakerys-all')
  .get(bakerys.getAll)
router.route('/bakerys-page/:page/:search')
  .get(bakerys.getAllPage)
router.route('/bakerys-page-location/:page/:location')
  .get(bakerys.getAllPage2)
router.route('/bakerys-page-search-location/:page/:search/:location')
  .get(bakerys.getAllPage3)


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

// Régions
router.route('/regions')
  .get(regions.get)

// Code postaux

// on export router pour le récupérer dans ../server.js
module.exports = router;