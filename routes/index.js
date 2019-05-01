var express = require('express');
var router = express.Router();

// GET index.ejs
router.get('/', function (req, res, next) {
  res.render('index', { page: 'Home', menuId: 'home' });
});

// GET challenges.ejs
router.get('/challenges', function (req, res, next) {
  res.render('challenges', { page: 'Challenges', menuId: 'challenges' });
});

// GET challenges.ejs
router.get('/usePoints', function (req, res, next) {
  res.render('usePoints', { page: 'Use Points', menuId: 'usePoints' });
});

// GET challenges.ejs
router.get('/videoResources', function (req, res, next) {
  res.render('videoResources', { page: 'Video Resources', menuId: 'videoResources' });
});

// GET challenges.ejs
router.get('/extraIdeas', function (req, res, next) {
  res.render('extraIdeas', { page: 'Extra Ideas', menuId: 'extraIdeas' });
});

module.exports = router;
