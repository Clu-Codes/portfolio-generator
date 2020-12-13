const fs = require('fs');
const generatePage = require('./src/page-template.js');

const profileDataArgs = process.argv.slice(2);

// This one-liner can replace having to declare two separate variables 
// e.g. const name = profileDataArgs[0]; & const github = profileDataArgs[1];
const [name, github] = profileDataArgs;


fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw new Error(err);

    console.log('Portfolio complete! Check out index.html to the output!')
});