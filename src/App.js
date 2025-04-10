import React, { useState } from 'react';

const App = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

 const handleSubmit = async () => {
  if (!image) return;

  const formData = new FormData();
  formData.append('file', image);

  try {
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    alert(`Результат: ${data.class}`); // Показать класс мусора

  } catch (error) {
    console.error('Ошибка при отправке файла:', error);
    alert('Ошибка при определении типа мусора.');
  }
};

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Определение типа мусора</h1>
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageUpload} 
        />
      </div>
      {imageUrl && (
        <div>
          <h2>Загруженное изображение:</h2>
          <img 
            src={imageUrl} 
            alt="Uploaded" 
            style={{ maxWidth: '100%', maxHeight: '400px', marginBottom: '20px' }} 
          />
        </div>
      )}
      <div>
        <button onClick={handleSubmit} disabled={!image}>
          Определить тип мусора
        </button>
      </div>
      {/* Для основного кода ИИ, если будет нужен */}
    </div>
  );
};

export default App;
