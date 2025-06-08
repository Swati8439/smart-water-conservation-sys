// src/components/LeakAlerts.jsx
import React, { useState, useEffect } from 'react';

const LeakAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastAlert, setToastAlert] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);

  useEffect(() => {
    const mock = [
      {
        id: 1,
        location: 'Kitchen Sink',
        timestamp: '2025-05-10T08:45:00',
        severity: 'High',
        reason: 'Sudden spike in flow rate detected',
        details: 'Flow sensor recorded 15 L/min for over 5 minutes.'
      },
      {
        id: 2,
        location: 'Bathroom Tap',
        timestamp: '2025-05-09T22:30:00',
        severity: 'Medium',
        reason: 'Unusual pressure drop',
        details: 'Pressure fell below threshold for 2 minutes.'
      },
      {
        id: 3,
        location: 'Garden Pipe',
        timestamp: '2025-05-08T18:15:00',
        severity: 'Low',
        reason: 'Minor drip detected',
        details: 'Leak at ~0.5 L/min.'
      },
    ];
    setAlerts(mock);

    const high = mock.find(a => a.severity === 'High');
    if (high) {
      setToastAlert(high);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  }, []);

  const colorFor = sev => {
    if (sev === 'High') return '#e74c3c';
    if (sev === 'Medium') return '#f39c12';
    if (sev === 'Low') return '#27ae60';
    return '#7f8c8d';
  };

  return (
    <div className="leak-alerts">
      <h2>Leak Alerts</h2>

      {showToast && toastAlert && (
        <div className="toast-modal-backdrop">
          <div className={`toast-modal-box severity-${toastAlert.severity.toLowerCase()}`}>
            <div className="toast-icon">⚠️</div>
            <h3 className="toast-title">Leak Detected!</h3>
            <div className="toast-content">
              <p><strong>Location:</strong> {toastAlert.location}</p>
              <p><strong>Severity:</strong> {toastAlert.severity}</p>
              <p><strong>Reason:</strong> {toastAlert.reason}</p>
            </div>
          </div>
        </div>
      )}

      <table className="alerts-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Time</th>
            <th>Severity</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map(a => (
            <tr key={a.id} onClick={() => setSelectedAlert(a)}>
              <td>{a.location}</td>
              <td>{new Date(a.timestamp).toLocaleString()}</td>
              <td style={{ color: colorFor(a.severity), fontWeight: 'bold' }}>{a.severity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedAlert && (
        <div className="alert-details">
          <h3>Details for {selectedAlert.location}</h3>
          <p><strong>Time:</strong> {new Date(selectedAlert.timestamp).toLocaleString()}</p>
          <p><strong>Severity:</strong> <span style={{ color: colorFor(selectedAlert.severity) }}>{selectedAlert.severity}</span></p>
          <p><strong>Reason:</strong> {selectedAlert.reason}</p>
          <p><strong>More Info:</strong> {selectedAlert.details}</p>
        </div>
      )}
    </div>
  );
};

export default LeakAlerts;
