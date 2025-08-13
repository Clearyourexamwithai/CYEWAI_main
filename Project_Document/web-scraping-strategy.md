# Web Scraping Strategy for Exam Data Collection
## Comprehensive Data Gathering for Rajasthan Competitive Exams

### 1. Data Sources and Target Websites

#### 1.1 Primary Official Sources
```python
official_sources = {
    "rpsc_official": {
        "url": "https://rpsc.rajasthan.gov.in/",
        "data_types": ["notifications", "syllabi", "previous_papers", "exam_patterns"],
        "update_frequency": "daily",
        "priority": "high"
    },
    
    "rajasthan_police": {
        "url": "https://police.rajasthan.gov.in/",
        "data_types": ["recruitment_notifications", "exam_patterns", "previous_papers"],
        "update_frequency": "weekly",
        "priority": "high"
    },
    
    "education_department": {
        "url": "https://education.rajasthan.gov.in/",
        "data_types": ["teacher_recruitment", "rtet_information", "syllabi"],
        "update_frequency": "weekly", 
        "priority": "medium"
    },
    
    "high_court_rajasthan": {
        "url": "https://hcraj.nic.in/",
        "data_types": ["judicial_services", "clerical_posts", "previous_papers"],
        "update_frequency": "monthly",
        "priority": "medium"
    }
}

secondary_sources = {
    "educational_websites": [
        "https://www.jagranjosh.com/",
        "https://www.sarkariresult.com/",
        "https://www.fresherslive.com/"
    ],
    
    "coaching_institutes": [
        "https://www.allen.ac.in/",
        "https://www.resonance.ac.in/",
        "https://www.careerpoint.ac.in/"
    ],
    
    "government_portals": [
        "https://raj.nic.in/",
        "https://employment.rajasthan.gov.in/"
    ]
}
```

#### 1.2 Data Collection Targets
```python
data_collection_targets = {
    "exam_notifications": {
        "fields": ["exam_name", "post_name", "eligibility", "dates", "pattern", "syllabus"],
        "sources": ["rpsc", "police", "education_dept"],
        "format": "structured_json"
    },
    
    "previous_year_papers": {
        "fields": ["year", "exam_type", "questions", "answers", "difficulty"],
        "sources": ["official_sites", "educational_portals"],
        "format": "pdf_to_structured"
    },
    
    "syllabi_and_patterns": {
        "fields": ["subjects", "topics", "weightage", "marking_scheme"],
        "sources": ["official_notifications", "coaching_sites"],
        "format": "hierarchical_structure"
    },
    
    "current_affairs": {
        "fields": ["date", "category", "summary", "importance", "relevance"],
        "sources": ["news_sites", "government_updates"],
        "format": "categorized_content"
    },
    
    "geography_data": {
        "fields": ["districts", "rivers", "mountains", "demographics", "economy"],
        "sources": ["census_data", "statistical_yearbooks", "government_reports"],
        "format": "factual_database"
    }
}
```

### 2. Scraping Architecture and Tools

#### 2.1 Multi-Layer Scraping Framework
```python
import scrapy
import requests
import selenium
from bs4 import BeautifulSoup
import pdfplumber
import pandas as pd
from typing import Dict, List, Optional

class ScrapingFramework:
    def __init__(self):
        self.scrapers = {
            "static_content": StaticContentScraper(),
            "dynamic_content": DynamicContentScraper(), 
            "pdf_processor": PDFProcessor(),
            "data_validator": DataValidator(),
            "content_classifier": ContentClassifier()
        }
        
        self.scraping_strategies = {
            "rpsc_official": {
                "method": "requests_beautifulsoup",
                "rate_limit": "2_requests_per_second",
                "headers": self.get_standard_headers(),
                "cookies_required": False
            },
            
            "dynamic_sites": {
                "method": "selenium_webdriver",
                "rate_limit": "1_request_per_second", 
                "browser": "headless_chrome",
                "wait_strategy": "explicit_waits"
            },
            
            "pdf_documents": {
                "method": "pdfplumber_extraction",
                "ocr_fallback": "tesseract",
                "text_cleaning": "comprehensive"
            }
        }

class StaticContentScraper:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive'
        })
    
    def scrape_rpsc_notifications(self) -> List[Dict]:
        """Scrape latest notifications from RPSC website"""
        
        url = "https://rpsc.rajasthan.gov.in/Default.aspx"
        
        try:
            response = self.session.get(url, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            notifications = []
            notification_elements = soup.find_all('div', class_='notification-item')
            
            for element in notification_elements:
                notification = {
                    'title': self.extract_title(element),
                    'date': self.extract_date(element),
                    'link': self.extract_link(element),
                    'category': self.classify_notification(element),
                    'scraped_at': datetime.now()
                }
                notifications.append(notification)
            
            return notifications
            
        except Exception as e:
            self.log_error(f"Error scraping RPSC notifications: {e}")
            return []

class DynamicContentScraper:
    def __init__(self):
        self.setup_selenium_driver()
    
    def setup_selenium_driver(self):
        """Setup headless Chrome driver with optimization"""
        
        chrome_options = Options()
        chrome_options.add_argument('--headless')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1920,1080')
        
        self.driver = webdriver.Chrome(options=chrome_options)
        self.wait = WebDriverWait(self.driver, 10)
    
    def scrape_dynamic_exam_results(self, url: str) -> List[Dict]:
        """Scrape exam results from dynamic websites"""
        
        try:
            self.driver.get(url)
            
            # Wait for content to load
            self.wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'result-table')))
            
            # Extract data using JavaScript if needed
            results_data = self.driver.execute_script("""
                return Array.from(document.querySelectorAll('.result-row')).map(row => ({
                    name: row.querySelector('.candidate-name')?.textContent.trim(),
                    roll_number: row.querySelector('.roll-number')?.textContent.trim(),
                    marks: row.querySelector('.marks')?.textContent.trim(),
                    rank: row.querySelector('.rank')?.textContent.trim()
                }));
            """)
            
            return results_data
            
        except Exception as e:
            self.log_error(f"Error scraping dynamic content: {e}")
            return []
```

