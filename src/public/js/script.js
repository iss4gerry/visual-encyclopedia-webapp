function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const imageFile = document.getElementById('imageUpload').files[0];

    try {
        const imageBase64 = await fileToBase64(imageFile);

        const data = {
            base64Image: imageBase64
        };

        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json()

        const result = responseData.data
        const information = result.information
        console.log(information)
        document.getElementById('information').textContent = information
    } catch (error) {
        console.error('Error:', error);
    }
});