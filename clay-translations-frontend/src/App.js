import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [translations, setTranslations] = useState({});
  const [language, setLanguage] = useState('en');
  const [newTranslation, setNewTranslation] = useState({ key: '', value: '' });

  useEffect(() => {
    fetchTranslations();
  }, [language]);

  const fetchTranslations = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/translations/${language}`);
      const translationsObj = {};
      response.data.forEach(item => {
        translationsObj[item.key] = item.value;
      });
      setTranslations(translationsObj);
    } catch (error) {
      console.error('Error fetching translations:', error);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleAddTranslation = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/translations', {
        key: newTranslation.key,
        language,
        value: newTranslation.value
      });
      setNewTranslation({ key: '', value: '' });
      fetchTranslations();
    } catch (error) {
      console.error('Error adding translation:', error);
    }
  };

  return (
    <div className="App">
      <h1>Clay Translations Test</h1>
      <div>
        <button onClick={() => handleLanguageChange('en')}>English</button>
        <button onClick={() => handleLanguageChange('es')}>Español</button>
        <button onClick={() => handleLanguageChange('fr')}>Français</button>
      </div>
      <div>
        <h2>Current Translations:</h2>
        {Object.entries(translations).map(([key, value]) => (
          <p key={key}>{key}: {value}</p>
        ))}
      </div>
      <form onSubmit={handleAddTranslation}>
        <h2>Add New Translation</h2>
        <input
          type="text"
          placeholder="Key"
          value={newTranslation.key}
          onChange={(e) => setNewTranslation({...newTranslation, key: e.target.value})}
        />
        <input
          type="text"
          placeholder="Value"
          value={newTranslation.value}
          onChange={(e) => setNewTranslation({...newTranslation, value: e.target.value})}
        />
        <button type="submit">Add Translation</button>
      </form>
    </div>
  );
}

export default App;