const httpStatus = require('http-status')
const imageService = require('../services/image-service')

const imageTracker = async (req, res) => {
    imageService.imageTracker(req.body.image)
        .then(result => {
            res.status(httpStatus.OK).send({
                status: httpStatus.OK,
                message: 'Success',
                data: result
            })
        })
        .catch(err => {
            res.status(httpStatus.OK).send({
                status: httpStatus.OK,
                message: err.message
            })
        })
}

module.exports = {
    imageTracker
}