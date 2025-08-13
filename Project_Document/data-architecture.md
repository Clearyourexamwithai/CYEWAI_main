# Data Architecture Plan
## ClearYourExamWithAI Platform

### 1. Database Design Strategy

#### 1.1 Primary Database: PostgreSQL
**Core entities for structured data storage**

```sql
-- Users and Authentication
users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  phone VARCHAR,
  name VARCHAR NOT NULL,
  preferred_language ENUM('hindi', 'english', 'mixed'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  subscription_tier ENUM('free', 'premium', 'premium_plus'),
  subscription_expires_at TIMESTAMP
)

-- Exam Categories and Structure
exam_categories (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL, -- 'RAS', 'Police Constable', 'RTET'
  name_hindi VARCHAR,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  pattern JSONB -- exam pattern details
)

subjects (
  id UUID PRIMARY KEY,
  exam_category_id UUID REFERENCES exam_categories(id),
  name VARCHAR NOT NULL, -- 'Geography', 'History', 'Polity'
  name_hindi VARCHAR,
  weightage INTEGER, -- marks/percentage in exam
  is_active BOOLEAN DEFAULT true
)

topics (
  id UUID PRIMARY KEY,
  subject_id UUID REFERENCES subjects(id),
  name VARCHAR NOT NULL, -- 'Physical Geography', 'Rivers of Rajasthan'
  name_hindi VARCHAR,
  parent_topic_id UUID REFERENCES topics(id), -- for subtopics
  difficulty_level ENUM('easy', 'medium', 'hard'),
  importance_score INTEGER DEFAULT 50 -- 1-100 scale
)

-- Question Bank Structure
questions (
  id UUID PRIMARY KEY,
  topic_id UUID REFERENCES topics(id),
  question_text TEXT NOT NULL,
  question_text_hindi TEXT,
  question_type ENUM('mcq', 'true_false', 'fill_blank', 'descriptive'),
  difficulty_level ENUM('easy', 'medium', 'hard'),
  source ENUM('ai_generated', 'previous_year', 'manual'),
  created_by ENUM('system', 'admin', 'ai'),
  created_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  metadata JSONB -- additional question properties
)

question_options (
  id UUID PRIMARY KEY,
  question_id UUID REFERENCES questions(id),
  option_text TEXT NOT NULL,
  option_text_hindi TEXT,
  is_correct BOOLEAN DEFAULT false,
  option_order INTEGER
)

-- Test and Assessment Structure
test_series (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  name_hindi VARCHAR,
  exam_category_id UUID REFERENCES exam_categories(id),
  test_type ENUM('subject_wise', 'full_length', 'topic_wise', 'previous_year'),
  duration_minutes INTEGER,
  total_marks INTEGER,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP
)

test_questions (
  id UUID PRIMARY KEY,
  test_series_id UUID REFERENCES test_series(id),
  question_id UUID REFERENCES questions(id),
  marks INTEGER DEFAULT 1,
  negative_marks DECIMAL(3,2) DEFAULT 0.33,
  question_order INTEGER
)

-- User Activity and Performance
user_test_attempts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  test_series_id UUID REFERENCES test_series(id),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  total_score DECIMAL(5,2),
  percentage DECIMAL(5,2),
  time_taken_minutes INTEGER,
  status ENUM('in_progress', 'completed', 'abandoned')
)

user_answers (
  id UUID PRIMARY KEY,
  attempt_id UUID REFERENCES user_test_attempts(id),
  question_id UUID REFERENCES questions(id),
  selected_option_id UUID REFERENCES question_options(id),
  is_correct BOOLEAN,
  time_taken_seconds INTEGER,
  answered_at TIMESTAMP
)

-- Performance Analytics
user_performance_analytics (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  subject_id UUID REFERENCES subjects(id),
  topic_id UUID REFERENCES topics(id),
  total_questions_attempted INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  accuracy_percentage DECIMAL(5,2),
  average_time_per_question INTEGER, -- seconds
  last_updated TIMESTAMP,
  UNIQUE(user_id, topic_id)
)

-- Study Plans and Recommendations
study_plans (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  exam_category_id UUID REFERENCES exam_categories(id),
  target_exam_date DATE,
  daily_study_hours INTEGER,
  plan_data JSONB, -- detailed study schedule
  created_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true
)

-- Content Management
previous_year_papers (
  id UUID PRIMARY KEY,
  exam_category_id UUID REFERENCES exam_categories(id),
  year INTEGER,
  paper_type VARCHAR, -- 'prelims', 'mains', 'paper1', 'paper2'
  file_url VARCHAR,
  is_processed BOOLEAN DEFAULT false,
  extracted_questions_count INTEGER DEFAULT 0
)
```

