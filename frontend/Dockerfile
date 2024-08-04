# Use the official Node.js image for the build stage
FROM node:18 AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN npm run build

# Use the official Nginx image to serve the build
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the port Nginx is running on
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
