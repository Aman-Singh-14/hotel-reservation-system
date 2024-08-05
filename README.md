# Hotel Management System - Docker

## Overview

This project includes a hotel management system with a front-end built in React, a back-end with Node.js, and a MySQL database. 
The entire setup is containerized using Docker for easy deployment and sharing.

Use Cases and Testing: @Aman-Singh-14
Frontend, backend Development: @etarakoem
Database Optimizer: @mohitramnani

## Prerequisites

- **Docker**: Ensure Docker is installed on your machine. Download and install Docker from [docker.com](https://www.docker.com/get-started).
- **npm**: If you aren't using Docker, install npm on your machine
- **Docker Compose**: Comes with Docker Desktop or can be installed separately if needed.

## npm Setup Instructions:

```
git clone https://github.com/etarakoem/hotel-reservation-system.git
```

Require mysql db. The whole db info can be viewed via [hotel-reservation-system/init-db/init.sql](https://github.com/etarakoem/hotel-reservation-system/blob/main/init-db/init.sql)

Run the backend in 1 terminal:

```
cd hotel-reservation-system/backend
npm start
```

Open another terminal to run the frontend:

```
cd hotel-reservation-system/frontend
npm start
```

Checkout the website on `localhost:3000`

## Docker Setup Instructions

### 1. Download and Extract the Project

1. **Download** the zip file containing the project.
2. **Extract** the zip file to a directory of your choice.

### 2. Navigate to the Project Directory

Open a terminal or Command Prompt and navigate to the extracted project directory.

```
cd path/to/your/extracted/project
```

### 3. Build and Start the Docker Containers

Run the following command to build and start the Docker containers using Docker Compose. This command will set up the front-end, back-end, and MySQL database.

```
docker-compose up --build
```

### 4. Access the Application

- **Front-end**: Open a web browser and go to `http://localhost:3000` to access the React front-end.
- **Back-end API**: The API will be available at `http://localhost:3001`.

### 5. Database Initialization

The MySQL database will be initialized automatically by Docker using the `init.sql` script provided in the `docker/mysql` directory. This script creates the necessary tables and inserts initial data.

### 6. Stopping the Containers

To stop the Docker containers, run the following command in the terminal:

```
docker-compose down
```

### 7. Additional Commands

- **Check Container Logs**: To view logs of the running containers, use:

  ```
  docker-compose logs
  ```
- **Access MySQL Database**: You can access the MySQL database using a MySQL client. The credentials are:

  - **Host**: `localhost`
  - **User**: `root`
  - **Password**: (empty)

  Use a MySQL client like MySQL Workbench or the `mysql` command-line tool to connect.

### 8. Troubleshooting

- **Ports**: Ensure that ports `3000` (React) and `3001` (API) are not being used by other applications.
- **Docker Errors**: If you encounter errors, check the container logs for more details using `docker-compose logs`.

## Contributing

- Use Cases and Testing: @Aman-Singh-14
- Frontend, backend Development: @etarakoem
- Database Optimizer: @mohitramnani

Feel free to contribute to this project by submitting issues or pull requests.

## License

This project is licensed under the MIT License.
