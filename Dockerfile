# Dockerfile
FROM node:20-alpine

# Set working directory inside container
WORKDIR /usr/src/app

# Copy only the backend code
COPY backend/package*.json ./
RUN npm install

# Copy the rest of the backend source
COPY backend/ .

COPY DockerScripts/docker-copyenv.sh /usr/local/bin/docker-copyenv.sh
RUN chmod +x /usr/local/bin/docker-copyenv.sh

# Expose backend port
EXPOSE 3000

# Start backend server
CMD ["npm", "run", "dev"]
