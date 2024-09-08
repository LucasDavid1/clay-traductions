const Translation = require('../models/translation_schema');


const getTranslationsByLanguage = async (language) => {
  return await Translation.find({ language });
};

const addTranslations = async (key, translations) => {
  return await Promise.all(translations.map(async (trans) => {
    const newTranslation = new Translation({
      key,
      language: trans.language,
      value: trans.value
    });
    return await newTranslation.save();
  }));
};

const updateTranslation = async (key, language, value) => {
  return await Translation.findOneAndUpdate(
    { key, language },
    { value },
    { upsert: true, new: true }
  );
};

module.exports = {
  getTranslationsByLanguage,
  addTranslations,
  updateTranslation
};
