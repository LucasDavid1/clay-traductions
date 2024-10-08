# Translation API

This is a Node.js and Express-based API that connects to a MongoDB database for managing translations. It provides endpoints for retrieving, adding, and updating translations in multiple languages.

## Features

- **Retrieve Translations:** Get all translations for a specific language.
- **Add Translations:** Add new content items with translations.
- **Update Translations:** Update or create translations for a specific language and key.

## Demo

[clay-translations-demo.webm](https://github.com/user-attachments/assets/7b384072-105e-43b9-b1e8-2acd2a82899c)

## Prerequisites

- **Node.js**
- **MongoDB**
- **dotenv**


## MongoDB Schema

The application uses a MongoDB schema for storing translations. The schema is defined using Mongoose, a Node.js library for MongoDB object modeling. Below is an explanation of the `TranslationSchema`:

### TranslationSchema

```javascript
const TranslationSchema = new mongoose.Schema({
  key: { type: String, required: true },
  language: { type: String, required: true },
  value: { type: String, required: true }
});
```

### Fields:
- **key**: A string that identifies the specific text or content being translated (e.g., "greeting"). This field is required.
- **language**: A string that stores the language code (e.g., "en" for English, "es" for Spanish). This field is required.
- **value**: A string containing the actual translation for the given key and language. This field is required.

### Unique index:
Composite index on the combination of the `key` and `language` fields:
```javascript
TranslationSchema.index({ key: 1, language: 1 }, { unique: true });
```

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/LucasDavid1/clay-traductions.git
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment variables:**
Create a .env file in the root of the project with the following contents:
```bash
PORT=5000
MONGODB_URI=mongodb://<your-mongo-db-uri>
```

4. **Run backend:**
```bash
npm run dev
```

4.1 **Run backend on the background:**
```bash
pm2 start api.js
```

5. **Run Frontend:**
```bash
cd clay-translations-frontend
npm install
npm run start
```

# Endpoints

## 1. Retrieve Translations for a Specific Language

**GET** `/translations/:language`

Retrieve all translations for the given language.

- **URL Params**:
  - `language` (string): The language code (e.g., `en`, `es`, `fr`).

- **Response**:
  - `200 OK`: An array of translation objects.

- **Example**:

```bash
GET /translations/en
```
Response:
```json
[
  {
    "_id": "64c9c1f21c7b490ab1234567",
    "key": "greeting",
    "language": "en",
    "value": "Hello"
  }
]
```

## 2. Add New Content with Translations

**POST** `/content`
Add new content items with translations in different languages.

- **Body (JSON)**:
    - key (string): The translation key.
    - translations (array of objects):
        - language (string): The language code (e.g., en, es).
        - value (string): The translation value.

- **Response**:
  - `201 Created`: An array of the saved translation objects.

- **Example**:
```bash
POST /content
{
  "key": "greeting",
  "translations": [
    { "language": "en", "value": "Hello" },
    { "language": "es", "value": "Hola" }
  ]
}
```
Response:
```json
[
  {
    "_id": "64c9c1f21c7b490ab1234567",
    "key": "greeting",
    "language": "en",
    "value": "Hello"
  },
  {
    "_id": "64c9c1f21c7b490ab1234568",
    "key": "greeting",
    "language": "es",
    "value": "Hola"
  }
]
```

## 3. Add or Update a Translation

**POST** `/translations`
Create or update a translation for a given key and language.

- **Body (JSON)**:
    - key (string): The translation key.
    - language (string): The language code (e.g., en, es).
    - value (string): The translation value.

- **Response**:
  - `200 OK`: The updated or newly created translation object.

- **Example**:
```bash
POST /translations
{
  "key": "greeting",
  "language": "en",
  "value": "Hi"
}
```

Response:
```json
{
  "_id": "64c9c1f21c7b490ab1234567",
  "key": "greeting",
  "language": "en",
  "value": "Hi"
}
```
