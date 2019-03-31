# Task Manager Api

A task manager api build with Node.js, Express, Mongoose.

# Run it!

Clone this repository `git clone https://github.com/TituxMetal/task-manager-api.git`

Install dependancies `yarn` or `npm install`

Run the server `yarn start` or `npm run start`

Or

Run the dev server `yarn dev` or `npm run dev`

# Use it!

Make a GET request to `http://localhost:5000/welcome`

# Test it!

Run the tests with `yarn test` or `npm run test`

Or

Run the tests in watch mode `yarn devTest` or `npm run devTest`

# Available Endpoints

## Create a user

    POST /users
    parameters:
      - name:string, required
      - email:string, required
      - password:string, required
      - age:number
    returns the user data and a token

## Login a user

    POST /users/login
    parameters:
      - email:string, required
      - password:string, required
    returns the user data and a token

## Logout a user

    POST /users/logout
    headers:
      - Authorization Bearer token
    204 No Content

## Remove all tokens from a user

    POST /users/logoutAll
    headers:
      - Authorization Bearer token
    204 No Content

## Get the user's profile

    GET /users/me
    headers:
      - Authorization Bearer token
    returns the user data

## Update valid user fields

    PATCH /users/me
    parameters:
      - valid fields: email, password, name, age
    returns the user data

## Create a task for authenticated user

    POST /tasks
    parameters:
      - description: string, required
      - completed: boolean
    returns the task data
