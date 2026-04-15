import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <main className="profile-page page">
      <div className="profile-container">
        
        {/* Profile Header */}
        <div className="profile-header-card">
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">JD</div>
            <button className="profile-edit-avatar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </button>
          </div>
          <h1 className="profile-name">Jane Doe</h1>
          <p className="profile-email">jane.doe@example.com</p>
        </div>

        {/* Profile Menu List */}
        <div className="profile-menu-section">
          
          <div className="profile-menu-group">
            <h3 className="profile-menu-title">My Account</h3>
            
            <Link to="#" className="profile-menu-item">
              <div className="menu-item-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Personal Information</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="chevron"><path d="m9 18 6-6-6-6"/></svg>
            </Link>

            <Link to="#" className="profile-menu-item">
              <div className="menu-item-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                <span>My Orders</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="chevron"><path d="m9 18 6-6-6-6"/></svg>
            </Link>

            <Link to="#" className="profile-menu-item">
              <div className="menu-item-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a5 5 0 0 1 10-2 5 5 0 0 1 8 2z"/></svg>
                <span>Wishlist</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="chevron"><path d="m9 18 6-6-6-6"/></svg>
            </Link>

            <Link to="#" className="profile-menu-item">
              <div className="menu-item-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a5 5 0 0 1 10-2 5 5 0 0 1 8 2z"/><path d="M12 7v5l3 3"/></svg>
                <span>Recently Viewed</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="chevron"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
          </div>

          <div className="profile-menu-group">
            <h3 className="profile-menu-title">Settings</h3>
            
            <Link to="#" className="profile-menu-item">
              <div className="menu-item-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                <span>Shipping Addresses</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="chevron"><path d="m9 18 6-6-6-6"/></svg>
            </Link>

            <Link to="#" className="profile-menu-item">
              <div className="menu-item-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                <span>Payment Methods</span>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="chevron"><path d="m9 18 6-6-6-6"/></svg>
            </Link>
          </div>

          <div className="profile-menu-group">
            <button className="profile-menu-item sign-out-btn">
              <div className="menu-item-left">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                <span>Sign Out</span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
