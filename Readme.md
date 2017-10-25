# Forward

### Description

Web frontend for Timewindr, written using React and Redux

### How to set up?

Simply clone the repo, run 'npm install' to install all the requisite node modules

run 'npm run watch' to update the dist/app.bundle.js file with the latest changes,
then run 'npm start' in another terminal window to set up the localhost port.

You can run the app locally at 'http://localhost:3000/public/'

If you want hot reloading then use the `--hot` flag. (TODO: actually try this out, hot reloading isn't super essential)

The built js file is **dist/app.bundle.js** and you can see the app's main page using **public/index.html**

### Brief style guide

Use ES6 features whenever possible (e.g. functional programming, arrow functions)

Use semicolons at the end of lines

Use 2 spaces for tabs everywhere

### Brief design notes

Enclose every component in a div, with the className being rc-<Component name>

Have a corresponding css file for every "dumb" component file that needs styling

Any properties on a component must either be required, or have a default value

### TODOs

shh...

### Anything else?

Redux is set up, probably. I'll commit again with a basic redux flow as a tutorial
