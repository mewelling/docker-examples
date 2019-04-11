# Demo 1 - The Basics 

Goal: Show basic app running inside docker container w/ Docker & docker-compose

## Steps

1. Run basic app.js locally - show that it works on port `3000`
    ```bash
    npm install
    node app
    ```
   This is where it gets fun. Do you have node.js installed? What about npm? Is the version right? What about your path?

    If you were lucky enough that it worked out of the gate - hurray! If not, don't worry about fixing it. There is a better way.


2. Containerize it!
    
    Now it is time for us to take our first dive into Docker. You can find install links [here](https://docs.docker.com/install/). 
    ```bash
    docker build -t demo1 .
    docker run -p 3001:3000 demo1
    ```

    This will build an image for our app according to what we have layed out in our [Dockerfile](./Dockerfile) and tag it as `demo1`. Then, we run a container based on that image on the host port `3001`.

    To stop this container, check out your running docker containers and then kill the one we just started.

    ```bash
    docker ps 
    # CONTAINER ID        IMAGE      ...   
    # ab9463942144        demo1      ...

    docker kill ab9463942144
    ```

3. Our container copies in all your code at the time of build, so how does this work for local development?

    We could use vanilla docker commands, but docker compose makes things like mounting volumes and setting environment variables so much easier!

    ```bash
    docker-compose run app npm install
    docker-compose up
    ``` 

    Since `docker-compose` mounts the current directory as a volume, it is actually going to use your local `node_modules` directory. Running `npm install` _through_ `docker-compose` will make sure that any platform specific dependancies (like `nodemon`) will work correctly.

    You should now see the app up and running on port `3002`. And now, if you edit the `app.js` code, you should see your server automatically restart!

