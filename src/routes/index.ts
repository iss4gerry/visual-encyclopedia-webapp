import express from 'express'
import imageController from '../controllers/image-controller'

const Router = express.Router()

Router.route('/analyze').post(imageController.imageTracker)

export default Router
