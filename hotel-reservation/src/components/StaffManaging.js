import React, { useState } from 'react';
import HiringForm from './HiringForm';
import StaffList from './StaffList';
import '../App.css';

const StaffManagement = () => {
  const [activeTab, setActiveTab] = useState('hire');

  return (
    <div>
      <h1>Staff Management</h1>
      <div className="tabs">
        <button className={activeTab === 'hire' ? 'active' : ''} onClick={() => setActiveTab('hire')}>
          Hire Staff
        </button>
        <button className={activeTab === 'list' ? 'active' : ''} onClick={() => setActiveTab('list')}>
          Staff List
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'hire' && <HiringForm />}
        {activeTab === 'list' && <StaffList />}
      </div>
    </div>
  );
};

export default StaffManagement;
