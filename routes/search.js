var express = require('express');
var router = express.Router();

const movies = require('../data/movies');
const people = require('../data/people');

router.use((req, res, next) => {
  res.locals.searchTerm = req.query.query;

  if (!res.locals.searchTerm) {
    res.json({ msg: 'A search query is required!' });
  } else {
    next();
  }
});

/* GET home page. */
router.get('/movie', function(req, res, next) {
  const results = movies.filter(movie => {
    return movie.overview.toLowerCase().includes(res.locals.searchTerm.toLowerCase());
  });
  res.json({results});
});

router.get('/person', function(req, res, next) {
  const results = people.filter(person => {
    return person.name.toLowerCase().includes(res.locals.searchTerm.toLowerCase());
  });
  res.json({results});
});

module.exports = router;
