// UserProfile.jsx
import React, { useState, useEffect } from 'react';

function UserProfile() {
  // you might store the logged‑in email in localStorage or context
  const email = localStorage.getItem('userEmail');
  if (!email) {
    // you’re not logged in—redirect to /login or show an error
    window.location.href = '/login';
  }

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // load profile on mount
  useEffect(() => {
    fetch(`http://localhost:8081/profile/${email}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then(data => {
        setUser(data);
      })
      .catch(console.error);
  }, [email]);

  // preview selected image
  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setImagePreview(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  // mask phone: show only last 4 digits
  const maskPhone = (num) => {
    if (!num) return '';
    return num.replace(/\d(?=\d{4})/g, 'X');
  };

  // handle profile save
  const handleSaveProfile = () => {
    fetch(`http://localhost:8081/profile/${email}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: user.name,
        phone: user.phone,
        address: user.address,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then(updated => {
        setUser(updated);
        setEditMode(false);
      })
      .catch(console.error);
  };

  // handle password change
  const handleSavePassword = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8081/changePassword`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        oldPassword,
        newPassword,
      }),
    })
      .then(res => {
        if (!res.ok) return res.text().then(text => { throw new Error(text); });
        return res.text();
      })
      .then(msg => {
        alert(msg);
        setShowPasswordModal(false);
        setOldPassword('');
        setNewPassword('');
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className="user-profile-container">
      <div className="colorful-profile">
        <div className="user-profile-grid">

          {/* Profile Picture */}
          <div className="glassy profile-card">
            <img
              src={imagePreview || user.profilePicUrl || 'user-circle.png'}
              alt="Profile"
              className="profile-pic"
            />
            {editMode && (
              <input
                type="file"
                accept="image/*"
                className="profile-pic-input"
                onChange={e => setImageFile(e.target.files[0])}
              />
            )}
            <button
              className="edit-toggle-btn"
              onClick={() => {
                if (editMode) handleSaveProfile();
                else setEditMode(true);
              }}
            >
              {editMode ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          {/* Info Section */}
          <div className="glassy info-card">
            {editMode ? (
              <form className="info-form" onSubmit={e => { e.preventDefault(); handleSaveProfile(); }}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={user.name}
                    onChange={e => setUser({ ...user, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" value={user.email} disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="tel"
                    id="phone"
                    value={user.phone}
                    onChange={e => setUser({ ...user, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    id="address"
                    value={user.address}
                    onChange={e => setUser({ ...user, address: e.target.value })}
                  />
                </div>
              </form>
            ) : (
              <div className="info-view">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {maskPhone(user.phone)}</p>
                <p><strong>Address:</strong> {user.address}</p>
              </div>
            )}
          </div>

          {/* Change Password Section */}
          <div className="glassy password-card center-content">
            <button
              className="change-password-btn"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Change Password</h3>
            <form onSubmit={handleSavePassword}>
              <div className="form-group">
                <label htmlFor="oldPassword">Old Password:</label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="edit-toggle-btn"
                  onClick={() => setShowPasswordModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="change-password-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
