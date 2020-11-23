# Thrive

Meal Preparation Web Application created with MERN Stack

## Quick Demo

> Deployed to Heroku

Get a quick demo of the application [here](https://thrive-by-haseeb.herokuapp.com/).

### Login Credentials

Email: test@thrive.com

Password: test12345

## Clone and test on browser

### Configure Server-Side

Install server-side dependencies

```
npm install
```

Create a file `.env` in `config/` and create the environment variables for:

```
MONGO_URI=put_your_mongo_db_uri
JWT_SECRET=put_your_jwt_secret
```

### Configure Client-Side (React)

Install client-side dependencies, cd to `client` and run

```
npm install
```

Create a file `.env` in the root of `client/` and create the environment variables for:

```
REACT_APP_SPOONACULAR_API_KEY=your_key
```

This application uses [Spoonacular Food API](https://spoonacular.com/food-api).

### Give it a Try!

Run `npm run dev` from the root

## Connect to Google Calendar (optional)

In order to connect your Google Calendar to this application, you need to create `cliendId` and `apiKey` from [https://console.developers.google.com/flows/enableapi?apiid=calendar](https://console.developers.google.com/flows/enableapi?apiid=calendar)

After generating above keys, you need to put them in `client/apiGoogleconfig.json`
