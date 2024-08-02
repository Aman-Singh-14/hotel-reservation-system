import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [error, setError] = useState(null);
  const [sortColumn, setSortColumn] = useState('StaffID'); // Default sort column
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = () => {
    axios.get('http://localhost:3001/staff')
      .then(response => {
        setStaff(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleFire = (staffID) => {
    axios.delete(`http://localhost:3001/staff/${staffID}`)
      .then(() => {
        fetchStaff(); // Refresh the staff list
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc'); // Default to ascending if a new column is sorted
    }
  };

  // Function to sort data based on sortColumn and sortOrder
  const sortedStaff = [...staff].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortColumn] > b[sortColumn]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <h1>Staff Management</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('StaffID')}>
              Staff ID {sortColumn === 'StaffID' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th onClick={() => handleSort('StaffName')}>
              Staff Name {sortColumn === 'StaffName' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th>Position</th>
            <th>Contact Info</th>
            <th>Fire</th>
          </tr>
        </thead>
        <tbody>
          {sortedStaff.map(staffMember => (
            <tr key={staffMember.StaffID}>
              <td>{staffMember.StaffID}</td>
              <td>{staffMember.StaffName}</td>
              <td>{staffMember.Position}</td>
              <td>{staffMember.ContactInfo}</td>
              <td>
                <button class="fire" onClick={() => handleFire(staffMember.StaffID)}>Fire</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;