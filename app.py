
from flask import Flask, request, render_template, jsonify
import torch
from torchvision import transforms
from PIL import Image
import io
import os
import pickle

app = Flask(__name__,template_folder='template')

#Load the model .hg
model_path = "model.pkl"
if os.path.exists(model_path):
    with open(model_path, 'rb') as file:
        model = pickle.load(file)
    model.eval()  
else:
    raise FileNotFoundError(f"Model file not found at {model_path}")

#image transformation
transform = transforms.Compose([
    transforms.Resize(224),  
    transforms.ToTensor(),
    transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
])

#class names
class_names = ['cheetah', 'fox','hyena','lion','tiger', 'wolf']

def transform_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    return transform(image).unsqueeze(0) 

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        if file:
            img_bytes = file.read()
            tensor = transform_image(img_bytes)
            with torch.no_grad():
                outputs = model(tensor)
                _, predicted = outputs.max(1)
                predicted_class = class_names[predicted.item()]
                response = {
                'predicted_class': predicted_class,
            
                 }

            return jsonify(response)

           
    except Exception as e:
        
        print(f"Error during prediction: {str(e)}")
        return jsonify({'error': 'Server error'}), 500
    


if __name__ == "__main__":
    app.run(debug=True)
