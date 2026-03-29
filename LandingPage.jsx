import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingUp, Shield, Globe, Cpu, PieChart, Landmark } from 'lucide-react';

const LandingPage = ({ onStart }) => {
  const { t } = useTranslation();

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero animate-fade-in">
        <div className="hero-content">
          <h1>{t('welcome')}</h1>
          <p className="hero-subtitle">
            {t('subtitle')}
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={onStart}>{t('start')}</button>
            <button className="btn-secondary">{t('explore')}</button>
          </div>
        </div>
        <div className="hero-image-placeholder glass-card">
          <div className="placeholder-content">
            <PieChart size={64} color="#00ec97" />
            <p>Smart Portfolio Analysis</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features">
        <div className="section-header">
          <h2>Why Choose <span className="text-accent">MoneyMentor AI</span>?</h2>
        </div>
        <div className="features-grid">
          <FeatureCard 
            icon={<TrendingUp />} 
            title="Financial Health Score" 
            desc="Get a comprehensive 360° view of your financial standing instantly." 
          />
          <FeatureCard 
            icon={<Shield />} 
            title="Tax Saving Advisor" 
            desc="Maximize your savings with AI-driven strategies tailored for Indian tax laws." 
          />
          <FeatureCard 
            icon={<Landmark />} 
            title="FIRE Planner" 
            desc="Retire early with data-backed retirement paths and goal tracking." 
          />
          <FeatureCard 
            icon={<Globe />} 
            title="Multilingual Support" 
            desc="Access financial wisdom in 22 Indian languages including Hindi, Tamil, and more." 
          />
          <FeatureCard 
            icon={<Cpu />} 
            title="AI Chatbot Mentor" 
            desc="24/7 conversational assistance for all your investment queries." 
          />
          <FeatureCard 
            icon={<PieChart />} 
            title="Smart Asset Allocation" 
            desc="Dynamic portfolio balancing based on your risk profile and market trends." 
          />
        </div>
      </section>

      <style jsx>{`
        .landing-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 100px 0;
          gap: 40px;
        }

        .hero-content {
          flex: 1;
        }

        .hero h1 {
          font-size: 3.5rem;
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .text-accent {
          color: var(--accent-color);
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 500px;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
        }

        .hero-image-placeholder {
          flex: 1;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(0, 236, 151, 0.1) 0%, rgba(11, 14, 20, 0) 100%);
        }

        .placeholder-content {
          text-align: center;
          color: var(--text-secondary);
        }

        .features {
          padding: 80px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-header h2 {
          font-size: 2.5rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .feature-card {
          padding: 32px;
          transition: transform 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
        }

        .icon-wrapper {
          color: var(--accent-color);
          margin-bottom: 20px;
        }

        .feature-card h3 {
          margin-bottom: 12px;
          font-size: 1.5rem;
        }

        .feature-card p {
          color: var(--text-secondary);
        }

        @media (max-width: 968px) {
          .hero {
            flex-direction: column;
            text-align: center;
            padding: 60px 0;
          }
          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero h1 {
            font-size: 2.5rem;
          }
          .hero-actions {
            justify-content: center;
          }
          .hero-image-placeholder {
            width: 100%;
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="feature-card glass-card">
    <div className="icon-wrapper">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <h3>{title}</h3>
    <p>{desc}</p>
  </div>
);

export default LandingPage;
