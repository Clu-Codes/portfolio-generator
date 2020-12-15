const { writeFile, copyFile } = require('./utils/generate-site.js');
const generatePage = require('./src/page-template.js');
const inquirer = require('inquirer');

// const mockData = {
//         name: 'Lernantino',
//         github: 'lernantino',
//         confirmAbout: true,
//         about:
//         'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et.',
//         projects: [
//         {
//             name: 'Run Buddy',
//             description:
//             'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//             languages: ['HTML', 'CSS'],
//             link: 'https://github.com/lernantino/run-buddy',
//             feature: true,
//             confirmAddProject: true
//         },
//         {
//             name: 'Taskinator',
//             description:
//             'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//             languages: ['JavaScript', 'HTML', 'CSS'],
//             link: 'https://github.com/lernantino/taskinator',
//             feature: true,
//             confirmAddProject: true
//         },
//         {
//             name: 'Taskmaster Pro',
//             description:
//             'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque. Nulla eget fringilla nulla. Integer gravida magna mi, id efficitur metus tempus et. Nam fringilla elit dapibus pellentesque cursus.',
//             languages: ['JavaScript', 'jQuery', 'CSS', 'HTML', 'Bootstrap'],
//             link: 'https://github.com/lernantino/taskmaster-pro',
//             feature: false,
//             confirmAddProject: true
//         },
//         {
//             name: 'Robot Gladiators',
//             description:
//             'Duis consectetur nunc nunc. Morbi finibus non sapien nec pharetra. Fusce nec dignissim orci, ac interdum ipsum. Morbi mattis justo sed commodo pellentesque.',
//             languages: ['JavaScript'],
//             link: 'https://github.com/lernantino/robot-gladiators',
//             feature: false,
//             confirmAddProject: false
//         }
//     ]
//   };


// ACTUAL QUESTIONS - COMMENTED OUT FOR MOCK DATA
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
            // notice the validate method's arugment, nameInput. 
            validate: nameInput => {
                // conditional to determine outcome of validation check
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username',
            validate: githubInput => {
                if (githubInput) {
                    return true
                } else {
                    console.log('Please enter your Github name!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
    ==================
    Add a New Project
    ==================
    `);
    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projectDetails => {
                if (projectDetails) {
                    return true
                } else {
                    console.log('Please provide a description of your project!');
                    return false
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'github link',
            message: 'Enter the Github link to your project. (Required)',
            validate: githubLink => {
                if (githubLink) {
                    return true
                } else {
                    console.log('Please share your Github link!');
                    return false
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return fs.writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return fs.copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });

// const pageHTML = generatePage(mockData);

// fs.writeFile('./dist/index.html', pageHTML, err => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log('Page created! Check out index.html in this directory to see it!');

//     fs.copyFile('./src/style.css', './dist/style.css', err => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log('Style sheet copied successfully!');
//     })
// });


   
    
    // THIS IS HANDLED IN GENERATE-SITE.JS
    // const pageHTML = generatePage(portfolioData);

    // fs.writeFile('./dist/index.html', pageHTML, err => {
    //     if (err) {
    //         console.log(err);
    //         return;
    //     }
    //     console.log('Page created! Check out index.html in this directory to see it!');
    
    //     fs.copyFile('./src/style.css', './dist/style.css', err => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         console.log('Style sheet copied successfully!');
    //     })
    // });
        // console.log(portfolioData);
    // });



// Material from earlier in the lesson
// const profileDataArgs = process.argv.slice(2);

// This one-liner can replace having to declare two separate variables 
// e.g. const name = profileDataArgs[0]; & const github = profileDataArgs[1];
// const [name, github] = profileDataArgs;
