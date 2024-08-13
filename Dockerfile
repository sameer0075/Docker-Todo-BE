# Use the official Node.js 18 Alpine image as the base
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install --production

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will run on
EXPOSE 3002

# Define the command to run the application
CMD ["npm", "run" , "start:dev"]
