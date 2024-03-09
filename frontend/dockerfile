# Use the official Node.js image as base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Expose the port your application runs on
EXPOSE 5173

# Command to run your application
CMD ["npm", "run", "dev"]