#### 2.2 PDF Processing Pipeline
```python
class PDFProcessor:
    def __init__(self):
        self.pdf_tools = {
            "text_extraction": pdfplumber,
            "ocr_fallback": pytesseract,
            "table_extraction": tabula,
            "image_processing": cv2
        }
    
    def process_exam_paper_pdf(self, pdf_path: str) -> Dict:
        """Extract questions and answers from PDF exam papers"""
        
        extracted_data = {
            "metadata": {},
            "questions": [],
            "answer_key": [],
            "instructions": "",
            "exam_pattern": {}
        }
        
        try:
            with pdfplumber.open(pdf_path) as pdf:
                # Extract metadata
                extracted_data["metadata"] = {
                    "total_pages": len(pdf.pages),
                    "exam_info": self.extract_exam_info(pdf.pages[0]),
                    "creation_date": pdf.metadata.get('CreationDate')
                }
                
                # Process each page
                for page_num, page in enumerate(pdf.pages):
                    page_content = self.process_page(page, page_num)
                    
                    if page_content["type"] == "questions":
                        extracted_data["questions"].extend(page_content["questions"])
                    elif page_content["type"] == "answer_key":
                        extracted_data["answer_key"].extend(page_content["answers"])
                    elif page_content["type"] == "instructions":
                        extracted_data["instructions"] += page_content["text"]
                
                # Post-process and validate
                extracted_data = self.validate_and_clean_data(extracted_data)
                
        except Exception as e:
            self.log_error(f"Error processing PDF {pdf_path}: {e}")
        
        return extracted_data
    
    def extract_questions_from_page(self, page) -> List[Dict]:
        """Extract individual questions from a PDF page"""
        
        text = page.extract_text()
        questions = []
        
        # Question pattern matching
        question_pattern = r'(\d+)\.\s*(.*?)(?=\d+\.|$)'
        option_pattern = r'\([a-dA-D]\)\s*(.*?)(?=\([a-dA-D]\)|$)'
        
        question_matches = re.findall(question_pattern, text, re.DOTALL)
        
        for q_num, q_text in question_matches:
            question_data = {
                "question_number": int(q_num),
                "question_text": q_text.strip(),
                "options": [],
                "correct_answer": None,
                "subject": self.classify_question_subject(q_text),
                "difficulty": self.estimate_difficulty(q_text)
            }
            
            # Extract options
            option_matches = re.findall(option_pattern, q_text)
            for i, option_text in enumerate(option_matches):
                question_data["options"].append({
                    "option_id": chr(ord('A') + i),
                    "option_text": option_text.strip()
                })
            
            questions.append(question_data)
        
        return questions
```

### 3. Data Processing and Quality Assurance

