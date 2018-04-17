# MIT 6.813 - GR4
--------------------------
A Node.js web application written using ReactJS and JavaScript ES6 syntax. Web Application employs Babel for compiling ES6 syntax and Webpack for module bundling. Implemented as part of MIT 6.831: UI Design and Implementation course.

## I. Dependencies

To install all dependencies/libraries (located in the package.json), run the following command in the terminal:

    $ npm install

## II. Usage

To run the web application, run the following command in the terminal:

    $ npm run start

A development server will be launched on the localhost: http://localhost:8080

## III. Deployment

Before this application can be deployed, the ES6+ codebase must be transpiled and web-packed into a build bundle.

To do this, run the following command in the terminal:

    $ npm run build

Then, the /build directory should be ready for deployment.

To deploy the web application to firebase host, run the following command in the terminal:

    $ firebase deploy -m "commit message"

To learn more about Firebase hosting and deployment, read: https://firebase.google.com/docs/hosting/deploying

## V. Helpful Links

To learn more about ReactJS, visit: https://facebook.github.io/react/

To learn more about the Webpack module bundler, visit:
https://webpack.js.org/

To learn more about the Babel compiler, visit:
https://babeljs.io/

To learn more about Google Firebase, visit:
https://firebase.google.com/
