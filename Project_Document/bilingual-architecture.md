# Bilingual Support Architecture
## Hindi-English Dual Language Platform

### 1. Language Architecture Overview

#### 1.1 Multi-Layer Language Support
```javascript
// Language Configuration
const languageConfig = {
  supported_languages: {
    primary: ['hindi', 'english'],
    display_codes: {
      hindi: 'hi',
      english: 'en'
    },
    fallback: 'english'
  },
  
  content_types: {
    ui_interface: 'dynamic_translation',
    questions: 'dual_storage',
    explanations: 'ai_translated',
    user_content: 'auto_detect'
  },
  
  rendering: {
    fonts: {
      hindi: ['Noto Sans Devanagari', 'Mangal', 'DevLys'],
      english: ['Inter', 'Roboto', 'Arial']
    },
    text_direction: {
      hindi: 'ltr', // Devanagari is left-to-right
      english: 'ltr'
    }
  }
}
```

#### 1.2 Content Storage Strategy
```sql
-- Dual language content storage approach
CREATE TABLE content_multilingual (
  id UUID PRIMARY KEY,
  content_type ENUM('question', 'explanation', 'ui_text', 'instruction'),
  english_text TEXT NOT NULL,
  hindi_text TEXT,
  auto_translated BOOLEAN DEFAULT false,
  human_verified BOOLEAN DEFAULT false,
  translation_quality_score DECIMAL(3,2),
  last_updated TIMESTAMP
);

-- Language-specific metadata
CREATE TABLE language_metadata (
  content_id UUID REFERENCES content_multilingual(id),
  language_code VARCHAR(5),
  reading_difficulty ENUM('basic', 'intermediate', 'advanced'),
  vocabulary_level INTEGER, -- 1-10 scale
  cultural_adaptation_notes TEXT,
  pronunciation_guide TEXT -- for Hindi terms
);
```

### 2. Frontend Internationalization (i18next)

#### 2.1 React Setup with i18next
```javascript
// i18n.js - Configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en', // default language
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false // React already escapes
    },
    
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },
    
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie']
    },
    
    resources: {
      en: {
        common: require('./locales/en/common.json'),
        questions: require('./locales/en/questions.json'),
        geography: require('./locales/en/geography.json')
      },
      hi: {
        common: require('./locales/hi/common.json'),
        questions: require('./locales/hi/questions.json'),
        geography: require('./locales/hi/geography.json')
      }
    }
  });

export default i18n;
```

#### 2.2 Translation Resource Files
```json
// locales/en/common.json
{
  "navigation": {
    "dashboard": "Dashboard",
    "practice_tests": "Practice Tests",
    "performance": "Performance",
    "study_plan": "Study Plan"
  },
  "buttons": {
    "start_test": "Start Test",
    "submit_answer": "Submit Answer",
    "next_question": "Next Question",
    "previous_question": "Previous Question"
  },
  "labels": {
    "select_language": "Select Language",
    "difficulty_level": "Difficulty Level",
    "time_remaining": "Time Remaining"
  }
}

// locales/hi/common.json
{
  "navigation": {
    "dashboard": "डैशबोर्ड",
    "practice_tests": "अभ्यास परीक्षा",
    "performance": "प्रदर्शन",
    "study_plan": "अध्ययन योजना"
  },
  "buttons": {
    "start_test": "परीक्षा शुरू करें",
    "submit_answer": "उत्तर जमा करें", 
    "next_question": "अगला प्रश्न",
    "previous_question": "पिछला प्रश्न"
  },
  "labels": {
    "select_language": "भाषा चुनें",
    "difficulty_level": "कठिनाई स्तर",
    "time_remaining": "शेष समय"
  }
}
```

#### 2.3 React Components with Translation
```jsx
// QuestionComponent.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';

const QuestionComponent = ({ question, options, onAnswer }) => {
  const { t, i18n } = useTranslation(['questions', 'common']);
  const currentLang = i18n.language;
  
  return (
    <div className="question-container">
      <div className="question-header">
        <span className="question-number">
          {t('common:labels.question')} {question.number}
        </span>
        <LanguageToggle />
      </div>
      
      <div className={`question-text ${currentLang === 'hi' ? 'hindi-font' : ''}`}>
        {currentLang === 'hi' ? question.text_hindi : question.text_english}
      </div>
      
      <div className="options-container">
        {options.map((option, index) => (
          <button 
            key={index}
            className={`option-button ${currentLang === 'hi' ? 'hindi-font' : ''}`}
            onClick={() => onAnswer(option.id)}
          >
            {currentLang === 'hi' ? option.text_hindi : option.text_english}
          </button>
        ))}
      </div>
    </div>
  );
};

// LanguageToggle.jsx  
const LanguageToggle = () => {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };
  
  return (
    <button onClick={toggleLanguage} className="language-toggle">
      {i18n.language === 'en' ? 'हिंदी' : 'English'}
    </button>
  );
};
```

