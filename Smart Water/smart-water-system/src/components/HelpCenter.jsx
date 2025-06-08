// src/components/HelpCenter.jsx
import React, { useState } from 'react';
import axios from 'axios';

const HelpCenter = () => {
  // form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  // existing status state for button text
  const [status, setStatus] = useState(null);

  // toast modal state
  const [showToast, setShowToast]       = useState(false);
  const [toastContent, setToastContent] = useState({ title: '', body: '' });

  // handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit to backend and trigger toast
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await axios.post('http://localhost:8081/support', form);
      setStatus('sent');

      // prepare and show success toast
      setToastContent({
        title: 'Message Sent',
        body: `Subject: ${form.subject}`
      });
      setShowToast(true);

      // reset form
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');

      // prepare and show error toast
      setToastContent({
        title: 'Send Failed',
        body: 'Please try again later.'
      });
      setShowToast(true);
    }

    // hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="help-center">
      <h1 className="help-title">Help Center</h1>

      <section className="usage-section">
        <h2>How to Use</h2>
        <ul className="usage-list">
          <li><strong>Dashboard:</strong> Real-time and historical water usage summary with interactive graphs.</li>
          <li><strong>Alerts:</strong> View and customize notifications for potential leaks or irregular usage.</li>
          <li><strong>Charts:</strong> Analyze consumption trends over selectable timeframes.</li>
          <li><strong>Tips:</strong> Learn effective water-saving practices.</li>
        </ul>
      </section>

      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          <details>
            <summary>How do I view my water usage data?</summary>
            <p>Go to the Dashboard to see real-time and historical usage visualizations.</p>
          </details>
          <details>
            <summary>How can I set up alerts?</summary>
            <p>In the Alerts section, define conditions and thresholds to receive timely notifications.</p>
          </details>
          <details>
            <summary>Can I filter data in charts?</summary>
            <p>Yes, charts support date filtering and detailed tooltips for better insight.</p>
          </details>
          <details>
            <summary>Where can I find water-saving tips?</summary>
            <p>The Tips tab provides expert-backed ideas updated regularly.</p>
          </details>
        </div>
      </section>

      <section className="contact-section">
        <h2>Contact Support</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="form-input"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="form-input"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="subject"
            type="text"
            placeholder="Subject"
            className="form-input"
            value={form.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            className="form-textarea"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="form-button"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
          {status === 'sent' && (
            <p className="success-text">Message sent! We’ll be in touch shortly.</p>
          )}
          {status === 'error' && (
            <p className="error-text">Failed to send. Please try again.</p>
          )}
        </form>
      </section>

      {/* LeakAlerts‑style toast modal */}
      {showToast && (
        <div className="toast-modal-backdrop">
          <div className="toast-modal-box">
            <div className="toast-icon">📨</div>
            <h3 className="toast-title">{toastContent.title}</h3>
            <div className="toast-content">
              <p>{toastContent.body}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenter;
