const mongoose = require('mongoose');

const TranslationSchema = new mongoose.Schema({
  key: { type: String, required: true },
  language: { type: String, required: true },
  value: { type: String, required: true }
});

TranslationSchema.index({ key: 1, language: 1 }, { unique: true });

module.exports = mongoose.model('Translation', TranslationSchema);