import React from 'react';
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title 
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Wallet, TrendingUp, PiggyBank, AlertCircle } from 'lucide-react';

ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title
);

const Dashboard = ({ userData }) => {
  // Mock data for charts if userData is partial
  const income = userData?.monthly_income || 50000;
  const expenses = userData?.monthly_expenses || 20000;
  const savings = income - expenses;

  const allocationData = {
    labels: ['Savings', 'Expenses', 'Investments'],
    datasets: [
      {
        data: [savings, expenses, userData?.existing_investments || 0],
        backgroundColor: ['#00ec97', '#ff4d4d', '#36a2eb'],
        borderColor: ['#00ec97', '#ff4d4d', '#36a2eb'],
        borderWidth: 1,
      },
    ],
  };

  const healthScore = 72; // This would come from backend logic

  return (
    <div className="dashboard-container animate-fade-in">
      <header className="dashboard-header">
        <h1>Financial <span className="text-accent">Insights</span></h1>
        <p>Your personalized strategy for wealth creation.</p>
      </header>

      <div className="stats-grid">
        <StatCard 
          icon={<Wallet />} 
          title="Monthly Savings" 
          value={`₹${savings.toLocaleString()}`} 
          trend="+5% from last month"
        />
        <StatCard 
          icon={<TrendingUp />} 
          title="Health Score" 
          value={`${healthScore}/100`} 
          trend="Good Standing"
        />
        <StatCard 
          icon={<PiggyBank />} 
          title="Total Assets" 
          value={`₹${(userData?.existing_investments || 0).toLocaleString()}`} 
          trend="Focused on Growth"
        />
      </div>

      <div className="charts-grid">
        <div className="chart-card glass-card">
          <h3>Asset Allocation</h3>
          <div className="chart-wrapper">
            <Pie data={allocationData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="chart-card glass-card">
          <h3>Income vs Expenses</h3>
          <div className="chart-wrapper">
            <Bar 
              data={{
                labels: ['Monthly'],
                datasets: [
                  { label: 'Income', data: [income], backgroundColor: '#00ec97' },
                  { label: 'Expenses', data: [expenses], backgroundColor: '#ff4d4d' }
                ]
              }}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>

      <div className="ai-report glass-card">
        <div className="report-header">
          <AlertCircle className="text-accent" />
          <h3>AI Wealth Mentor Analysis</h3>
        </div>
        <div className="report-content">
          <p>{userData?.message || "Analyzing your profile for personalized tax-saving and investment strategies..."}</p>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .dashboard-header {
          margin-bottom: 40px;
        }

        .dashboard-header h1 {
          font-size: 2.5rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .stat-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .stat-icon {
          color: var(--accent-color);
          background: rgba(0, 236, 151, 0.1);
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 700;
        }

        .stat-trend {
          font-size: 0.85rem;
          color: #00ec97;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .chart-card {
          padding: 30px;
          height: 400px;
        }

        .chart-card h3 {
          margin-bottom: 24px;
        }

        .chart-wrapper {
          height: 280px;
          position: relative;
        }

        .ai-report {
          padding: 32px;
        }

        .report-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .report-content {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
          .chart-card {
            height: 350px;
          }
        }
      `}</style>
    </div>
  );
};

const StatCard = ({ icon, title, value, trend }) => (
  <div className="stat-card glass-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{title}</p>
      <div className="stat-value">{value}</div>
      <div className="stat-trend">{trend}</div>
    </div>
  </div>
);

export default Dashboard;
