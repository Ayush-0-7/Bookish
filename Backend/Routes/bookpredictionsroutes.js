const express = require('express');
const predict = require('../controllers/predict');
const book_names = require('../controllers/book_names');
const router = express.Router();

router.route('/predict').post(predict);
router.route('/booknames').get(book_names);
module.exports = router;