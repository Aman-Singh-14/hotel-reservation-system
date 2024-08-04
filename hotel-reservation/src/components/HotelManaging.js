// src/components/HotelMenu.js
import React, { useState } from 'react';
import ReservationList from './ReservationList';
import AvailableRooms from './AvailableRooms';
import CustomerList from './CustomerList';
import '../App.css';
import ServiceRequests from './ServiceRequests';

const HotelMenu = () => {
  const [activeTab, setActiveTab] = useState('reservations');

  return (
    <div>
      <h1>Hotel Management</h1>
      <div className="tabs">
        <button
          className={activeTab === 'reservations' ? 'active' : ''}
          onClick={() => setActiveTab('reservations')}
        >
          Reservations
        </button>
        <button
          className={activeTab === 'availableRooms' ? 'active' : ''}
          onClick={() => setActiveTab('availableRooms')}
        >
          Available Rooms
        </button>
        <button
          className={activeTab === 'customers' ? 'active' : ''}
          onClick={() => setActiveTab('customers')}
        >
          Customers
        </button>
        <button
          className={activeTab === 'serviceRequests' ? 'active' : ''}
          onClick={() => setActiveTab('serviceRequests')}
        >
          Service Requests
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'reservations' && <ReservationList />}
        {activeTab === 'availableRooms' && <AvailableRooms />}
        {activeTab === 'customers' && <CustomerList />}
        {activeTab === 'serviceRequests' && <ServiceRequests />}
      </div>
    </div>
  );
};

export default HotelMenu;