#### 1.2 Vector Database: Pinecone/Chroma
**For AI-powered features and semantic search**

```python
# Vector embeddings storage structure
{
  "question_embeddings": {
    "question_id": "uuid",
    "vector": [0.1, 0.2, ...], # 1536-dim for OpenAI embeddings
    "metadata": {
      "topic": "Physical Geography",
      "difficulty": "medium",
      "exam_type": "RAS",
      "language": "english"
    }
  },
  
  "topic_embeddings": {
    "topic_id": "uuid", 
    "vector": [0.1, 0.2, ...],
    "metadata": {
      "subject": "Geography",
      "exam_category": "RAS",
      "subtopics": ["rivers", "mountains", "climate"]
    }
  },
  
  "user_knowledge_embeddings": {
    "user_id": "uuid",
    "topic_id": "uuid", 
    "knowledge_vector": [0.1, 0.2, ...], # represents user's understanding
    "last_updated": "timestamp"
  }
}
```

### 2. Data Flow Architecture

#### 2.1 Question Generation Pipeline
```
Content Sources → Data Processing → AI Generation → Quality Check → Database Storage

1. Content Sources:
   - Previous year papers (PDF scraping)
   - Official syllabi (web scraping)
   - Educational websites (content extraction)
   - Manual content creation

2. Data Processing:
   - Text extraction and cleaning
   - Language detection and translation
   - Topic classification and tagging
   - Difficulty level assignment

3. AI Generation:
   - LLM-based question generation
   - Multiple choice option creation
   - Explanation generation
   - Bilingual content creation

4. Quality Check:
   - Human review workflow
   - Automated quality scoring
   - Duplicate detection
   - Accuracy validation

5. Database Storage:
   - Structured data in PostgreSQL
   - Vector embeddings in Pinecone
   - File storage in S3/CDN
```

#### 2.2 User Performance Analytics Pipeline
```
User Actions → Real-time Processing → Analytics Engine → Insights Generation

1. User Actions:
   - Test attempts and answers
   - Study time tracking
   - Content interactions
   - Learning preferences

2. Real-time Processing:
   - Answer validation
   - Score calculation
   - Time tracking
   - Progress updates

3. Analytics Engine:
   - Performance aggregation
   - Weakness identification
   - Strength analysis
   - Trend calculations

4. Insights Generation:
   - Personalized recommendations
   - Study plan adjustments
   - Content suggestions
   - Progress predictions
```

### 3. Subject-Specific Data Models

#### 3.1 Rajasthan Geography Data Structure
```sql
-- Geography-specific tables
geography_locations (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL,
  name_hindi VARCHAR,
  type ENUM('district', 'city', 'river', 'mountain', 'desert', 'lake'),
  coordinates POINT, -- latitude, longitude
  parent_location_id UUID REFERENCES geography_locations(id),
  description TEXT,
  importance_level INTEGER
)

geography_facts (
  id UUID PRIMARY KEY,
  location_id UUID REFERENCES geography_locations(id),
  fact_type ENUM('area', 'population', 'height', 'length', 'climate'),
  fact_value VARCHAR,
  fact_unit VARCHAR,
  source VARCHAR,
  last_updated DATE
)

-- Link questions to specific geographic entities
question_geography_mapping (
  question_id UUID REFERENCES questions(id),
  location_id UUID REFERENCES geography_locations(id),
  fact_id UUID REFERENCES geography_facts(id)
)
```

