This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## To Run Locally

1. Make sure you have Node.js installed; I recommend a version above 18.17.X.
2. Set up a TypeScript environment - `npm install -g typescript`.
3. Clone the repo, cd to it, and open a terminal if you haven't.
4. Run the install - `npm install`.

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
I didn't have the time to set up more tests, sadly.

## Visit the current built app at https://task.mvvdev.eu/

## Description and work done:
1. The app consists of login, table, and a Not-Found page (components) that are fully responsive.
2. The main dependency is react-router-dom; no fancy libs used, no left-pad, no react-that-js.
3. It has a built-in light/dark mode Theme, Cache, a small dev toolkit, and filtering for the table component.
   3.1. Light-dark mode works with a global context provider + local storage (basic implementation).
   3.2. The cache system uses global context + custom hooks to set, get, invalidate, or clear the current cached(using localstorage) API responses from https://swapi.dev/api/people (average response time 3-6 sec).
   3.3. The Dev Toolkit uses a global context + custom hooks. It has built-in tooling for triggering login or API errors, setting API/login delays (from 1 to a max of 10 seconds), and clearing cache.
4. Basic animations using CSS -> loading spinner and a simple Skeleton for the table component.
5. Every asset follows a no-copyright policy; you can use them, and they are free.
6. The time period was 8 working hours (7 hours of coding session plus 1 hour for debugging and setting up deployment).
7. A lot more could be done, and I'm always looking to improve.
