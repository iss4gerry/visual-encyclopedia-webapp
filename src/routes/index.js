const express = require('express')
const Router = express.Router()
const imageController = require('../controllers/image-controller')

Router.route('/analyze').post(imageController.imageTracker)

module.exports = Router