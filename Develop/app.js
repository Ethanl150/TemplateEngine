const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const inquirer = require("inquirer");

const teamMembers = [];

let id = 1;

inquirer.prompt([
    {
        type: "input",
        message: "What is the name of the team manager?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the email of the team manager?",
        name: "email"
    }
]).then(answers => {
    const newManager = new Manager(answers.name, id, answers.email, 1)
    id++;
    teamMembers.push(newManager)
    newMember();
})

const newMember = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Do you want to add another team member?",
            name: "newMember",
            choices: ["Yes, an engineer", "Yes, an intern", "No"]
        }
    ]).then(answer => {
        if (answer.newMember === "Yes, an engineer") {
            newEngineer();
        } else if (answer.newMember === "Yes, an intern") {
            newIntern();
        } else {
            renderFunction();
        }
    })
}

const newEngineer = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the engineer's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the engineer's GitHub username?",
            name: "github"
        }
    ]).then(answers => {
        const newEngineer = new Engineer(answers.name, id, answers.email, answers.github)
        id++;
        teamMembers.push(newEngineer)
        newMember();
    })
}

const newIntern = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the intern's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the name of the intern's school?",
            name: "school"
        }
    ]).then(answers => {
        const newIntern = new Intern(answers.name, id, answers.email, answers.school)
        id++;
        teamMembers.push(newIntern)
        newMember();
    })
}

function renderFunction() {
    let page = render(teamMembers);
    fs.writeFile(outputPath, page, function(err) {
        if (err) {
            throw err;
        }
    })

}




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
