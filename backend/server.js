const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001;

// Middleware
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ccps610'
});

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Fetch all reservations
app.get('/reservations', (req, res) => {
    db.query('SELECT * FROM Reservation', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

// Add a new reservation
app.post('/reservations', (req, res) => {
    const { ReservationID, GuestID, RoomNumber, CheckInDate, CheckOutDate } = req.body;
  
    const query = 'INSERT INTO Reservation (ReservationID, GuestID, RoomNumber, CheckInDate, CheckOutDate) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [ReservationID, GuestID, RoomNumber, CheckInDate, CheckOutDate], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Reservation added successfully!' });
    });
  });
// Update reservation
app.put('/reservations/:id', (req, res) => {
    const reservationId = req.params.id;
    const { GuestID, RoomNumber, CheckInDate, CheckOutDate } = req.body;
  
    if (!GuestID || !RoomNumber || !CheckInDate || !CheckOutDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const query = `
      UPDATE Reservation
      SET GuestID = ?, RoomNumber = ?, CheckInDate = ?, CheckOutDate = ?
      WHERE ReservationID = ?
    `;
  
    db.query(query, [GuestID, RoomNumber, CheckInDate, CheckOutDate, reservationId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Reservation updated successfully' });
    });
  });
  

// Fetch all staff
app.get('/staff', (req, res) => {
    db.query('SELECT * FROM Staff', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

// Delete a staff member
app.delete('/staff/:id', (req, res) => {
    const staffId = req.params.id;
    
    const query = 'DELETE FROM Staff WHERE StaffID = ?';
    db.query(query, [staffId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Staff member fired successfully!' });
    });
  });
  
// Add a new staff member
app.post('/staff', (req, res) => {
    const { StaffName, Position, ContactInfo } = req.body;
    
    const query = 'INSERT INTO Staff (StaffName, Position, ContactInfo) VALUES (?, ?, ?)';
    db.query(query, [StaffName, Position, ContactInfo], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Staff hired successfully!' });
    });
  });

  // Check available rooms based on date range
app.get('/available-rooms', (req, res) => {
    const { checkInDate, checkOutDate } = req.query;
  
    const query = `
      SELECT RoomNumber, Status
      FROM Room
      WHERE RoomNumber NOT IN (
        SELECT RoomNumber
        FROM Reservation
        WHERE (CheckInDate <= ? AND CheckOutDate >= ?)
      )
    `;
  
    db.query(query, [checkOutDate, checkInDate], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  
  // Add a new reservation
  app.post('/reservations', (req, res) => {
    const { GuestID, RoomNumber, CheckInDate, CheckOutDate } = req.body;
    
    // Validate the input
    if (!GuestID || !RoomNumber || !CheckInDate || !CheckOutDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const query = 'INSERT INTO Reservation (GuestID, RoomNumber, CheckInDate, CheckOutDate) VALUES (?, ?, ?, ?)';
    const values = [GuestID, RoomNumber, CheckInDate, CheckOutDate];
  
    db.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Reservation added successfully' });
    });
  });
  
  
  // Fetch all rooms
  app.get('/rooms', (req, res) => {
    db.query('SELECT * FROM Room', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });

  // Add a new room
app.post('/rooms', (req, res) => {
    const { RoomNumber, RoomCat, Capacity, Status, Price } = req.body;
  
    // Insert new room into the database
    const query = 'INSERT INTO Room (RoomNumber, RoomCat, Capacity, Status, Price) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [RoomNumber, RoomCat, Capacity, Status, Price], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Room added successfully!' });
    });
  });
  
  
  // Fetch all room categories
  app.get('/room-categories', (req, res) => {
    db.query('SELECT * FROM RoomCategory', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  
// Assuming you are using Express
app.get('/customers', (req, res) => {
    db.query('SELECT * FROM Guest', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
// Update customer endpoint
app.put('/customers/:id', (req, res) => {
    const { id } = req.params;
    const { FirstName, LastName, ContactNumber, Email } = req.body;
    const sql = `
      UPDATE Guest
      SET FirstName = ?, LastName = ?, ContactNumber = ?, Email = ?
      WHERE GuestID = ?
    `;
    db.query(sql, [FirstName, LastName, ContactNumber, Email, id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Customer updated successfully' });
    });
  });  

// Add a new guest
app.post('/guests', (req, res) => {
    const { FirstName, LastName, ContactNumber, Email } = req.body;
    
    // Validate the input
    if (!FirstName || !LastName || !ContactNumber || !Email) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const query = 'INSERT INTO Guest (FirstName, LastName, ContactNumber, Email) VALUES (?, ?, ?, ?)';
    const values = [FirstName, LastName, ContactNumber, Email];
  
    db.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Guest added successfully', guestId: results.insertId });
    });
  });
  
// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
