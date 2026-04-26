import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { WishlistContext } from '../context/WishlistContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading || !user) {
    return <main className="profile-page page"><div className="container" style={{paddingTop: '120px'}}>Loading...</div></main>;
  }

  // MOCK DATA
  const mockOrders = [
    { id: '#ORD-1092', date: '2023-11-12', total: 450, status: 'Delivered', items: 2 },
    { id: '#ORD-0941', date: '2023-09-04', total: 120, status: 'Delivered', items: 1 }
  ];

  const renderOverview = () => (
    <div className="profile-overview-grid">
      <div className="profile-card recent-orders">
        <div className="profile-card-header">
          <h2>Recent Orders</h2>
          <button className="text-link" onClick={() => setActiveTab('orders')}>View All</button>
        </div>
        {mockOrders.length > 0 ? (
          <div className="order-summary-list">
            {mockOrders.map(order => (
              <div key={order.id} className="order-summary-item">
                <div>
                  <span className="order-id">{order.id}</span>
                  <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="profile-empty-state">
            <p>You haven't placed any orders yet.</p>
            <Link to="/products" className="btn-secondary">Discover the Collection</Link>
          </div>
        )}
      </div>

      <div className="profile-card saved-items">
        <div className="profile-card-header">
          <h2>Saved Items</h2>
          <button className="text-link" onClick={() => setActiveTab('wishlist')}>View Wishlist</button>
        </div>
        {wishlist.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '16px', marginTop: '16px' }}>
            {wishlist.slice(0, 3).map(item => (
              <Link to={`/products/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '4px' }} />
              </Link>
            ))}
            {wishlist.length > 3 && (
               <div className="more-wishlist-items" onClick={() => setActiveTab('wishlist')}>
                 +{wishlist.length - 3}
               </div>
            )}
          </div>
        ) : (
          <div className="profile-empty-state">
            <p>Your wishlist is empty.</p>
            <Link to="/products" className="text-link">Explore New Arrivals</Link>
          </div>
        )}
      </div>

      <div className="profile-card account-details">
        <div className="profile-card-header">
          <h2>Personal Details</h2>
          <button className="text-link" onClick={() => setActiveTab('settings')}>Edit</button>
        </div>
        <div className="details-list">
          <div className="detail-row">
            <span className="detail-label">Name</span>
            <span className="detail-value">{user.name}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Email</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Password</span>
            <span className="detail-value">••••••••</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Member Since</span>
            <span className="detail-value">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="profile-card">
      <div className="profile-card-header">
        <h2>Order History</h2>
      </div>
      {mockOrders.length > 0 ? (
        <div className="order-history-list">
          {mockOrders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <div>
                  <h3>Order {order.id}</h3>
                  <p>Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="order-card-actions">
                  <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                  <button className="btn-secondary">View Details</button>
                </div>
              </div>
              <div className="order-card-body">
                <p>{order.items} item(s) - Total: ${order.total.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="profile-empty-state">
          <p>You haven't placed any orders yet.</p>
          <Link to="/products" className="btn-secondary">Discover the Collection</Link>
        </div>
      )}
    </div>
  );

  const renderWishlist = () => (
    <div className="profile-card">
      <div className="profile-card-header">
        <h2>Your Wishlist</h2>
      </div>
      {wishlist.length > 0 ? (
        <div className="wishlist-grid">
          {wishlist.map(item => (
            <Link to={`/products/${item.id}`} key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.name} />
              <div className="wishlist-item-info">
                <h3>{item.name}</h3>
                <p>${item.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="profile-empty-state">
          <p>Your wishlist is empty.</p>
          <Link to="/products" className="btn-secondary">Explore New Arrivals</Link>
        </div>
      )}
    </div>
  );

  const renderAddresses = () => (
    <div className="profile-card">
      <div className="profile-card-header">
        <h2>Saved Addresses</h2>
        <button className="btn-secondary">+ Add New Address</button>
      </div>
      <div className="address-grid">
        <div className="address-card">
          <div className="address-card-header">
            <h3>Home</h3>
            <span className="badge">Default</span>
          </div>
          <div className="address-card-body">
            <p>{user.name}</p>
            <p>123 Fashion Ave</p>
            <p>Suite 400</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
          </div>
          <div className="address-card-actions">
            <button className="text-link">Edit</button>
            <button className="text-link">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="profile-card">
      <div className="profile-card-header">
        <h2>Account Settings</h2>
      </div>
      <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" defaultValue={user.name} />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" defaultValue={user.email} />
        </div>
        <div className="form-group">
          <label>Current Password</label>
          <input type="password" placeholder="••••••••" />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" placeholder="Leave blank to keep current" />
        </div>
        <button className="btn-primary" style={{marginTop: '16px'}}>Save Changes</button>
      </form>
    </div>
  );

  return (
    <main className="profile-page page">
      <header className="profile-header">
        <h1 className="profile-title">Your Atelier</h1>
        <p className="profile-subtitle">Manage your wardrobe, orders, and personal details.</p>
      </header>

      <div className="profile-container container">
        {/* Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-user-card">
            <div className="profile-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="profile-user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
          
          <nav className="profile-nav">
            <button className={`profile-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
            <button className={`profile-nav-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Order History</button>
            <button className={`profile-nav-item ${activeTab === 'wishlist' ? 'active' : ''}`} onClick={() => setActiveTab('wishlist')}>Wishlist</button>
            <button className={`profile-nav-item ${activeTab === 'addresses' ? 'active' : ''}`} onClick={() => setActiveTab('addresses')}>Addresses</button>
            <button className={`profile-nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Account Settings</button>
            <button className="profile-nav-item logout" onClick={handleLogout}>Sign Out</button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <section className="profile-content">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'wishlist' && renderWishlist()}
          {activeTab === 'addresses' && renderAddresses()}
          {activeTab === 'settings' && renderSettings()}
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
