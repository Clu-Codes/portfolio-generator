const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        }
    ])
    .then(answers => console.log(answers));
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(name, github);

// fs.writeFile('index.html', pageHTML, err => {
//     if (err) throw new Error(err);

//     console.log('Portfolio complete! Check out index.html to the output!')
// });




// Material from earlier in the lesson
// const profileDataArgs = process.argv.slice(2);

// This one-liner can replace having to declare two separate variables 
// e.g. const name = profileDataArgs[0]; & const github = profileDataArgs[1];
// const [name, github] = profileDataArgs;
