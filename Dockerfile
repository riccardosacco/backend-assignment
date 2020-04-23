# Set node version
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-log.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source into work directory
COPY . .

# Bind to port 3000
EXPOSE 3000

# Start the node server
CMD ["npm","start"]