# React + TypeScript + Vite

This is an assessment for Broadway Gaming. The following is a mock application demonstrating how to filter users based on scores. Scores are calculated based on the first name and its string values.

### [Live View](https://broadwaygamingtest.netlify.app/)

## CONTENTS

- [Deployment](#Deployment)
- [Credits](#Credits)
- [Technologies](#Technologies)
- [Acknowledgements](#Acknowledgements)

## Local Deployment

**Getting Started with an npm Project**

To start an npm project, follow these steps:

1. Clone the Repository

Clone the repository to your local machine using the following command:

```
git clone https://github.com/DarrachBarneveld/broadway-gaming-test.git

```

2. Install Dependencies

Navigate to the project directory and install the project dependencies using npm:

```
npm install

```

This command will install all the dependencies listed in the package.json file.

3. Start the Server

After installing the dependencies, start the server by running the following command:

```
npm run dev
```

This command will start the server and typically outputs the URL where the server is running. By default, it's usually localhost:5173.

4. Visit the Server URL

Open your web browser and navigate to the URL where the server is running, typically localhost:5173 unless specified otherwise.

You should now see the application running in your browser!

## Credits

1. Credit to [ByteGrad](https://www.youtube.com/watch?v=uREgtEfMch0&t=187s) for border gradient CSS

## Technologies

1. Lodash library was used to sanitize character inputs into latin ASCII form
1. Typescript was utilized for improved IDE support and type casting API users
1. React JS library
1. CSS vanilla was used to all styling
1. Vite was used for bundling and configuration

## Acknowledgements

1. Users with non standarised english names will receive a random generated score of the characters based on 1-26. This is due to scoring been defined by the latin ASCII language. This is due to the api presenting users with multinational names.
