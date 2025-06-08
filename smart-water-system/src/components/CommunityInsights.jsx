import React from 'react';
import { motion } from 'framer-motion';

const CommunityInsights = () => {
  const userUsage = 40;
  const communityAverage = 60;
  const percentLess = Math.round(((communityAverage - userUsage) / communityAverage) * 100);

  return (
    <div className="community-insights-container">
      {/* Comparison Card */}
      <motion.div className="insight-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h3>Usage Comparison</h3>
        <div className="comparison-bars">
          <div className="bar-container">
            <div className="bar-label">You</div>
            <div className="bar-outer">
              <div className="bar-inner user" style={{ height: `${userUsage}%` }} />
            </div>
            <span className="bar-value">{userUsage}L</span>
          </div>
          <div className="bar-container">
            <div className="bar-label">Community Avg</div>
            <div className="bar-outer">
              <div className="bar-inner avg" style={{ height: `${communityAverage}%` }} />
            </div>
            <span className="bar-value">{communityAverage}L</span>
          </div>
        </div>
      </motion.div>

      {/* Badges & Rank */}
      <motion.div className="insight-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h3>Achievements</h3>
        <div className="badges">
          <div className="badge">
            <span>🏆</span>
            <p>Top Saver</p>
          </div>
          <div className="badge">
            <span>💧</span>
            <p>Water Wise</p>
          </div>
        </div>
        <div className="ranking">
          <p>Rank: <strong>#5 / 100</strong></p>
          <div className="ranking-bar">
            <div className="ranking-fill" style={{ width: '95%' }} />
          </div>
        </div>
      </motion.div>

      {/* Motivational Message */}
      <motion.div className="insight-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <h3>🎉 Great Job!</h3>
        <p className="highlight">You're using {percentLess}% less water than your community average.</p>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${percentLess}%` }} />
        </div>
        <p className="progress-label">Goal Progress</p>
      </motion.div>
    </div>
  );
};

export default CommunityInsights;
