const express = require('express');
const predict = require('../api/predict');
const book_names = require('../api/book_names');
const router = express.Router();

router.route('/predict').post(predict);
router.route('/booknames').get(book_names);
module.exports = router;