### 3. CSS and Typography Management

#### 3.1 Font Loading and CSS
```css
/* fonts.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap');

:root {
  /* English fonts */
  --font-english: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Hindi fonts */
  --font-hindi: 'Noto Sans Devanagari', 'Mangal', 'DevLys', sans-serif;
  
  /* Font sizes */
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  
  /* Line heights for better readability */
  --line-height-english: 1.5;
  --line-height-hindi: 1.6; /* Slightly more for Devanagari */
}

/* Language-specific styling */
.english-font {
  font-family: var(--font-english);
  line-height: var(--line-height-english);
}

.hindi-font {
  font-family: var(--font-hindi);
  line-height: var(--line-height-hindi);
  font-size: 1.05em; /* Slightly larger for better readability */
}

/* Question container adaptations */
.question-text.hindi-font {
  letter-spacing: 0.02em;
  word-spacing: 0.1em;
}

/* Button styling for different languages */
.option-button.hindi-font {
  padding: 12px 16px; /* More padding for Hindi text */
  min-height: 48px;
}

.option-button.english-font {
  padding: 10px 16px;
  min-height: 44px;
}
```

#### 3.2 Responsive Design for Languages
```css
/* Responsive typography */
@media (max-width: 768px) {
  .hindi-font {
    font-size: 1.1em; /* Even larger on mobile */
    line-height: 1.7;
  }
  
  .question-text {
    padding: 20px 16px;
  }
  
  .option-button {
    margin-bottom: 12px;
    width: 100%;
    text-align: left;
    padding: 16px;
  }
}

/* Print styles for different languages */
@media print {
  .hindi-font {
    font-family: 'Noto Sans Devanagari', serif;
    font-size: 12pt;
  }
  
  .english-font {
    font-family: 'Times New Roman', serif;
    font-size: 11pt;
  }
}
```

### 4. Backend Translation Services

#### 4.1 Translation API Integration
```python
# translation_service.py
from typing import Dict, Optional
import openai
from googletrans import Translator
import redis
import hashlib

class TranslationService:
    def __init__(self):
        self.openai_client = openai.OpenAI()
        self.google_translator = Translator()
        self.redis_client = redis.Redis()
        
    def translate_content(self, 
                         text: str, 
                         source_lang: str = 'en',
                         target_lang: str = 'hi',
                         content_type: str = 'general') -> Dict:
        
        # Check cache first
        cache_key = self._generate_cache_key(text, source_lang, target_lang)
        cached_result = self.redis_client.get(cache_key)
        
        if cached_result:
            return json.loads(cached_result)
        
        # Use specialized translation based on content type
        if content_type == 'exam_question':
            result = self._translate_exam_content(text, source_lang, target_lang)
        else:
            result = self._translate_general_content(text, source_lang, target_lang)
        
        # Cache result for 30 days
        self.redis_client.setex(cache_key, 2592000, json.dumps(result))
        return result
    
    def _translate_exam_content(self, text: str, source_lang: str, target_lang: str) -> Dict:
        """Specialized translation for exam content maintaining technical accuracy"""
        
        prompt = f"""
        Translate this competitive exam question from {source_lang} to {target_lang}.
        
        REQUIREMENTS:
        1. Maintain technical accuracy of geographical terms
        2. Use formal examination language
        3. Preserve question structure and intent
        4. Use standard Hindi examination terminology for technical terms
        5. Keep numerical values and proper nouns intact
        
        TEXT TO TRANSLATE:
        {text}
        
        Provide:
        1. Accurate translation
        2. Key technical terms used
        3. Alternative phrasings if needed
        4. Quality confidence score (0-100)
        
        Format as JSON:
        {{
            "translated_text": "...",
            "technical_terms": {{"english_term": "hindi_term"}},
            "alternatives": ["alt1", "alt2"],
            "confidence_score": 95
        }}
        """
        
        response = self.openai_client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3
        )
        
        return json.loads(response.choices[0].message.content)
    
    def _generate_cache_key(self, text: str, source_lang: str, target_lang: str) -> str:
        """Generate unique cache key for translation"""
        content = f"{text}_{source_lang}_{target_lang}"
        return f"translation_{hashlib.md5(content.encode()).hexdigest()}"
```

#### 4.2 Content Validation Service
```python
# translation_validator.py
class TranslationValidator:
    def __init__(self):
        self.quality_thresholds = {
            'exam_content': 90,
            'ui_text': 85,
            'general_content': 80
        }
    
    def validate_translation(self, 
                           original_text: str,
                           translated_text: str, 
                           content_type: str) -> Dict:
        
        validation_prompt = f"""
        Evaluate this translation for competitive exam use:
        
        Original ({original_text[:100]}...): {original_text}
        Translation: {translated_text}
        Content Type: {content_type}
        
        Rate on scale 0-100:
        1. Accuracy: How well does translation preserve meaning?
        2. Clarity: Is the translated text clear and unambiguous?
        3. Formality: Does it match examination language standards?
        4. Technical Terms: Are subject-specific terms correctly translated?
        
        Return JSON:
        {{
            "overall_score": 0-100,
            "accuracy_score": 0-100,
            "clarity_score": 0-100,
            "formality_score": 0-100,
            "technical_terms_score": 0-100,
            "issues": ["issue1", "issue2"],
            "suggestions": ["suggestion1", "suggestion2"],
            "approved": true/false
        }}
        """
        
        # Implementation here
        pass
    
    def get_human_review_queue(self) -> List[Dict]:
        """Get translations that need human review"""
        # Return translations below quality threshold
        pass
```

