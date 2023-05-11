# The Daily Clawsmic (Legally\* required to have cats part of this project)

[![MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://lbesson.mit-license.org/)

## Table of Contents

[Description](#Description)

[Features](#Features)

[Installation](#Installation)

[Run Locally](#Run-Locally)

[Environment Variables](#Environment-Variables)

[API Reference](#API-Reference)

[Deployment](#Deployment)

[Wireframe](#Wireframe)

[Screenshots](#Screenshots)

[Authors (alphabetical)](#Authors-(alphabetical))

[License](#license)

# Description

The Daily Clawsmic interacts with various NASA APIs to showcase a picture of the day, provide many Mars Rover (Curiosity) photos, and supplies articles and links for NASA-developed technologies, available for commercial and non-commerical use. Their, you'll find information such as titles, summaries, categories, and patent information!

With this web application the user has the ability to sign up and login in order to save favorites. Those favorites will stay on on the user's personalized dashboard until they're ready to discard them. That way, following all one's space needs (cats included) is as easy as one click of a button.

## Features

(client-side)

- React
- Semantic UI
- react-router-dom
- Apollo
- Axios
- GraphQL
- jwt-decode

(server-side)

- same as above, minus Axios and jwt-decode
- express
- mongoose
- jsonwebtoken
- bcrypt
- dotenv

## Installation

Install dependencies with npm

```cmd-line
  npm install
```

## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

\*\*Don't forget to make your own `dotenv` and `gitignore` files in the root directory!

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```cmd-line
REACT_APP_API_KEY=<YOUR_NASA_API_KEY>
```

## API Reference

[React](https://reactjs.org/docs/getting-started.html): Official documentation for the React library.

[Semantic UI React](https://react.semantic-ui.com/): Documentation for the Semantic UI React library used in this project.

[NASA APIs](https://api.nasa.gov/): Documentation for the NASA APIs used in this project, including the [Astronomy Picture of the Day API](https://api.nasa.gov/api.html#apod), [Mars Rover Photos API](https://api.nasa.gov/api.html#MarsPhotos), and [NASA Tech Transfer API](https://technology.nasa.gov/api/techtransfer).

## Deployment

To see deployed site on Heroku, click here:

```
[heroku link]
```

## Wireframe

![image_720](https://user-images.githubusercontent.com/118003612/235561033-dc74b3ba-cdbe-4a9b-a565-3aa6f12898f2.png)

## Screenshots

[Screenshots here]

## Authors (alphabetical)

Alex Barrett,
Drew Greenblatt,
Hope Mansfield,
Camila Moreiras,
Erin Sawyer,
Bronson Wardle

## License

Please refer to license in Repo.

(\*Not actually a legal requirement. We're just cat people!)
