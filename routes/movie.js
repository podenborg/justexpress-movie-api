const express = require('express');
const router = express.Router();

const movieDetails = require('../data/movieDetails');

const requireJSON = (req, res, next) => {
  if (!req.is('application/json')) {
    res.json({ msg: 'Content type must be application/json' });
  } else {
    next();
  }
};

/* /movie */
router.get('/top_rated', (req, res) => {
  const results = movieDetails.sort((a, b) => b.vote_average - a.vote_average);
  
  const page = req.query.page || 1;
  const indexToStart = (page - 1) * 20;
  res.json(results.slice(indexToStart, indexToStart + 19));
});

router.get('/:movieId', (req, res) => {
  const movieId = req.params.movieId;
  const results = movieDetails.find(movie => movie.id === Number(movieId));

  if (!results) {
    res.json({ msg: 'movie id was not found' });
  } else {
    res.json(results);
  }
});

router.post('/:movieId/rating', requireJSON, (req, res) => {
  const movieId = req.params.movieId;
  const userRating = req.body.value;

  if (userRating < .5 || userRating > 10) {
    res.json({ msg: 'Rating must be between .5 and 10.' });
  } else {
    res.json({ msg: 'Thank you for submitting your rating.', status_code: 200 });
  }
});

router.delete('/:movieId/rating', requireJSON, (req, res) => {
  res.json({ msg: 'Rating deleted.' });
});

module.exports = router;