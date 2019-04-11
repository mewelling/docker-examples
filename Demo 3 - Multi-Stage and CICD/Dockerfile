# For Production builds, we want to install all our Production
# dependancies separately, first. That way we can create lean
# production builds separately by using: 
#
# `docker build --target production -t demo4-prod .`

FROM node:10-alpine as production

## Install production dependancies
ENV NODE_ENV production
WORKDIR /usr/src/app 
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# How we run our app in production
CMD [ "npm", "start" ]




# Now before we deploy our production app, we want to make sure
# that our CICD will be testing the production image fully.
# We do that by leveraging a multi-stage build that pulls 
# from our original production build.
#
# `docker build -t demo4 .`

FROM node:10-alpine as testing
WORKDIR /usr/src/app 

# Copy files and node_modules from the production build
COPY --from=production /usr/src/app .

## Install dev dependancies for testing
ENV NODE_ENV development
RUN npm install

CMD [ "npm", "run", "dev" ]


