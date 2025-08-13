import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-white/20">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <h1 className="text-xl font-bold" style={{color: 'var(--text-primary)'}}>ClearYourExamWithAI</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted hover:text-primary transition-colors font-medium">Features</a>
              <a href="#exams" className="text-muted hover:text-primary transition-colors font-medium">Exams</a>
              <a href="#pricing" className="text-muted hover:text-primary transition-colors font-medium">Pricing</a>
              <a href="#contact" className="text-muted hover:text-primary transition-colors font-medium">Contact</a>
            </nav>

            <div className="flex items-center space-x-4">
              <button className="btn btn-ghost hindi-text">हिंदी</button>
              <button className="btn btn-secondary hidden sm:inline-flex">Login</button>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Hero Section */}
      <section className="hero-section">
        <div className="container relative z-10">
          <div className="text-center">
            <h1 className="text-display mb-6 float-animation">
              Clear Your Rajasthan Competitive Exams with AI Power
            </h1>
            <p className="text-lead max-w-3xl mx-auto mb-8" style={{color: 'rgba(255,255,255,0.9)'}}>
              Personalized study plans, AI-generated questions, and comprehensive analytics 
              to help you succeed in RAS, Police, RTET, and other Rajasthan government exams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <button className="btn btn-primary text-lg px-8 py-4" style={{background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)'}}>
                Start Free Practice
              </button>
              <button className="btn btn-secondary text-lg px-8 py-4" style={{background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.3)'}}>
                Watch Demo
              </button>
            </div>
            <p className="text-muted" style={{color: 'rgba(255,255,255,0.7)'}}>
              ✨ 10,000+ students already preparing • 70% success rate
            </p>
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section id="features" className="section-padding" style={{background: 'var(--background-secondary)'}}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-heading mb-4">
              Why Choose ClearYourExamWithAI?
            </h2>
            <p className="text-lead max-w-2xl mx-auto">
              Our AI-powered platform is specifically designed for Rajasthan competitive exams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card-feature text-center">
              <div className="feature-icon">
                🤖
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--text-primary)'}}>AI Question Generation</h3>
              <p style={{color: 'var(--text-secondary)'}}>
                Dynamic questions tailored to Rajasthan exam patterns with intelligent difficulty adjustment
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-feature text-center">
              <div className="feature-icon" style={{background: 'var(--gradient-secondary)'}}>
                🎯
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--text-primary)'}}>Personalized Learning</h3>
              <p style={{color: 'var(--text-secondary)'}}>
                Adaptive study plans based on your performance and learning patterns
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-feature text-center">
              <div className="feature-icon" style={{background: 'var(--gradient-accent)'}}>
                📊
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--text-primary)'}}>Advanced Analytics</h3>
              <p style={{color: 'var(--text-secondary)'}}>
                Comprehensive performance tracking with detailed insights and progress reports
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card-feature text-center">
              <div className="feature-icon" style={{background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'}}>
                🗣️
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--text-primary)'}}>Bilingual Support</h3>
              <p style={{color: 'var(--text-secondary)'}}>
                Complete Hindi and English support for all content and interface
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card-feature text-center">
              <div className="feature-icon" style={{background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'}}>
                📱
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--text-primary)'}}>Mobile First</h3>
              <p style={{color: 'var(--text-secondary)'}}>
                Study anywhere, anytime with our responsive design and offline capabilities
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card-feature text-center">
              <div className="feature-icon" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'}}>
                ⚡
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--text-primary)'}}>Real-time Updates</h3>
              <p style={{color: 'var(--text-secondary)'}}>
                Latest exam patterns, current affairs, and syllabus updates automatically integrated
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Supported Exams Section */}
      <section id="exams" className="section-padding" style={{background: 'var(--background)'}}>
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-heading mb-4">
              Supported Rajasthan Competitive Exams
            </h2>
            <p className="text-lead max-w-2xl mx-auto">
              Comprehensive preparation for all major government exams in Rajasthan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "RAS (Rajasthan Administrative Service)", subjects: "Pre + Mains", status: "Available" },
              { name: "Rajasthan Police Constable", subjects: "All Subjects", status: "Available" },
              { name: "RTET (Rajasthan Teacher Eligibility Test)", subjects: "Paper 1 & 2", status: "Available" },
              { name: "Rajasthan High Court LDC", subjects: "Complete Syllabus", status: "Available" },
              { name: "RPSC Junior Engineer", subjects: "Technical + General", status: "Coming Soon" },
              { name: "Rajasthan Patwari", subjects: "All Subjects", status: "Coming Soon" }
            ].map((exam, index) => (
              <div key={index} className="card" style={{padding: '1.5rem', position: 'relative', overflow: 'hidden'}}>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-semibold text-lg leading-tight" style={{color: 'var(--text-primary)'}}>{exam.name}</h3>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    exam.status === 'Available' 
                      ? 'text-white' 
                      : 'text-orange-700'
                  }`} style={{
                    background: exam.status === 'Available' 
                      ? 'var(--gradient-primary)' 
                      : 'linear-gradient(135deg, #fed7aa 0%, #fdba74 100%)'
                  }}>
                    {exam.status}
                  </span>
                </div>
                <p className="mb-6" style={{color: 'var(--text-secondary)'}}>{exam.subjects}</p>
                <button className={`btn w-full ${exam.status === 'Available' ? 'btn-primary' : 'btn-secondary'}`}>
                  {exam.status === 'Available' ? 'Start Practice' : 'Get Notified'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Stats Section */}
      <section className="section-padding gradient-bg">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Active Students" },
              { number: "70%", label: "Success Rate" },
              { number: "50,000+", label: "Practice Questions" },
              { number: "24/7", label: "AI Support" }
            ].map((stat, index) => (
              <div key={index} className="stat-card float-animation" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-4xl font-bold mb-2 text-white">{stat.number}</div>
                <div className="text-lg" style={{color: 'rgba(255,255,255,0.8)'}}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-heading text-gray-900 mb-4">
            Ready to Transform Your Exam Preparation?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of successful candidates who cleared their exams with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary text-lg px-8 py-4">
              Start Your Free Trial
            </button>
            <button className="btn btn-secondary text-lg px-8 py-4">
              Schedule a Demo
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <h3 className="text-xl font-bold">ClearYourExamWithAI</h3>
              </div>
              <p className="text-gray-400">
                Empowering Rajasthan students with AI-driven exam preparation
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">AI Questions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mock Tests</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Study Plans</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Exams</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">RAS</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Police Constable</a></li>
                <li><a href="#" className="hover:text-white transition-colors">RTET</a></li>
                <li><a href="#" className="hover:text-white transition-colors">High Court LDC</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ClearYourExamWithAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
