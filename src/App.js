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

  const handleSubmit = () => {
    // код для обработки изображения с ИИ
    console.log('Обрабатываем изображение с ИИ:', image);
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
