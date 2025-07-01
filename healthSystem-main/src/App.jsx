import React, { useState, useEffect } from 'react';
import { AlertTriangle, Users, MapPin, Activity, Phone, MessageSquare, Truck, Shield, TrendingUp, Eye, Bell, X } from 'lucide-react';

const PulseHealthSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', location: 'Gauteng', disease: 'Flu-like symptoms', confidence: 87, trend: 'increasing' },
    { id: 2, type: 'critical', location: 'Western Cape', disease: 'Mpox', confidence: 94, trend: 'stable' },
    { id: 3, type: 'info', location: 'KwaZulu-Natal', disease: 'Cholera risk', confidence: 72, trend: 'decreasing' }
  ]);

  const [communityReports, setCommunityReports] = useState(156);
  const [resourcesDeployed, setResourcesDeployed] = useState(23);
  const [peopleReached, setPeopleReached] = useState(45000);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showMassComModal, setShowMassComModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCommunityReports(prev => prev + Math.floor(Math.random() * 3));
      setPeopleReached(prev => prev + Math.floor(Math.random() * 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDeployResponse = (alertId) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
    showNotificationMessage(`Response team deployed for ${alerts.find(a => a.id === alertId).disease} in ${alerts.find(a => a.id === alertId).location}`);
    setResourcesDeployed(prev => prev + 1);
  };

  const showNotificationMessage = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleDeclareEmergency = () => {
    setShowEmergencyModal(true);
    showNotificationMessage("Emergency protocol initiated");
  };

  const handleMassCommunication = () => {
    setShowMassComModal(true);
    showNotificationMessage("Preparing mass communication channels");
  };

  const handleDeployResources = () => {
    setShowDeployModal(true);
    showNotificationMessage("Resource deployment interface opened");
  };

  const StatCard = ({ icon: Icon, title, value, change, color = "blue" }) => (
    <div className={`stat-card ${color}`}>
      <div className="stat-card-content">
        <div>
          <p className="stat-card-title">{title}</p>
          <p className="stat-card-value">{value}</p>
          {change && (
            <p className={`stat-card-change ${change.includes('+') ? 'positive' : 'negative'}`}>
              {change} from last hour
            </p>
          )}
        </div>
        <Icon className={`stat-card-icon ${color}`} />
      </div>
    </div>
  );

  const AlertCard = ({ alert }) => (
    <div className={`alert-card ${alert.type}`}>
      <div className="alert-card-content">
        <div className="alert-card-main">
          <div className="alert-card-header">
            <AlertTriangle className={`alert-icon ${alert.type}`} />
            <span className="alert-disease">{alert.disease}</span>
          </div>
          <p className="alert-location">
            <MapPin className="location-icon" />
            {alert.location}
          </p>
          <div className="alert-details">
            <span className="alert-confidence">Confidence: {alert.confidence}%</span>
            <span className={`alert-trend ${alert.trend}`}>
              {alert.trend}
            </span>
          </div>
        </div>
        <button 
          onClick={() => handleDeployResponse(alert.id)}
          className="deploy-button"
        >
          Deploy Response
        </button>
      </div>
    </div>
  );

  const CommunityDashboard = () => (
    <div className="community-dashboard">
      <div className="community-banner">
        <h2 className="banner-title">Community Health Rangers Network</h2>
        <p className="banner-subtitle">Empowering communities to be first responders</p>
      </div>
      
      <div className="community-stats-grid">
        <div className="community-stat-card">
          <div className="stat-card-header">
            <h3 className="stat-card-title">Active Rangers</h3>
            <Users className="stat-card-icon green" />
          </div>
          <p className="stat-card-value">2,847</p>
          <p className="stat-card-change positive">+23 new today</p>
        </div>
        
        <div className="community-stat-card">
          <div className="stat-card-header">
            <h3 className="stat-card-title">Reports Today</h3>
            <MessageSquare className="stat-card-icon blue" />
          </div>
          <p className="stat-card-value">{communityReports}</p>
          <p className="stat-card-subtext">Via USSD & WhatsApp</p>
        </div>
        
        <div className="community-stat-card">
          <div className="stat-card-header">
            <h3 className="stat-card-title">Response Time</h3>
            <Activity className="stat-card-icon purple" />
          </div>
          <p className="stat-card-value">12 min</p>
          <p className="stat-card-subtext">Average alert to action</p>
        </div>
      </div>

      <div className="reports-section">
        <h3 className="section-title">Recent Community Reports</h3>
        <div className="reports-list">
          {[
            { time: '2 min ago', location: 'Soweto', message: '3 flu cases reported via *134*4#', status: 'verified' },
            { time: '5 min ago', location: 'Mitchells Plain', message: 'Water quality concern - community well', status: 'investigating' },
            { time: '8 min ago', location: 'Durban Central', message: 'Food poisoning outbreak at local market', status: 'response-sent' }
          ].map((report, idx) => (
            <div key={idx} className={`report-item ${report.status}`}>
              <div>
                <p className="report-message">{report.message}</p>
                <p className="report-meta">{report.location} • {report.time}</p>
              </div>
              <span className={`report-status ${report.status}`}>
                {report.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const PredictiveAnalytics = () => (
    <div className="analytics-dashboard">
      <div className="analytics-banner">
        <h2 className="banner-title">AI Predictive Engine</h2>
        <p className="banner-subtitle">Early warning system powered by multiple data sources</p>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3 className="section-title">Risk Heat Map</h3>
          <div className="heat-map-grid">
            {[
              { province: 'Western Cape', risk: 'high' },
              { province: 'Gauteng', risk: 'medium' },
              { province: 'KwaZulu-Natal', risk: 'low' },
              { province: 'Eastern Cape', risk: 'medium' },
              { province: 'Free State', risk: 'low' },
              { province: 'Limpopo', risk: 'high' },
              { province: 'Mpumalanga', risk: 'low' },
              { province: 'North West', risk: 'medium' },
              { province: 'Northern Cape', risk: 'low' }
            ].map((area, idx) => (
              <div key={idx} className={`heat-map-item ${area.risk}`}>
                {area.province}
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-card">
          <h3 className="section-title">Data Sources</h3>
          <div className="data-sources-list">
            {[
              { source: 'Satellite Weather Data', status: 'active', confidence: 96 },
              { source: 'Social Media Sentiment', status: 'active', confidence: 87 },
              { source: 'Hospital Admissions', status: 'active', confidence: 94 },
              { source: 'Mobile Network Data', status: 'active', confidence: 89 },
              { source: 'Environmental Sensors', status: 'limited', confidence: 72 }
            ].map((source, idx) => (
              <div key={idx} className="data-source-item">
                <span className="source-name">{source.source}</span>
                <div className="source-meta">
                  <span className="source-confidence">{source.confidence}%</span>
                  <div className={`source-status ${source.status}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="predictions-section">
        <h3 className="section-title">Outbreak Predictions (Next 14 Days)</h3>
        <div className="predictions-list">
          {[
            { disease: 'Seasonal Flu', probability: 78, timeframe: '5-7 days', location: 'Johannesburg Metro' },
            { disease: 'Gastroenteritis', probability: 45, timeframe: '10-12 days', location: 'Cape Town CBD' },
            { disease: 'Respiratory Illness', probability: 62, timeframe: '3-5 days', location: 'Durban Industrial' }
          ].map((prediction, idx) => (
            <div key={idx} className="prediction-item">
              <div>
                <p className="prediction-disease">{prediction.disease}</p>
                <p className="prediction-meta">{prediction.location} • {prediction.timeframe}</p>
              </div>
              <div className="prediction-probability">
                <p className="probability-value">{prediction.probability}%</p>
                <p className="probability-label">probability</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ResourceManagement = () => (
    <div className="resources-dashboard">
      <div className="resources-banner">
        <h2 className="banner-title">Smart Resource Distribution</h2>
        <p className="banner-subtitle">Blockchain-verified supply chain management</p>
      </div>

      <div className="resources-stats-grid">
        <StatCard icon={Truck} title="Active Deployments" value={resourcesDeployed} change="+3 last hour" color="orange" />
        <StatCard icon={Shield} title="Medical Supplies" value="847" change="+12 restocked" color="green" />
        <StatCard icon={Users} title="People Reached" value={peopleReached.toLocaleString()} change="+2,340 today" color="blue" />
      </div>

      <div className="resources-grid">
        <div className="resources-card">
          <h3 className="section-title">Supply Chain Status</h3>
          <div className="supply-list">
            {[
              { item: 'N95 Masks', stock: 85, location: 'Gauteng Warehouse', status: 'sufficient' },
              { item: 'Rapid Test Kits', stock: 23, location: 'Western Cape Hub', status: 'low' },
              { item: 'Vaccines', stock: 67, location: 'KZN Distribution', status: 'sufficient' },
              { item: 'Hand Sanitizer', stock: 12, location: 'Eastern Cape', status: 'critical' }
            ].map((item, idx) => (
              <div key={idx} className="supply-item">
                <div>
                  <p className="supply-name">{item.item}</p>
                  <p className="supply-location">{item.location}</p>
                </div>
                <div className="supply-meta">
                  <p className="supply-stock">{item.stock}%</p>
                  <span className={`supply-status ${item.status}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="resources-card">
          <h3 className="section-title">Auto-Distribution Queue</h3>
          <div className="distribution-list">
            {[
              { priority: 'High', destination: 'Mitchells Plain Clinic', eta: '45 min', items: 'Test kits, Masks' },
              { priority: 'Medium', destination: 'Soweto Hospital', eta: '1.2 hrs', items: 'Sanitizer, Gloves' },
              { priority: 'High', destination: 'Durban Port Health', eta: '2.1 hrs', items: 'Vaccines, Syringes' }
            ].map((delivery, idx) => (
              <div key={idx} className="delivery-item">
                <div>
                  <div className="delivery-header">
                    <span className={`delivery-priority ${delivery.priority}`}>
                      {delivery.priority}
                    </span>
                    <p className="delivery-destination">{delivery.destination}</p>
                  </div>
                  <p className="delivery-items">{delivery.items}</p>
                </div>
                <p className="delivery-eta">ETA: {delivery.eta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    
    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <button onClick={onClose} className="modal-close-button">
              <X className="modal-close-icon" />
            </button>
          </div>
          <div className="modal-content">
            {children}
          </div>
          <div className="modal-footer">
            <button 
              onClick={onClose}
              className="modal-button cancel"
            >
              Cancel
            </button>
            <button 
              onClick={() => {
                onClose();
                showNotificationMessage(`${title} action confirmed`);
              }}
              className="modal-button confirm"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      {/* Notification */}
      {showNotification && (
        <div className="notification">
          <Bell className="notification-icon" />
          <p>{notificationMessage}</p>
          <button 
            onClick={() => setShowNotification(false)}
            className="notification-close"
          >
            <X className="notification-close-icon" />
          </button>
        </div>
      )}

      {/* Modals */}
      <Modal 
        isOpen={showEmergencyModal} 
        onClose={() => setShowEmergencyModal(false)}
        title="Declare Emergency"
      >
        <div className="modal-content-section">
          <p className="modal-text">You are about to activate emergency protocols. This will:</p>
          <ul className="modal-list">
            <li>Notify all regional health authorities</li>
            <li>Activate emergency response teams</li>
            <li>Trigger resource allocation protocols</li>
            <li>Send public health alerts</li>
          </ul>
          <div className="modal-input-section">
            <label className="modal-label">Emergency Level:</label>
            <select className="modal-select">
              <option>Level 1 - Monitoring</option>
              <option>Level 2 - Alert</option>
              <option>Level 3 - Emergency</option>
              <option>Level 4 - Critical</option>
            </select>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={showMassComModal} 
        onClose={() => setShowMassComModal(false)}
        title="Mass Communication"
      >
        <div className="modal-content-section">
          <div>
            <label className="modal-label">Message Type:</label>
            <select className="modal-select">
              <option>Public Health Advisory</option>
              <option>Disease Outbreak Alert</option>
              <option>Prevention Guidelines</option>
              <option>Resource Availability</option>
            </select>
          </div>
          <div>
            <label className="modal-label">Target Regions:</label>
            <div className="regions-grid">
              {['Western Cape', 'Gauteng', 'KwaZulu-Natal', 'Eastern Cape', 'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape'].map(region => (
                <label key={region} className="region-item">
                  <input type="checkbox" className="region-checkbox" />
                  {region}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="modal-label">Message:</label>
            <textarea 
              className="modal-textarea"
              placeholder="Enter your emergency message..."
            />
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={showDeployModal} 
        onClose={() => setShowDeployModal(false)}
        title="Deploy Resources"
      >
        <div className="modal-content-section">
          <div>
            <label className="modal-label">Resource Type:</label>
            <select className="modal-select">
              <option>Medical Team</option>
              <option>Testing Kits</option>
              <option>Vaccines</option>
              <option>Protective Equipment</option>
              <option>Medication</option>
            </select>
          </div>
          <div>
            <label className="modal-label">Quantity:</label>
            <input 
              type="number" 
              className="modal-input"
              defaultValue="1"
              min="1"
            />
          </div>
          <div>
            <label className="modal-label">Destination:</label>
            <select className="modal-select">
              <option>Western Cape</option>
              <option>Gauteng</option>
              <option>KwaZulu-Natal</option>
              <option>Eastern Cape</option>
              <option>Free State</option>
              <option>Limpopo</option>
              <option>Mpumalanga</option>
              <option>North West</option>
              <option>Northern Cape</option>
            </select>
          </div>
          <div>
            <label className="modal-label">Priority:</label>
            <div className="priority-options">
              <label className="priority-option">
                <input type="radio" name="priority" className="priority-radio" defaultChecked />
                High
              </label>
              <label className="priority-option">
                <input type="radio" name="priority" className="priority-radio" />
                Medium
              </label>
              <label className="priority-option">
                <input type="radio" name="priority" className="priority-radio" />
                Low
              </label>
            </div>
          </div>
        </div>
      </Modal>

      {/* Header */}
      <div className="app-header">
        <div className="header-container">
          <div className="header-logo">
            <div className="logo-icon-container">
              <Activity className="logo-icon" />
            </div>
            <div>
              <h1 className="logo-title">PULSE</h1>
              <p className="logo-subtitle">Predictive Unified Life-Saving Emergency System</p>
            </div>
          </div>
          <div className="header-controls">
            <div className="status-indicator">
              <div className="status-dot"></div>
              <span className="status-text">System Active</span>
            </div>
            <button 
              onClick={() => {
                setNotificationMessage("You have 3 unread notifications");
                setShowNotification(true);
              }}
              className="notifications-button"
            >
              <Bell className="notifications-icon" />
              <span className="notifications-badge">
                3
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="app-navigation">
        <div className="nav-container">
          <nav className="nav-menu">
            {[
              { id: 'dashboard', label: 'Emergency Dashboard', icon: Eye },
              { id: 'community', label: 'Community Rangers', icon: Users },
              { id: 'analytics', label: 'Predictive Analytics', icon: TrendingUp },
              { id: 'resources', label: 'Resource Management', icon: Truck }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            {/* Stats Grid */}
            <div className="stats-grid">
              <StatCard icon={AlertTriangle} title="Active Alerts" value={alerts.length} change="+1 last hour" color="red" />
              <StatCard icon={Users} title="Community Rangers" value="2,847" change="+23 today" color="green" />
              <StatCard icon={Activity} title="Avg Response Time" value="12 min" change="-3 min improvement" color="blue" />
              <StatCard icon={Shield} title="Lives Protected" value="45,000" color="purple" />
            </div>

            {/* Active Alerts */}
            <div className="alerts-section">
              <h2 className="section-title">Active Health Alerts</h2>
              <div className="alerts-list">
                {alerts.map(alert => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="actions-section">
              <h2 className="section-title">Emergency Quick Actions</h2>
              <div className="actions-grid">
                <button 
                  onClick={handleDeclareEmergency}
                  className="action-button emergency"
                >
                  <AlertTriangle className="action-icon" />
                  Declare Emergency
                </button>
                <button 
                  onClick={handleMassCommunication}
                  className="action-button communication"
                >
                  <MessageSquare className="action-icon" />
                  Mass Communication
                </button>
                <button 
                  onClick={handleDeployResources}
                  className="action-button deploy"
                >
                  <Truck className="action-icon" />
                  Deploy Resources
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'community' && <CommunityDashboard />}
        {activeTab === 'analytics' && <PredictiveAnalytics />}
        {activeTab === 'resources' && <ResourceManagement />}
      </div>
    </div>
  );
};

export default PulseHealthSystem;