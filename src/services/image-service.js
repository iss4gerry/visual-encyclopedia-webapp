const { GoogleGenerativeAI } = require('@google/generative-ai')
const apiKey = 'AIzaSyBW6z7thdF4KjMOyO4NU8DiRrk-fbP__Rg'
const genAi = new GoogleGenerativeAI(apiKey)

const imageTracker = (image) => {
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
                "information": "{picture_information}"
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