#### 3.2 Exam Pattern Configurations
```json
{
  "RAS": {
    "prelims": {
      "total_questions": 150,
      "duration_minutes": 180,
      "subjects": {
        "geography": {"questions": 25, "marks": 25},
        "history": {"questions": 30, "marks": 30},
        "polity": {"questions": 25, "marks": 25},
        "economics": {"questions": 20, "marks": 20},
        "general_science": {"questions": 25, "marks": 25},
        "current_affairs": {"questions": 25, "marks": 25}
      },
      "negative_marking": 0.33
    },
    "mains": {
      "papers": [
        {
          "paper_number": 1,
          "subject": "General Studies I",
          "duration_hours": 3,
          "marks": 200,
          "question_types": ["descriptive", "essay"]
        }
      ]
    }
  }
}
```

### 4. Data Management Strategies

#### 4.1 Content Versioning
```sql
-- Track changes in questions and content
content_versions (
  id UUID PRIMARY KEY,
  entity_type ENUM('question', 'topic', 'subject'),
  entity_id UUID,
  version_number INTEGER,
  changes JSONB,
  created_by UUID,
  created_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true
)
```

#### 4.2 Data Quality Assurance
```sql
-- Quality metrics for AI-generated content
content_quality_scores (
  id UUID PRIMARY KEY,
  question_id UUID REFERENCES questions(id),
  accuracy_score DECIMAL(3,2), -- 0.00 to 1.00
  relevance_score DECIMAL(3,2),
  difficulty_consistency_score DECIMAL(3,2),
  language_quality_score DECIMAL(3,2),
  human_review_status ENUM('pending', 'approved', 'rejected'),
  reviewed_by UUID,
  reviewed_at TIMESTAMP
)
```

#### 4.3 Caching Strategy (Redis)
```python
# Cache structure for performance optimization
cache_patterns = {
    # User session data
    f"user_session:{user_id}": {
        "preferences": {},
        "current_test": {},
        "ttl": 3600  # 1 hour
    },
    
    # Question pools for quick test generation
    f"question_pool:{exam_id}:{subject_id}:{difficulty}": {
        "question_ids": [],
        "ttl": 86400  # 24 hours
    },
    
    # User performance summaries
    f"user_stats:{user_id}": {
        "overall_accuracy": 0.75,
        "subject_wise_performance": {},
        "ttl": 1800  # 30 minutes
    },
    
    # Frequently accessed content
    f"popular_questions:{exam_id}": {
        "question_data": [],
        "ttl": 3600
    }
}
```

### 5. Data Security and Compliance

#### 5.1 Data Protection Measures
- **Encryption**: All PII encrypted at rest and in transit
- **Access Control**: Role-based access to sensitive data
- **Audit Logging**: Complete audit trail for data access/modifications
- **Data Anonymization**: User data anonymized for analytics

#### 5.2 Backup and Recovery
- **Primary Backup**: Daily automated backups to AWS S3
- **Geographic Redundancy**: Multi-region backup storage
- **Point-in-time Recovery**: Transaction log backups every 15 minutes
- **Disaster Recovery**: < 4 hour RTO, < 1 hour RPO

### 6. Scalability Considerations

#### 6.1 Database Partitioning
```sql
-- Partition large tables by date for better performance
CREATE TABLE user_test_attempts (
    -- columns
) PARTITION BY RANGE (created_at);

CREATE TABLE user_test_attempts_2024_q1 
PARTITION OF user_test_attempts 
FOR VALUES FROM ('2024-01-01') TO ('2024-04-01');
```

#### 6.2 Read Replicas
- **Master-Slave Setup**: Write operations on master, reads on replicas
- **Geographic Distribution**: Replicas in different regions for low latency
- **Load Balancing**: Intelligent routing based on query type

This data architecture provides a robust foundation for handling multiple exam types, subjects, and the complex relationships between users, content, and performance analytics while maintaining scalability and data integrity.