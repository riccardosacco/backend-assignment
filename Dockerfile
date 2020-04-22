# Set node version
FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-log.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source into work directory
COPY . .

# Bind to port 8080
EXPOSE 8080

# Start the node server
CMD ["npm","start"]