#### 3.1 Content Validation Pipeline
```python
class DataValidator:
    def __init__(self):
        self.validation_rules = {
            "question_completeness": {
                "required_fields": ["question_text", "options", "subject"],
                "min_options": 4,
                "max_question_length": 500
            },
            
            "content_quality": {
                "min_word_count": 10,
                "max_word_count": 100,
                "language_detection": True,
                "profanity_check": True
            },
            
            "exam_relevance": {
                "subject_keywords": self.load_subject_keywords(),
                "difficulty_indicators": self.load_difficulty_patterns(),
                "rajasthan_context": self.load_rajasthan_keywords()
            }
        }
    
    def validate_scraped_content(self, content: Dict) -> Dict:
        """Validate and score scraped content quality"""
        
        validation_result = {
            "is_valid": True,
            "quality_score": 0,
            "issues": [],
            "recommendations": []
        }
        
        # Check completeness
        completeness_score = self.check_completeness(content)
        
        # Check quality
        quality_score = self.check_content_quality(content)
        
        # Check relevance
        relevance_score = self.check_exam_relevance(content)
        
        # Calculate overall score
        validation_result["quality_score"] = (
            completeness_score * 0.4 + 
            quality_score * 0.3 + 
            relevance_score * 0.3
        )
        
        # Determine if content should be kept
        validation_result["is_valid"] = validation_result["quality_score"] >= 70
        
        return validation_result

class ContentClassifier:
    def __init__(self):
        self.classification_models = {
            "subject_classifier": self.load_subject_model(),
            "difficulty_classifier": self.load_difficulty_model(),
            "content_type_classifier": self.load_content_type_model()
        }
    
    def classify_content(self, content: str) -> Dict:
        """Classify scraped content by subject, difficulty, and type"""
        
        classification = {
            "subject": self.classify_subject(content),
            "difficulty": self.classify_difficulty(content),
            "content_type": self.classify_content_type(content),
            "relevance_score": self.calculate_relevance_score(content),
            "confidence_scores": {}
        }
        
        return classification
    
    def classify_subject(self, content: str) -> str:
        """Classify content by subject (Geography, History, etc.)"""
        
        subject_keywords = {
            "geography": ["district", "river", "mountain", "climate", "rainfall", "desert"],
            "history": ["dynasty", "ruler", "battle", "monument", "period", "ancient"],
            "polity": ["constitution", "government", "administration", "policy", "act"],
            "economics": ["GDP", "agriculture", "industry", "trade", "budget", "economy"],
            "general_science": ["physics", "chemistry", "biology", "science", "technology"]
        }
        
        content_lower = content.lower()
        subject_scores = {}
        
        for subject, keywords in subject_keywords.items():
            score = sum(1 for keyword in keywords if keyword in content_lower)
            subject_scores[subject] = score
        
        return max(subject_scores, key=subject_scores.get) if subject_scores else "general"
```

### 4. Automated Scraping Workflow

#### 4.1 Scheduled Scraping Jobs
```python
from celery import Celery
from celery.schedules import crontab

app = Celery('exam_scraper')

class ScrapingWorkflow:
    def __init__(self):
        self.scraping_schedule = {
            "daily_tasks": [
                "scrape_rpsc_notifications",
                "scrape_current_affairs",
                "check_new_announcements"
            ],
            
            "weekly_tasks": [
                "scrape_exam_patterns",
                "update_syllabus_data",
                "process_new_pdfs"
            ],
            
            "monthly_tasks": [
                "comprehensive_data_audit",
                "update_geography_facts",
                "validate_historical_data"
            ]
        }

@app.task
def scrape_daily_notifications():
    """Daily task to scrape new notifications"""
    
    scraper = ScrapingFramework()
    
    # Scrape from all configured sources
    all_notifications = []
    
    for source_name, source_config in official_sources.items():
        try:
            notifications = scraper.scrape_source(source_name, source_config)
            all_notifications.extend(notifications)
        except Exception as e:
            logger.error(f"Failed to scrape {source_name}: {e}")
    
    # Process and store notifications
    processed_data = scraper.process_notifications(all_notifications)
    scraper.store_in_database(processed_data)
    
    # Send alerts for important updates
    important_notifications = [n for n in processed_data if n['priority'] == 'high']
    if important_notifications:
        send_admin_alert(important_notifications)

@app.task
def process_pdf_documents():
    """Process new PDF documents found during scraping"""
    
    pdf_processor = PDFProcessor()
    unprocessed_pdfs = get_unprocessed_pdfs()
    
    for pdf_info in unprocessed_pdfs:
        try:
            extracted_data = pdf_processor.process_exam_paper_pdf(pdf_info['path'])
            
            if extracted_data['questions']:
                # Validate and store questions
                valid_questions = validate_questions(extracted_data['questions'])
                store_questions_in_database(valid_questions)
                
                # Mark PDF as processed
                mark_pdf_processed(pdf_info['id'])
                
        except Exception as e:
            logger.error(f"Failed to process PDF {pdf_info['path']}: {e}")

# Celery beat schedule
app.conf.beat_schedule = {
    'daily-notifications': {
        'task': 'scrape_daily_notifications',
        'schedule': crontab(hour=6, minute=0),  # 6 AM daily
    },
    
    'weekly-pdf-processing': {
        'task': 'process_pdf_documents', 
        'schedule': crontab(hour=2, minute=0, day_of_week=1),  # Monday 2 AM
    },
    
    'hourly-current-affairs': {
        'task': 'scrape_current_affairs',
        'schedule': crontab(minute=0),  # Every hour
    }
}
```

