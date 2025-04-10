from flask import Flask, request, jsonify
from PIL import Image
import torch
import torchvision.transforms as transforms
from torchvision.models import resnet50, ResNet50_Weights
import io
import torch.nn as nn

app = Flask(__name__)

# Классы (должны совпадать с твоими)
classes = ['Картон', 'Стекло', 'Метал', 'Бумага', 'Пластик', 'Мусор']

# Загрузка модели
class ResNet(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.network = resnet50(weights=ResNet50_Weights.DEFAULT)
        self.network.fc = nn.Linear(self.network.fc.in_features, num_classes)

    def forward(self, x):
        return self.network(x)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = ResNet(len(classes))
model.load_state_dict(torch.load('modelTrashClass.pth', map_location=device))
model.to(device)
model.eval()

# Преобразование изображения
transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor(),
])

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes)).convert('RGB')
    img = transform(img).unsqueeze(0).to(device)

    with torch.no_grad():
        outputs = model(img)
        _, predicted = torch.max(outputs, 1)
        predicted_class = classes[predicted.item()]

    return jsonify({'class': predicted_class})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
