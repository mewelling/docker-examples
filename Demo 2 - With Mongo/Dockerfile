FROM node:8-alpine

## Create app directory
WORKDIR /usr/src/app
COPY package.json .
RUN npm install

# Set NODE_ENV for testing
# ENV NODE_ENV development

# Bundle app source
COPY . .

CMD [ "node", "app" ]