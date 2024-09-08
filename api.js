const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Translation = require('./models/translation_schema');
const { getTranslationsByLanguage, addTranslations, updateTranslation } = require('./services/translationServices');

const app = express();
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});


// Middleware
app.use(express.json());
app.use(cors());

// GET endpoint to retrieve all translations for a specific language
app.get('/translations/:language', async (req, res) => {
  try {
    const { language } = req.params;
    const translations = await getTranslationsByLanguage(language);
    res.json(translations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint to add a new content item with translations
app.post('/content', async (req, res) => {
  try {
    const { key, translations } = req.body;
    const savedTranslations = await addTranslations(key, translations);
    res.status(201).json(savedTranslations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint to add or update a translation
app.post('/translations', async (req, res) => {
  try {
    const { key, language, value } = req.body;
    const updatedTranslation = await updateTranslation(key, language, value);
    res.json(updatedTranslation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
