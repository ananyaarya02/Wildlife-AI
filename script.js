/*let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");
let predictionResult = document.getElementById("prediction-result");  // Added to display prediction result

uploadButton.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(uploadButton.files[0]);
    reader.onload = () => {
        chosenImage.setAttribute("src",reader.result);
    }
    fileName.textContent = uploadButton.files[0].name;
    let formData = new FormData();
    formData.append("file", uploadButton.files[0]);
    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.log() - I 
            predictionResult.textContent = `Error: ${data.error}`;
        } else {
            console.log() - I 
            predictionResult.textContent = `Predicted Class: ${data.predicted_class}`;
        }
    })
    .catch(error => {
        console.log() - I 
        predictionResult.textContent = `Error: ${error.message}`;
    });
    

}*/
/*let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");

uploadButton.addEventListener('submit', (event) => {
    event.preventDefault();  // Prevent the form from submitting normally
    let formData = new FormData(uploadForm);  // Create a FormData object from the form
    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Update the image and file name
        chosenImage.src = data.image_url;
        fileName.textContent = data.file_name;
        // Add any other code to handle the prediction result here
    })
    .catch(error => console.error('Error:', error));
});*/
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
            predictionResult.textContent = `Predicted Class: ${data.predicted_class}`;
        }
    })
    .catch(error => {
        console.log('Fetch error:', error);  
        predictionResult.textContent = `Error: ${error.message}`;
    });
}
/*let uploadButton = document.getElementById("upload-button");
let chosenImage = document.getElementById("chosen-image");
let fileName = document.getElementById("file-name");
let predictionResult = document.getElementById("prediction-result");  // Added to display prediction result

uploadButton.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(uploadButton.files[0]);
    reader.onload = () => {
        chosenImage.setAttribute("src", reader.result);
    }
    fileName.textContent = uploadButton.files[0].name;

    // Log to check if the file has been read correctly
    console.log('File selected:', uploadButton.files[0].name);

    let formData = new FormData();
    formData.append("file", uploadButton.files[0]);

    // Log to check if FormData has been created correctly
    console.log('FormData created:', formData);

    /*fetch('/predict', {
        method: 'POST',
        body: formData
    })
    //.then(response => response.text())  // Fetch the response as text
    .then(text => {
        console.log('Response text:', text);  // Log the response text
        let data;
        try {
            data = JSON.parse(text);  // Attempt to parse the JSON
        } catch (error) {
            console.log('JSON parse error:', error);  // Log JSON parsing errors
            throw new Error('Failed to parse JSON response');
        }
        if (data.error) {
            console.log('Error from server:', data.error);  // Log server error
            predictionResult.textContent = `Error: ${data.error}`;
        } else {
            console.log('Prediction result:', data.predicted_class);  // Log prediction result
            predictionResult.textContent = `Predicted Class: ${data.predicted_class}`;
        }
    })
    .catch(error => {
        console.log('Fetch error:', error);  // Log fetch error
        predictionResult.textContent = `Error: ${error.message}`;
    });
    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())  
    /*.then(response => {
       if (!response.ok) {
            throw new Error('Failed to predict');
        }
        return response.json();  // Fetch the response as JSON
    })

    .then(data => {
        console.log('Prediction result:', data.predicted_class);  // Log prediction result
        /*predictionResult.textContent = `Predicted Class: ${data.predicted_class}`;
    })
    .catch(error => {
        console.log('Error:', error);  // Log error
        predictionResult.textContent = `Error: ${error.message}`;
    });
}

const form = document.getElementById("upload-form");
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const imageInput = document.getElementById("image-input");
    const imageFile = imageInput.files[0];

    // Create a FormData object to send the image data
    const formData = new FormData();
    formData.append("image", imageFile);

    fetch("/predict", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Display the predicted class on the website
        console.log("Prediction:", data.prediction);
        // Update your website UI with the prediction
    })
    .catch(error => {
        console.error("Error:", error);
        // Handle any errors during prediction
    });
});*/
