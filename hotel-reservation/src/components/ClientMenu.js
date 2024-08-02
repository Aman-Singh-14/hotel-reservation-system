import React, { useState } from 'react';
import RegisterNewClient from './RegisterNewClient';
import ReserveRoom from './ReserveRoom';
import '../App.css';

const ClientMenu = () => {
  const [activeTab, setActiveTab] = useState('register');

  return (
    <div>
      <h1>Client Menu</h1>
      <div className="tabs">
        <button className={activeTab === 'register' ? 'active' : ''} onClick={() => setActiveTab('register')}>
          Register New Client
        </button>
        <button className={activeTab === 'reserve' ? 'active' : ''} onClick={() => setActiveTab('reserve')}>
          Reserve Room
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'register' && <RegisterNewClient />}
        {activeTab === 'reserve' && <ReserveRoom />}
      </div>
    </div>
  );
};

export default ClientMenu;
