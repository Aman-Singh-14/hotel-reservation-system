import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateCustomerForm from './UpdateCustomerForm';
import '../App.css'; // Make sure to import your CSS file

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios.get('http://localhost:3001/customers')
      .then(response => {
        setCustomers(response.data);
        setFilteredCustomers(response.data); // Initially display all customers
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = customers.filter(customer => {
      return (
        customer.GuestID.toString().includes(query) ||
        customer.FirstName.toLowerCase().includes(query) ||
        customer.LastName.toLowerCase().includes(query) ||
        customer.ContactNumber.includes(query)
      );
    });

    setFilteredCustomers(filtered);
  };

  const handleUpdate = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleCloseForm = () => {
    setSelectedCustomer(null);
  };

  const handleUpdateSuccess = () => {
    fetchCustomers(); // Refresh the customer list
  };

  return (
    <div>
      <h2>Customers</h2>
      <input
        type="text"
        placeholder="Search by ID, Name, or Phone"
        value={searchQuery}
        onChange={handleSearch}
      />
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Guest ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCustomers.map(customer => (
            <tr key={customer.GuestID}>
              <td>{customer.GuestID}</td>
              <td>{customer.FirstName}</td>
              <td>{customer.LastName}</td>
              <td>{customer.ContactNumber}</td>
              <td>{customer.Email}</td>
              <td>
                <button onClick={() => handleUpdate(customer)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCustomer && (
        <UpdateCustomerForm
          customer={selectedCustomer}
          onClose={handleCloseForm}
          onUpdate={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default CustomerList;
