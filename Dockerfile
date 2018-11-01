FROM node:10.12-alpine

WORKDIR /usr/src/sigpix

COPY package*.json /usr/src/sigpix/
RUN npm install --only=production
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]

