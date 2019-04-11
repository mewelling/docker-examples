Goals: Show basic app running inside docker container w/ Docker & docker-compose

1. Run basic app.js locally - show that it works on port 3000
    `node app`
2. Walk through Dockerfile 
    - Note we will want to prebuild / pull all of these so we aren't tied to network issues
    `docker build -t demo1 .`
    `docker run -t demo1 -p 3000:3000`

3. App is up and running, but what about local development? Don't want to rebuild every time!
    `npm install --save-dev nodemon`
    - Add `start` and `dev` scripts
4. Create the docker-compose file and start it up
    `docker-compose up`
    - Edit code and watch it reload!

