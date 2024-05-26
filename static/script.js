let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");
let predictionResult = document.getElementById("prediction-result");  

uploadButton.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(uploadButton.files[0]);
    reader.onload = () => {
        console.log('File selected:');
        chosenImage.setAttribute("src", reader.result);
    }
    fileName.textContent = uploadButton.files[0].name;

    
    console.log('File selected:', uploadButton.files[0].name);

    let formData = new FormData();
    formData.append("file", uploadButton.files[0]);

    
    console.log('FormData created:', formData);

    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        
        console.log('Response received:', response);
        return response.json();
    })
    .then(data => {
        if (data.error) {
            console.log('Error from server:', data.error);  
            predictionResult.textContent = `Error: ${data.error}`;
        } else {
            console.log('Prediction result:', data.predicted_class);
            // predictionResult.textContent = `Predicted Class: ${data.predicted_class}`;
            prediction = data.predicted_class
            if (prediction === 'lion') {
                document.getElementById('container').innerHTML += '<label style="width: 50%; margin-top: 50px;" id="submit-button"><a href="/static/lion.html" style="text-decoration: none; color: white;">Lion</a></label>'
            } else if (prediction === 'tiger') {
                document.getElementById('container').innerHTML += '<label style="width: 50%; margin-top: 50px;" id="submit-button"><a href="/static/tiger.html" style="text-decoration: none; color: white;">Tiger</a></label>'
            } else if (prediction === 'hyena') {
                document.getElementById('container').innerHTML += '<label style="width: 50%; margin-top: 50px;" id="submit-button"><a href="/static/hyena.html" style="text-decoration: none; color: white;">Hyena</a></label>'
            } else if (prediction === 'cheetah') {
                document.getElementById('container').innerHTML += '<label style="width: 50%; margin-top: 50px;" id="submit-button"><a href="/static/cheetah.html" style="text-decoration: none; color: white;">Cheetah</a></label>'
            } else if (prediction === 'fox') {
                document.getElementById('container').innerHTML += '<label style="width: 50%; margin-top: 50px;" id="submit-button"><a href="/static/fox.html" style="text-decoration: none; color: white;">Fox</a></label>'
            } else if (prediction === 'wolf') {
                document.getElementById('container').innerHTML += '<label style="width: 50%; margin-top: 50px;" id="submit-button"><a href="/static/wolf.html" style="text-decoration: none; color: white;">Wolf</a></label>'
            } else {
                // Default page if prediction is not recognized
                window.location.href = 'unknown.html';
            }
        }
    })
    .catch(error => {
        console.log('Fetch error:', error);  
        predictionResult.textContent = `Error: ${error.message}`;
    });
}