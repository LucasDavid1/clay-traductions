const express = require('express');
const mongoose = require('mongoose');
const Translation = require('./translation_schema');
const app = express();
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});


// Middleware
app.use(express.json());
const cors = require('cors');
app.use(cors());

// GET endpoint to retrieve all translations for a specific language
app.get('/translations/:language', async (req, res) => {
  try {
    const { language } = req.params;
    const translations = await Translation.find({ language });
    res.json(translations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST endpoint to add a new content item with translations
app.post('/content', async (req, res) => {
  try {
    const { key, translations } = req.body;
    
    // Expect translations to be an array of objects, each with language and value
    const savedTranslations = await Promise.all(translations.map(async (trans) => {
      const newTranslation = new Translation({
        key,
        language: trans.language,
        value: trans.value
      });
      return await newTranslation.save();
    }));

    res.status(201).json(savedTranslations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/translations', async (req, res) => {
  try {
    const { key, language, value } = req.body;
    const translation = await Translation.findOneAndUpdate(
      { key, language },
      { value },
      { upsert: true, new: true }
    );
    res.json(translation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
