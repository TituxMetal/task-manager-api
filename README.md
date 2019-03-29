# Task Manager Api

A task manager api build with Node.js, Express, Mongoose.

# Run it!

Clone this repository `git clone https://github.com/TituxMetal/task-manager-api.git`

Install dependancies `yarn` or `npm install`

Run the server `yarn start` or `npm run start`

Or

Run the dev server `yart dev` or `npm run dev`

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
