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

Create a file `.env` in the root of the project and put the following:

```
MONGO_URI=put_your_mongo_db_uri
JWT_SECRET=put_your_jwt_secret
SPOONACULAR_API_KEY=your_spoonacular_api_key
```

This application uses [Spoonacular Food API](https://spoonacular.com/food-api).

### Configure Client-Side (React)

Install client-side dependencies, cd to `client` and run

```
npm install
```

### Give it a Try!

Run `npm run dev` from the root

## Connect to Google Calendar (optional)

In order to connect your Google Calendar to this application, you need to create `cliendId` and `apiKey` from [https://console.developers.google.com/flows/enableapi?apiid=calendar](https://console.developers.google.com/flows/enableapi?apiid=calendar)

After generating above keys, you need to put them in `client/apiGoogleconfig.json`
