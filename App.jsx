import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LandingPage from './components/LandingPage'
import Onboarding from './components/Onboarding'
import Dashboard from './components/Dashboard'
import Chatbot from './components/Chatbot'

function App() {
  const { i18n, t } = useTranslation();
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [currentLang, setCurrentLang] = useState('en');

  const startOnboarding = () => setView('onboarding');
  
  const handleOnboardingComplete = (data) => {
    setUser(data);
    setView('dashboard');
    if (data.selected_language) {
      changeLanguage(data.selected_language);
    }
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo" onClick={() => setView('landing')} style={{cursor: 'pointer'}}>
          <span className="text-accent">Money</span>Mentor AI
        </div>
        <div className="nav-links">
          <a href="#features">{t('features')}</a>
          <div className="lang-switcher">
            <select value={currentLang} onChange={(e) => changeLanguage(e.target.value)}>
              <option value="en">EN</option>
              <option value="hi">हिन्दी</option>
              <option value="ta">தமிழ்</option>
              <option value="te">తెలుగు</option>
            </select>
          </div>
          {view === 'landing' && <button className="btn-primary" onClick={startOnboarding}>{t('start')}</button>}
        </div>
      </nav>
      
      <main>
        {view === 'landing' && <LandingPage onStart={startOnboarding} />}
        {view === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} />}
        {view === 'dashboard' && <Dashboard userData={user} />}
      </main>

      <Chatbot userData={user} language={currentLang} />

      <footer className="footer">
        <p>&copy; 2026 MoneyMentor AI. Empowering India's Financial Future.</p>
      </footer>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          position: sticky;
          top: 0;
          background: rgba(11, 14, 20, 0.8);
          backdrop-filter: blur(10px);
          z-index: 1000;
          border-bottom: 1px solid var(--glass-border);
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 800;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .nav-links a {
          font-weight: 500;
          color: var(--text-secondary);
        }

        .nav-links a:hover {
          color: var(--accent-color);
        }

        .footer {
          padding: 40px;
          text-align: center;
          border-top: 1px solid var(--glass-border);
          color: var(--text-secondary);
          margin-top: 80px;
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 15px 20px;
          }
          .nav-links a {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default App
