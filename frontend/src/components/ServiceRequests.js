import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const ServiceRequestList = () => {
  const [serviceRequests, setServiceRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'RoomID', direction: 'asc' });

  useEffect(() => {
    fetchServiceRequests();
  }, []);

  const fetchServiceRequests = () => {
    axios.get('http://localhost:3001/service-requests')
      .then(response => {
        setServiceRequests(response.data);
        setFilteredRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching service requests:', error);
      });
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = serviceRequests.filter(request => {
      return (
        request.ServiceRequestID.toString().includes(query) ||
        request.ServiceName.toLowerCase().includes(query) ||
        request.StaffName.toLowerCase().includes(query) ||
        request.RoomID.toString().includes(query)
      );
    });

    setFilteredRequests(filtered);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredRequests].sort((a, b) => {
      if (key === 'RoomID') {
        return direction === 'asc' ? a.RoomID - b.RoomID : b.RoomID - a.RoomID;
      } else {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
      }
    });

    setFilteredRequests(sorted);
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div>
      <h2>Service Requests</h2>
      <input
        type="text"
        placeholder="Search by ID, Room Number, Service Name, or Staff Name"
        value={searchQuery}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('ServiceRequestID')} style={{ cursor: 'pointer' }}>
            Service Request ID {sortConfig.key === 'ServiceRequestID' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('RoomID')} style={{ cursor: 'pointer' }}>
              Room Number {sortConfig.key === 'RoomID' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th onClick={() => handleSort('ServiceName')} style={{ cursor: 'pointer' }}>
              Service Name {sortConfig.key === 'ServiceName' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
            </th>
            <th>Staff Name</th>
            <th>Request DateTime</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map(request => (
            <tr key={request.ServiceRequestID}>
              <td>{request.ServiceRequestID}</td>
              <td>{request.RoomID}</td>
              <td>{request.ServiceName}</td>
              <td>{request.StaffName}</td>
              <td>{formatDate(request.RequestDateTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceRequestList;
