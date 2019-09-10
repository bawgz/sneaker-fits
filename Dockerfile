FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

COPY docker-entrypoint-initdb.d /docker-entrypoint-initdb.d

EXPOSE 8080

RUN ls