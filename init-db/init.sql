-- Drop existing tables
DROP TABLE IF EXISTS ServiceRequest;
DROP TABLE IF EXISTS PaymentTransaction;
DROP TABLE IF EXISTS Reservation;
DROP TABLE IF EXISTS Guest;
DROP TABLE IF EXISTS Service;
DROP TABLE IF EXISTS Room;
DROP TABLE IF EXISTS RoomCategory;
DROP TABLE IF EXISTS Staff;
DROP TABLE IF EXISTS StaffSalary;

-- Create tables
CREATE TABLE Guest (
    GuestID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    ContactNumber VARCHAR(20),
    Email VARCHAR(255)
);

CREATE TABLE RoomCategory (
    RoomCatID INT PRIMARY KEY AUTO_INCREMENT,
    CatName VARCHAR(255),
    Description VARCHAR(255),
    Facilities VARCHAR(255),
    PriceRange VARCHAR(50)
);

CREATE TABLE Room (
    RoomNumber INT PRIMARY KEY,
    RoomCat INT,
    Capacity INT,
    Status VARCHAR(50),
    Price DECIMAL(10, 2),
    FOREIGN KEY (RoomCat) REFERENCES RoomCategory(RoomCatID)
);

CREATE TABLE Reservation (
    ReservationID INT PRIMARY KEY AUTO_INCREMENT,
    GuestID INT,
    RoomNumber INT,
    CheckInDate DATE,
    CheckOutDate DATE,
    FOREIGN KEY (GuestID) REFERENCES Guest(GuestID),
    FOREIGN KEY (RoomNumber) REFERENCES Room(RoomNumber)
);

CREATE TABLE Service (
    ServiceID INT PRIMARY KEY AUTO_INCREMENT,
    ServiceName VARCHAR(255),
    Description VARCHAR(255),
    Price DECIMAL(10, 2),
    Availabilities INT,
    DurationMins INT
);

CREATE TABLE StaffSalary (
    Position VARCHAR(255) PRIMARY KEY,
    Salary DECIMAL(8, 2)
);

CREATE TABLE Staff (
    StaffID INT PRIMARY KEY AUTO_INCREMENT,
    StaffName VARCHAR(255),
    Position VARCHAR(255),
    ContactInfo VARCHAR(255),
    FOREIGN KEY (Position) REFERENCES StaffSalary(Position)
);

CREATE TABLE PaymentTransaction (
    TransactionID INT PRIMARY KEY AUTO_INCREMENT,
    ReservationID INT,
    Amount DECIMAL(10, 2),
    TransactionDate DATE,
    PaymentMethod VARCHAR(255),
    FOREIGN KEY (ReservationID) REFERENCES Reservation(ReservationID)
);

CREATE TABLE ServiceRequest (
    ServiceRequestID INT PRIMARY KEY AUTO_INCREMENT,
    ServiceID INT,
    StaffAssignedID INT,
    RoomID INT,
    RequestDateTime DATE,
    FOREIGN KEY (ServiceID) REFERENCES Service(ServiceID),
    FOREIGN KEY (StaffAssignedID) REFERENCES Staff(StaffID),
    FOREIGN KEY (RoomID) REFERENCES Room(RoomNumber)
);

-- Insert initial data
INSERT INTO RoomCategory (RoomCatID, CatName, Description, Facilities, PriceRange) VALUES
(1, 'single', 'for single person, small room', '1 queen bed, full washroom, refrigerator, TV', '$200 - $300'),
(2, 'double', 'for couple or family', '2 queen beds, full washroom, refrigerator, TV', '$400 - $600'),
(3, 'master', 'for the whole party', '4 queen bed, 2 full washroom, refrigerator, TV', '$800 - $1200');

INSERT INTO Service (ServiceID, ServiceName, Description, Price, Availabilities, DurationMins) VALUES
(1, 'cleaning', 'room cleaning excluding the ones before checkin and after checkout', 50, 1, 30),
(2, 'breakfast', 'breakfast room service from the hotel restaurant menu', 30, 1, NULL),
(3, 'lunch', 'lunch room service from the hotel restaurant menu', 50, 1, NULL),
(4, 'dinner', 'dinner room service from the hotel restaurant menu', 75, 1, NULL),
(5, 'room inspection', 'room inspection for checkin and checkout on hotel cost', 80, 1, 60),
(6, 'food refill', 'cost for refilling snacks and/or drinks from the room (per item)', 10, 1, 5);

