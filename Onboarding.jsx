import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    selected_language: 'en',
    monthly_income: '',
    monthly_expenses: '',
    existing_investments: '',
    loans_debt: '',
    risk_tolerance: 'Medium',
    financial_goals: []
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGoalToggle = (goal) => {
    const currentGoals = [...formData.financial_goals];
    if (currentGoals.includes(goal)) {
      setFormData({ ...formData, financial_goals: currentGoals.filter(g => g !== goal) });
    } else {
      setFormData({ ...formData, financial_goals: [...currentGoals, goal] });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...formData,
        age: parseInt(formData.age),
        monthly_income: parseFloat(formData.monthly_income),
        monthly_expenses: parseFloat(formData.monthly_expenses),
        existing_investments: parseFloat(formData.existing_investments || 0),
        loans_debt: parseFloat(formData.loans_debt || 0),
      };
      
      const response = await fetch('http://localhost:8000/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      
      // Combine backend response (message/id) with local data (income/investments)
      setResult(data);
      setStep(5);
      
      // We will pass the combined data to the onComplete handler
      // but only after the user clicks "Go to Dashboard" in step 5.
    } catch (error) {
      console.error("Error submitting onboarding:", error);
      setResult({ status: 'error', message: "Failed to connect to the server. Please ensure the backend is running." });
      setStep(5);
    }
    setLoading(false);
  };

  return (
    <div className="onboarding-container animate-fade-in">
      <div className="onboarding-card glass-card">
        {step < 5 && (
          <div className="progress-bar">
            <div className="progress" style={{ width: `${(step / 4) * 100}%` }}></div>
          </div>
        )}

        {step === 1 && (
          <div className="step-content">
            <h2>Let's get started</h2>
            <p>Tell us a bit about yourself to personalize your experience.</p>
            <div className="input-group">
              <label>Age</label>
              <input 
                type="number" 
                name="age" 
                value={formData.age} 
                onChange={handleInputChange} 
                placeholder="25"
              />
            </div>
            <div className="input-group">
              <label>Preferred Language</label>
              <select name="selected_language" value={formData.selected_language} onChange={handleInputChange}>
                <option value="en">English</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="ta">Tamil (தமிழ்)</option>
                <option value="te">Telugu (తెలుగు)</option>
                <option value="kn">Kannada (ಕನ್ನಡ)</option>
              </select>
            </div>
            <button className="btn-primary" onClick={nextStep} disabled={!formData.age}>
              Next <ArrowRight size={18} />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h2>Monthly Cash Flow</h2>
            <p>Help us understand your monthly earnings and spends.</p>
            <div className="input-group">
              <label>Monthly Income (₹)</label>
              <input 
                type="number" 
                name="monthly_income" 
                value={formData.monthly_income} 
                onChange={handleInputChange} 
                placeholder="50000"
              />
            </div>
            <div className="input-group">
              <label>Monthly Expenses (₹)</label>
              <input 
                type="number" 
                name="monthly_expenses" 
                value={formData.monthly_expenses} 
                onChange={handleInputChange} 
                placeholder="20000"
              />
            </div>
            <div className="btn-group">
              <button className="btn-secondary" onClick={prevStep}><ArrowLeft size={18} /> Back</button>
              <button className="btn-primary" onClick={nextStep} disabled={!formData.monthly_income || !formData.monthly_expenses}>
                Next <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h2>Balance Sheet</h2>
            <p>Current investments and any existing liabilities.</p>
            <div className="input-group">
              <label>Total Existing Investments (₹)</label>
              <input 
                type="number" 
                name="existing_investments" 
                value={formData.existing_investments} 
                onChange={handleInputChange} 
                placeholder="100000"
              />
            </div>
            <div className="input-group">
              <label>Total Loans/Debt (₹)</label>
              <input 
                type="number" 
                name="loans_debt" 
                value={formData.loans_debt} 
                onChange={handleInputChange} 
                placeholder="0"
              />
            </div>
            <div className="btn-group">
              <button className="btn-secondary" onClick={prevStep}><ArrowLeft size={18} /> Back</button>
              <button className="btn-primary" onClick={nextStep}>Next <ArrowRight size={18} /></button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-content">
            <h2>Goals & Risk</h2>
            <p>What are you aiming for?</p>
            <div className="input-group">
              <label>Risk Tolerance</label>
              <div className="radio-group">
                {['Low', 'Medium', 'High'].map(r => (
                  <button 
                    key={r} 
                    className={`btn-tag ${formData.risk_tolerance === r ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, risk_tolerance: r})}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="input-group">
              <label>Financial Goals</label>
              <div className="chip-group">
                {['Home Purchase', 'Retirement', 'Education', 'Travel', 'Wealth Creation'].map(g => (
                  <button 
                    key={g} 
                    className={`btn-tag ${formData.financial_goals.includes(g) ? 'active' : ''}`}
                    onClick={() => handleGoalToggle(g)}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <div className="btn-group">
              <button className="btn-secondary" onClick={prevStep}><ArrowLeft size={18} /> Back</button>
              <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? "Calculating..." : "Finish Onboarding"}
              </button>
            </div>
          </div>
        )}

        {step === 5 && result && (
          <div className="step-content result-content">
            <CheckCircle size={64} color="#00ec97" className="animate-fade-in" />
            <h2>Welcome to the Club!</h2>
            <div className="ai-advice-box glass-card">
              <p>{result.message}</p>
            </div>
            <button className="btn-primary" onClick={() => onComplete({ ...formData, ...result })}>Go to Dashboard</button>
          </div>
        )}
      </div>

      <style jsx>{`
        .onboarding-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: calc(100vh - 200px);
          padding: 40px 20px;
        }

        .onboarding-card {
          width: 100%;
          max-width: 500px;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }

        .progress-bar {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
        }

        .progress {
          height: 100%;
          background: var(--accent-color);
          transition: width 0.3s ease;
        }

        .step-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .step-content h2 {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .step-content p {
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        input, select {
          padding: 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: white;
          font-size: 1rem;
        }

        .btn-group {
          display: flex;
          gap: 16px;
          margin-top: 20px;
        }

        .btn-group button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .radio-group, .chip-group {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .btn-tag {
          padding: 8px 16px;
          border-radius: 20px;
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-tag.active {
          background: var(--accent-color);
          color: var(--primary-bg);
          border-color: var(--accent-color);
        }

        .result-content {
          text-align: center;
          align-items: center;
        }

        .ai-advice-box {
          padding: 24px;
          margin: 24px 0;
          text-align: left;
          font-size: 0.95rem;
          line-height: 1.8;
          max-height: 300px;
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
};

export default Onboarding;
