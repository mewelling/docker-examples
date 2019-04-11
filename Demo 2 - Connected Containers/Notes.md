# Demo 2 - Connected Containers

Goal: Add another service to our local development setup.

## Steps

1. Install dependancies and run 
    ```bash
    docker-compose run app npm install
    docker-compose up
    ``` 

    Go hit up port `3000` and you will see that we are upserting timestamps to a MongoDB collection. Since we are not using data volumes however, all of this will be wiped out when the container is removed.

    ```bash
    docker-compose down
    docker-compose up app # The data has been wiped out
    ``` 

2. The magic of `depends_on`

    See that entry for `depends_on` inside of the `docker-compose.yml` file? That tells docker to link the `mongo` and `app` services together. 

    That does things like letting us only have to declare one service when we start everything up
    ```bash
    docker-compose up app   # starts both app and mongo
    ```

    And it also creates network mappings so that our containers can communicate with each other using their service names.
    ```javascript
    // app.js
    const url = 'mongodb://mongo:27017'; 
    ```

3. Overrides!

    Everytime that we run `docker-compose up`, it looks for a `docker-compose.yml` file, but it will also pull in services from `docker-compose.overrides.yml`. This is useful if we might want to have different configurations per environment, for example.

    In this case, since the `api` service is defined in both files, the `.override` configuration will win out. Thus, both `app` and `api` will be built.

    ```bash
    # Look for both docker-compose.yml and docker-compose.overrides.yml
    docker-compose up app api

    # Only look at docker-compose.yml
    docker-compose -f docker-compose.yml up app api

    # Override with production configuration
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up app api
    ```


3. (Bonus) "Works on my machine"

    So now that we are up and running, let's show _why_ Docker is so helpful. Notice what version of node.js out containers are running?

    ```dockerfile
    FROM node:10-alpine
    ```

    This is a really lightweight version of node 10 that we can use as the base of our Dockerfiles. And while node 10 supports `async/await` functions, those did not exist inside of node 6. 

    If you change that line in the `Dockerfile` to say `FROM node:6-alpine` and then rebuild, you will notice that things don't seem quite right

    ```bash
    docker-compose build app
    docker-compose up

    # /usr/src/app/app.js:8
    # app_1    | async function upsertDocuments(req, res, next) {
    # app_1    |       ^^^^^^^^
    # app_1    | 
    # app_1    | SyntaxError: Unexpected token function
    ```

    Sure enough, the app crashed. This is the same thing that could happen without Docker if "Developer A" had node 10 installed locally, but another teammate had node 6 installed. But by source controlling our runtime with our code, that should not happen anymore!


