import React, { useState } from 'react';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    alertThreshold: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save settings, e.g., call API or update global state
    console.log('Saved settings:', profile);
  };

  return (
    <div>
      <header>
        <h1>Settings</h1>
      </header>
      <main>
        <section>
          <h2>User Settings</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="alertThreshold">Alert Threshold (litres):</label>
              <input
                type="number"
                id="alertThreshold"
                name="alertThreshold"
                value={profile.alertThreshold}
                onChange={handleChange}
                placeholder="Set water usage alert threshold"
              />
            </div>
            <button type="submit">Save Settings</button>
          </form>
        </section>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Smart Water Conservation System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Settings;
