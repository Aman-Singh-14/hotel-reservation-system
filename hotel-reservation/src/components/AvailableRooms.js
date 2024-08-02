// src/components/AvailableRooms.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const AvailableRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRooms();
    fetchReservations();
  }, []);

  useEffect(() => {
    filterRooms();
  }, [rooms, reservations, startDate, endDate]);

  const fetchRooms = () => {
    axios.get('http://localhost:3001/rooms')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const fetchReservations = () => {
    axios.get('http://localhost:3001/reservations')
      .then(response => {
        setReservations(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  };

  const isRoomUnavailable = (room) => {
    return reservations.some(reservation => {
      const checkIn = new Date(reservation.CheckInDate);
      const checkOut = new Date(reservation.CheckOutDate);
      const start = new Date(startDate);
      const end = new Date(endDate);

      return room.RoomNumber === reservation.RoomNumber && (
        (start < checkOut && end > checkIn)
      );
    });
  };

  const filterRooms = () => {
    setFilteredRooms(rooms.map(room => ({
      ...room,
      Status: isRoomUnavailable(room) ? 'Unavailable' : 'Available'
    })));
  };

  return (
    <div>
      <h2>All Rooms</h2>
      <div className="filter-form">
        <label>Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </div>
      {error && <p>Error: {error}</p>}
      <table>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Capacity</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map(room => (
            <tr key={room.RoomNumber}>
              <td>{room.RoomNumber}</td>
              <td>{room.Capacity}</td>
              <td>{room.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableRooms;
