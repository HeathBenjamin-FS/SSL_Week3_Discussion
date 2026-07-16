# Geospatial API Work

### Instructions:

#### For set up, you will need to install a few dependencies.

#### 1. Ensure you have a solid file structure.

- Example file structure:
  - `server.js` as an application entry point
  - `src/db/` - MongoDB's connection logic
  - `src/models` - Mongoose schema set up is here!
  - `src/controllers` - This is where your logic regarding routes will go
  - `src/routes` - How your HTTP requests will be routed to the controllers!

#### 2. You need to initialize Node.js in your environment.

- To accomplish this, run `npm init -y` in your terminal while inside of the project you are running this on. Then, run `npm install` so ensure you have essential `node_modules`.
  - When you are this step, it would be a good idea to set up a few more packages.
    - Install `nodemon`, `mongoose`, `dotenv`, and `express` using the npm.
    - _Ensure_ that `nodemon` is installed as a dev dependency.
    - `npm i nodemon -D`
  - Ensure that when you have these installed, you go inside of your `package.json` and under `"scripts"` you add a script called `"dev"` like this:
    - `"dev": "nodemon server.js`
    - Then you should be good to start getting connected with Postman and MongoDB's Compass!

#### 3. Create a .env file in your root directory

- This is where you will place sensitive information like PORT numbers or Mongo URIs.
  - EXAMPLE:
    ```JS
    PORT=3000
    MONGODB_URI=mongodb://127.0.0.1:27017/geospatial_db
    ```

#### 4. Start your development server:

```
npm run dev
```

## API Endpoint Reference:

I used Open-Meteo for this project. No API key required!

### Endpoints:

#### `GET /api/geo-data/external` Fetched live data from Open-Meteo. You need to have lat and lon parameters inside of the URL for query parameters.

#### `POST /api/geo-data` Saves a location to a collection inside of Compass (MongoDB). There is a sample body below for use in Postman.

#### `GET /api/geo-data` Retrieves all of the stored data from MongoDB. There is support here for optional date filtering with `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`

#### `GET /api/geo-data/:id` Retrieves a particular document by its 24 character hex ID.

## Sample POST body:

```JS
{
  "lat": 36.14,
  "lon": -82.44,
  "apiData": {
    "latitude": 36.14,
    "longitude": -82.44,
    "elevation": 4915.0,
    "current_weather": {
      "temperature": 72.5
    }
  }
}
```
