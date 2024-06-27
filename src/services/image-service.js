const { GoogleGenerativeAI } = require('@google/generative-ai')
const apiKey = 'AIzaSyBW6z7thdF4KjMOyO4NU8DiRrk-fbP__Rg'
const genAi = new GoogleGenerativeAI(apiKey)


const imageTracker = (image) => {
    return new Promise((resolve, reject) => {
        if(!image) {
            reject(new Error('no image provided'))
        }else{
            const data = {
                inlineData: image
            }

            const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" })
            const prompt = `What's picture is this? 
            send response with json like bellow 
            {
                "information": {picture_information}
            }
            `

            return model.generateContent([prompt, data])
                .then(result => result.response)
                .then(response => response.text())
                .then(text => resolve(text))
                .catch(err => reject(err))
        }
    })
}

module.exports = {
    imageTracker
}