### 5. Database Schema for Bilingual Content

#### 5.1 Enhanced Question Storage
```sql
-- Extended question table with language support
CREATE TABLE questions_multilingual (
  id UUID PRIMARY KEY,
  topic_id UUID REFERENCES topics(id),
  
  -- English content
  question_text_en TEXT NOT NULL,
  explanation_en TEXT,
  
  -- Hindi content  
  question_text_hi TEXT,
  explanation_hi TEXT,
  
  -- Translation metadata
  translation_source ENUM('human', 'ai', 'hybrid'),
  translation_quality_score DECIMAL(3,2),
  human_verified BOOLEAN DEFAULT false,
  
  -- Common fields
  question_type ENUM('mcq', 'true_false', 'fill_blank'),
  difficulty_level ENUM('easy', 'medium', 'hard'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Question options with bilingual support
CREATE TABLE question_options_multilingual (
  id UUID PRIMARY KEY,
  question_id UUID REFERENCES questions_multilingual(id),
  
  -- Option content
  option_text_en TEXT NOT NULL,
  option_text_hi TEXT,
  
  -- Metadata
  is_correct BOOLEAN DEFAULT false,
  option_order INTEGER,
  translation_quality_score DECIMAL(3,2)
);

-- User language preferences
CREATE TABLE user_language_preferences (
  user_id UUID REFERENCES users(id) PRIMARY KEY,
  preferred_language ENUM('english', 'hindi', 'mixed'),
  ui_language ENUM('english', 'hindi'),
  question_language ENUM('english', 'hindi', 'mixed'),
  explanation_language ENUM('english', 'hindi', 'mixed'),
  font_size_preference ENUM('small', 'medium', 'large'),
  updated_at TIMESTAMP
);
```

### 6. User Experience Considerations

#### 6.1 Language Switching Patterns
```javascript
// User behavior tracking for language preferences
const languageUsagePatterns = {
  seamless_switching: {
    description: "Users switch languages mid-test",
    implementation: "Per-question language toggle",
    ui_placement: "Top-right of each question"
  },
  
  section_based: {
    description: "Users prefer one language per section", 
    implementation: "Section-level language selection",
    ui_placement: "Start of each test section"
  },
  
  difficulty_based: {
    description: "Easier questions in Hindi, harder in English",
    implementation: "Auto-suggest language based on difficulty",
    ui_placement: "Smart suggestions during test"
  }
};
```

#### 6.2 Accessibility Features
```css
/* High contrast mode for better readability */
@media (prefers-contrast: high) {
  .hindi-font {
    font-weight: 600;
    color: #000000;
    background-color: #ffffff;
  }
  
  .english-font {
    font-weight: 500;
    color: #000000;
    background-color: #ffffff;
  }
}

/* Large text mode */
@media (prefers-reduced-motion: reduce) {
  .question-text {
    font-size: 1.25em;
    line-height: 1.8;
  }
}

/* Screen reader support */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 7. Performance Optimization

#### 7.1 Lazy Loading for Languages
```javascript
// Dynamic language loading
const loadLanguageResources = async (language) => {
  if (!loadedLanguages.includes(language)) {
    const resources = await import(`./locales/${language}/index.js`);
    i18n.addResourceBundle(language, 'common', resources.common);
    i18n.addResourceBundle(language, 'questions', resources.questions);
    loadedLanguages.push(language);
  }
};

// Preload user's preferred language
const preloadUserLanguage = async (userId) => {
  const userPrefs = await getUserLanguagePreferences(userId);
  await loadLanguageResources(userPrefs.preferred_language);
};
```

#### 7.2 Font Loading Optimization
```css
/* Optimized font loading */
@font-face {
  font-family: 'Noto Sans Devanagari';
  src: url('/fonts/noto-sans-devanagari-subset.woff2') format('woff2');
  font-display: swap; /* Improve loading performance */
  unicode-range: U+0900-097F; /* Devanagari range only */
}

/* Fallback font while loading */
.hindi-font {
  font-family: 'Noto Sans Devanagari', 'Mangal', system-ui, sans-serif;
}
```

This bilingual architecture ensures seamless language switching, maintains content quality across languages, and provides an optimal user experience for both Hindi and English speakers preparing for Rajasthan competitive exams.