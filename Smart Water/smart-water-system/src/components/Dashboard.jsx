import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WaterUsageChart from './WaterUsageChart';
import LeakAlerts from './LeakAlerts';
import CommunityInsights from './CommunityInsights';
import UserProfile from './UserProfile';
import HelpCenter from './HelpCenter';
import PersonalizedTips from './PersonalizedTips';
import { useNavigate } from 'react-router-dom';

const cityStatsData = [
  { city: 'Mumbai', gwPercent: '40%', icon: '🏙️' },
  { city: 'Delhi', gwPercent: '30%', icon: '🌆' },
  { city: 'Chennai', gwPercent: '25%', icon: '🏖️' },
  { city: 'Bengaluru', gwPercent: '35%', icon: '🌄' },
  { city: 'Kolkata', gwPercent: '45%', icon: '🏯' },
];

const weatherData = [
  { city: 'Mumbai', rainfall: '2,200 mm', recharge: '75%', icon: '🌧️' },
  { city: 'Delhi', rainfall: '790 mm', recharge: '50%', icon: '☀️' },
  { city: 'Chennai', rainfall: '1,400 mm', recharge: '60%', icon: '🌦️' },
  { city: 'Bengaluru', rainfall: '900 mm', recharge: '55%', icon: '🌤️' },
  { city: 'Kolkata', rainfall: '1,600 mm', recharge: '70%', icon: '🌩️' },
];

const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'waterUsage', label: 'Water Usage' },
  { key: 'leakAlerts', label: 'Leak Alerts' },
  { key: 'communityInsights', label: 'Community Insights' },
  { key: 'userProfile', label: 'User Profile' },
  { key: 'tips', label: 'Tips' },
  { key: 'helpCenter', label: 'Help' },
];

const CityStatsGrid = () => (
  <div style={styles.grid}>
    {cityStatsData.map(({ city, gwPercent, icon }) => (
      <motion.div
        key={city}
        style={styles.card}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <h4 style={styles.cardTitle}>
          <span style={styles.icon}>{icon}</span> {city}
        </h4>
        <p style={styles.cardValue}>{gwPercent} Groundwater</p>
      </motion.div>
    ))}
  </div>
);

const WeatherStatsGrid = () => (
  <div style={styles.grid}>
    {weatherData.map(({ city, rainfall, recharge, icon }) => (
      <motion.div
        key={city}
        style={styles.card}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <h4 style={styles.cardTitle}>
          <span style={styles.icon}>{icon}</span> {city}
        </h4>
        <p style={styles.cardValue}>{rainfall} Rain</p>
        <p style={styles.cardSubtitle}>Recharge: {recharge}</p>
      </motion.div>
    ))}
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Add your logout logic here (e.g., clear auth token, redirect, etc.)
    alert('Logged out successfully!');
    navigate('/login'); 
  };

  const renderOverview = () => (
    <motion.div
      style={styles.overview}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 style={styles.title}>Welcome to <span style={{ color: '#4ba1ff' }}>Smart Water</span></h2>
      <p style={styles.subtitle}>Explore real-time groundwater and rainfall data across Indian cities.</p>
      <h3 style={styles.sectionTitle}>Groundwater Levels</h3>
      <CityStatsGrid />
      <h3 style={styles.sectionTitle}>Rainfall & Recharge</h3>
      <WeatherStatsGrid />
      <div style={styles.sourcesRow}>
        <span><h2>Sources:</h2></span>
        <a href="https://cgwb.gov.in" target="_blank" rel="noreferrer">CGWB</a>
        <a href="https://indiawris.gov.in" target="_blank" rel="noreferrer">IndiaWRIS</a>
        <a href="https://nmcg.nic.in" target="_blank" rel="noreferrer">🌱 Clean Ganga Campaign</a>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'waterUsage': return <WaterUsageChart />;
      case 'leakAlerts': return <LeakAlerts />;
      case 'communityInsights': return <CommunityInsights />;
      case 'userProfile': return <UserProfile />;
      case 'helpCenter': return <HelpCenter />;
      case 'tips': return <PersonalizedTips />;
      default: return renderOverview();
    }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h1 style={styles.logo}>💧 SmartWater</h1>
        <ul style={styles.navList}>
          {tabs.map(tab => (
            <li key={tab.key}>
              <button
                style={{
                  ...styles.navButton,
                  ...(activeTab === tab.key ? styles.activeButton : {})
                }}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
        <button style={styles.logoutButton} onClick={handleLogout}>🚪 Log Out</button>
      </aside>
      <main style={styles.main}>
        <motion.header
          style={styles.header}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2>{tabs.find(t => t.key === activeTab).label}</h2>
        </motion.header>
        <section style={styles.content}>{renderContent()}</section>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    fontFamily: '"Segoe UI", sans-serif',
    background: 'linear-gradient(to right, #e0f7fa, #fdfdfd)',
  },
  sidebar: {
    width: '260px',
    background: 'rgba(255,255,255,0.6)',
    backdropFilter: 'blur(12px)',
    borderRight: '1px solid #d0d0d0',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: '26px',
    fontWeight: '700',
    marginBottom: '30px',
    color: '#1976d2',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
  },
  navButton: {
    width: '100%',
    padding: '12px 18px',
    marginBottom: '10px',
    fontSize: '16px',
    textAlign: 'left',
    background: 'transparent',
    border: 'none',
    borderRadius: '8px',
    color: '#333',
    cursor: 'pointer',
    transition: '0.3s',
  },
  activeButton: {
    background: '#1976d2',
    color: '#fff',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(25,118,210,0.3)',
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: '10px',
    padding: '12px 18px',
    fontSize: '16px',
    textAlign: 'left',
    background: '#0b6639',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s',
  },
  main: {
    flex: 1,
    padding: '30px 40px',
    overflowY: 'auto',
  },
  header: {
    borderBottom: '1px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '20px',
  },
  content: {
    background: 'rgba(255, 255, 255, 0.7)',
    padding: '30px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
    minHeight: '60vh',
  },
  overview: {
    padding: '10px 10px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '600',
    margin: '20px 0 12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '20px',
    marginBottom: '30px',
  },
  card: {
    background: 'rgba(255,255,255,0.85)',
    borderRadius: '12px',
    padding: '18px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
    transition: '0.3s',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#1976d2',
  },
  icon: {
    marginRight: '6px',
  },
  cardValue: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: '14px',
    color: '#555',
    marginTop: '4px',
  },
  sourcesRow: {
    display: 'flex',
    gap: '20px',
    marginTop: '25px',
    alignItems: 'center',
    fontSize: '14px',
    flexWrap: 'wrap',
    color: '#333',
  },
};

export default Dashboard;
