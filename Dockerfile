# Use Node.js 20 Alpine as the base image for a lightweight container
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies first (leverages Docker cache)
COPY package*.json ./

# Install dependencies (only production if needed, but here we might need dev deps if running via nodemon)
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5050

# Command to run the application
# Use "npm start" which is defined as "nodemon server.js" in package.json
CMD ["npm", "start"]