#### 4.2 Error Handling and Monitoring
```python
class ScrapingMonitor:
    def __init__(self):
        self.metrics = {
            "success_rate": 0,
            "errors_per_hour": 0,
            "data_quality_score": 0,
            "processing_time": 0
        }
    
    def monitor_scraping_job(self, job_name: str):
        """Monitor scraping job performance"""
        
        start_time = time.time()
        
        try:
            # Execute scraping job
            result = self.execute_scraping_job(job_name)
            
            # Calculate metrics
            execution_time = time.time() - start_time
            self.update_success_metrics(job_name, execution_time, result)
            
            # Check data quality
            quality_score = self.assess_data_quality(result)
            
            # Send alerts if needed
            if quality_score < 80:
                self.send_quality_alert(job_name, quality_score)
                
        except Exception as e:
            self.handle_scraping_error(job_name, str(e))
            self.update_error_metrics(job_name)
    
    def handle_rate_limiting(self, website: str, retry_after: int):
        """Handle rate limiting from websites"""
        
        logger.warning(f"Rate limited by {website}, waiting {retry_after} seconds")
        
        # Implement exponential backoff
        time.sleep(retry_after)
        
        # Adjust future request rates for this website
        self.adjust_rate_limit(website, retry_after)
    
    def detect_anti_bot_measures(self, response) -> bool:
        """Detect if website is blocking bot access"""
        
        anti_bot_indicators = [
            "captcha",
            "bot detection",
            "access denied",
            "cloudflare",
            "rate limit exceeded"
        ]
        
        response_text = response.text.lower()
        
        for indicator in anti_bot_indicators:
            if indicator in response_text:
                return True
        
        return False
```

### 5. Data Storage and Integration

#### 5.1 Scraped Data Schema
```sql
-- Scraped content storage
CREATE TABLE scraped_content (
  id UUID PRIMARY KEY,
  source_website VARCHAR NOT NULL,
  content_type ENUM('notification', 'question', 'syllabus', 'news', 'document'),
  raw_content TEXT,
  processed_content JSONB,
  scraping_metadata JSONB,
  quality_score DECIMAL(3,2),
  validation_status ENUM('pending', 'validated', 'rejected'),
  scraped_at TIMESTAMP,
  processed_at TIMESTAMP
);

-- PDF processing records
CREATE TABLE pdf_processing_log (
  id UUID PRIMARY KEY,
  pdf_url VARCHAR NOT NULL,
  file_path VARCHAR,
  file_size INTEGER,
  processing_status ENUM('pending', 'processing', 'completed', 'failed'),
  extraction_results JSONB,
  error_details TEXT,
  processing_duration INTEGER, -- seconds
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Content classification results
CREATE TABLE content_classifications (
  content_id UUID REFERENCES scraped_content(id),
  subject VARCHAR,
  difficulty_level ENUM('easy', 'medium', 'hard'),
  relevance_score DECIMAL(3,2),
  confidence_score DECIMAL(3,2),
  classification_method ENUM('manual', 'ai', 'rule_based'),
  classified_at TIMESTAMP
);
```

#### 5.2 Data Integration Pipeline
```python
class DataIntegrationPipeline:
    def __init__(self):
        self.processors = {
            "deduplication": ContentDeduplicator(),
            "enrichment": ContentEnricher(),
            "translation": BilingualProcessor(),
            "validation": QualityValidator()
        }
    
    def integrate_scraped_data(self, scraped_content: List[Dict]) -> List[Dict]:
        """Process scraped content for integration into main database"""
        
        processed_content = []
        
        for content in scraped_content:
            # Step 1: Deduplicate
            if not self.processors["deduplication"].is_duplicate(content):
                
                # Step 2: Enrich with metadata
                enriched_content = self.processors["enrichment"].enrich(content)
                
                # Step 3: Translate if needed
                if enriched_content.get("language") != "hindi":
                    enriched_content = self.processors["translation"].add_hindi_translation(enriched_content)
                
                # Step 4: Validate quality
                validation_result = self.processors["validation"].validate(enriched_content)
                
                if validation_result["is_valid"]:
                    processed_content.append(enriched_content)
        
        return processed_content
```

This comprehensive web scraping strategy ensures systematic collection of high-quality exam data while respecting website policies and maintaining data integrity for the Rajasthan competitive exam platform.