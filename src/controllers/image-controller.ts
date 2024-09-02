import { Request, Response } from "express"
import httpStatus from "http-status"
import { UserRequest } from "../models/image-model"
import imageService from "../services/image-service"

const imageTracker = async (req: Request, res: Response) => {
    try {
        const request: UserRequest = req.body as UserRequest
        const result = await imageService.imageTracker(request.base64Image, request.language)
        res.status(200).send({
            status: httpStatus.OK,
            message: 'Success',
            data: result
        })

    } catch (err) {
        res.status(500).send({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message: 'Error'
        })

    }
}

export default { 
    imageTracker
}