INSERT INTO StaffSalary (Position, Salary) VALUES
('General Staff', 32000),
('Manager', 50000),
('Inspection Staff', 40000),
('DB Admin', 50000),
('Receptionist', 36000);

INSERT INTO Staff (StaffID, StaffName, Position, ContactInfo) VALUES
(1, 'Victor Valdes', 'General Staff', '6479252658'),
(2, 'Gerrard Pique', 'General Staff', '4160163296'),
(3, 'Carles Puyol', 'General Staff', '6479164298'),
(4, 'Dani Alves', 'General Staff', '4167123654'),
(5, 'Jordi Alba', 'Inspection Staff', '6470981237'),
(6, 'Andres Iniesta', 'Inspection Staff', '4166143218'),
(7, 'Xavi', 'Manager', '6479094545'),
(8, 'David Villa', 'DB Admin', '4165438412'),
(9, 'Pedro Rodrigues', 'Receptionist', '6759081265'),
(10, 'Sergio Busquets', 'Receptionist', '1238765226');

INSERT INTO Guest (GuestID, FirstName, LastName, ContactNumber, Email) VALUES
(1, 'Jack', 'Grealish', '8769738964', 'jgrea@gmail.com'),
(2, 'James', 'Madisson', '1535542865', 'jmadi@gmail.com'),
(3, 'Mary', 'Williamson', '9535221378', 'mwill@gmail.com'),
(4, 'Elizabeth', 'Bell', '4215738346', 'ebell@gmail.com'),
(5, 'Jennifer', 'Bell', '5362582190', 'jbell@gmail.com'),
(6, 'Mark', 'Cain', '3298575348', 'mcain@gmail.com'),
(7, 'Thomas', 'Muller', '3467088324', 'tmull@hotmail.com'),
(8, 'Vincent', 'Van Dijk', '5007535267', 'vvand@gmail.com'),
(9, 'Matt', 'Chapman', '1245790975', 'mchap@yahoo.com'),
(10, 'Troy', 'Barnes', '8084523178', 'tbarn@hotmail.com');

INSERT INTO Room (RoomNumber, RoomCat, Capacity, Status, Price) VALUES
(1, 3, 10, 'available', 1000.00),
(2, 2, 4, 'available', 500.00),
(3, 1, 2, 'available', 250.00),
(45, 2, 4, 'available', 550.00),
(34, 1, 2, 'available', 275.00),
(96, 3, 10, 'available', 1100.00);

INSERT INTO Reservation (ReservationID, GuestID, RoomNumber, CheckInDate, CheckOutDate) VALUES
(1, 1, 1, '2024-02-01', '2024-02-03'),
(2, 2, 2, '2024-06-12', '2024-06-17'),
(3, 3, 3, '2024-04-27', '2024-05-01'),
(4, 6, 45, '2024-10-07', '2024-10-10'),
(5, 8, 34, '2024-05-02', '2024-05-16'),
(6, 10, 96, '2024-08-01', '2024-08-02');

-- PaymentTransaction table should be created before updating
CREATE TABLE PaymentTransaction (
    TransactionID INT PRIMARY KEY AUTO_INCREMENT,
    ReservationID INT,
    Amount DECIMAL(10, 2),
    TransactionDate DATE,
    PaymentMethod VARCHAR(255),
    FOREIGN KEY (ReservationID) REFERENCES Reservation(ReservationID)
);

-- Insert sample payment transactions
INSERT INTO PaymentTransaction (TransactionID, ReservationID, Amount, TransactionDate, PaymentMethod) VALUES
(1, 1, 1000.00, '2024-02-01', 'cash'),
(2, 2, 500.00, '2024-06-12', 'credit'),
(3, 3, 250.00, '2024-04-27', 'cash'),
(4, 4, 550.00, '2024-10-07', 'debit'),
(5, 5, 275.00, '2024-05-02', 'credit'),
(6, 6, 1100.00, '2024-08-01', 'credit');
