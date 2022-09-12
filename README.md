# Sunprime opt-in form

This is an opt-in form built in React, animated in pure CSS.

It is built for the solar panel industry and features the tracing of the rooftop/terrain on GMaps. It calculates the drawn area and the possible KwH output.

It sends the data to ActiveCampaign and Salesforce (and Zoho) via PHP API and sends analytics to Facebook via PHP and JS APIs and Google.

To edit the steps of the form edit the `InitArrays.js` file.

# How to switch between versions of the form

In the main file (`/src/App.js`) edit line 8

##### `import {getInit0 as getInit} from './InitArrays';`
`0` - This is the main version of the form.

##### `import {getInit1 as getInit} from './InitArrays';`
`1` - Same as version `0` but here the user can skip the map tracing.

##### `import {getInit2 as getInit} from './InitArrays';`
`2` - Same as version `1` but with the map tracing as the last step.

##### `import {getInit3 as getInit} from './InitArrays';`
`3` - No map tracing.

##### `import {getInitPiccoli as getInit} from './InitArrays';`
`terreni piccoli` - Form for small lands

##### `import {getInitGrandi as getInit} from './InitArrays';`
`terreni grandi` - Form for big lands


# Yarn DOCS:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

##### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

##### `yarn test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

##### `yarn build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

##### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
