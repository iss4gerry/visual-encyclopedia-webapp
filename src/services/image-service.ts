require('dotenv').config()
import { GoogleGenerativeAI } from '@google/generative-ai'
const apiKey: string = process.env.GEMINI_KEY!
const genAi = new GoogleGenerativeAI(apiKey)

export interface ImageTrackerResult {
    information: string
    history: string
}

// const imageTracker = async (image: any, language: string): Promise<ImageTrackerResult> => {

//     if(!image) {
//         throw new Error('no image provided')
//     }
//     const data = {
//         inlineData: {
//             data: image,
//             mimeType: 'image/jpeg'
//         }
//     }

//     const model = genAi.getGenerativeModel({ model: 'gemini-1.5-flash' })
//     const prompt: string = `What's picture is this?  
//             send response with string like bellow. your entire response/output is going to consist of a single string object {}, and you will NOT wrap it within JSON md markers
//             {
//                 "information": "{picture_information_please send as long as possible_send in ${language}}",
//                 "history": "{picture_history_please send as long as possible_send in ${language}}"
//             }
//             `
//     const result = await model.generateContent([prompt, data])
//     const response = await result.response.text()
//     const stringResponse = JSON.parse(response)
//     return stringResponse
// }

const imageTracker = (image: string, language:string): Promise<ImageTrackerResult> => {
    return new Promise((resolve, reject) => {
        if(!image) {
            reject(new Error('no image provided'))
        }else{
            const data = {
                inlineData: {
                    data: image,
                    mimeType: 'image/jpeg'
                }
            }

            const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" })
            const prompt: string = `What's picture is this?  
            send response with string like bellow. your entire response/output is going to consist of a single string object {}, and you will NOT wrap it within JSON md markers
            {
                "information": "{picture_information_please send as long as possible_send in ${language}}",
                "history": "{picture_history_please send as long as possible_send in ${language}}"
            }
            `
            return model.generateContent([prompt, data])
                .then(result => result.response.text())
                .then(result => resolve(JSON.parse(result)))
                .catch(err => reject(err))
        }
    })
}

export default {
    imageTracker
}