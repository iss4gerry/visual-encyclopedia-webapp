const { GoogleGenerativeAI } = require('@google/generative-ai')
require('dotenv').config()
const apiKey = process.env.GEMINI_KEY
const genAi = new GoogleGenerativeAI(apiKey)

const imageTracker = (image, language) => {
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
            const prompt = `What's picture is this?  
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

module.exports = {
    imageTracker
}