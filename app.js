const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const inquirer = require("inquirer");

const teamMembers = [];

let id = 1;

inquirer.prompt([
    {
        type: "input",
        message: "What is the name of the team manager?",
        name: "name",
        validate: validateName
    },
    {
        type: "input",
        message: "What is the email of the team manager?",
        name: "email",
        validate: validateEmail
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
            name: "name",
            validate: validateName
        },
        {
            type: "input",
            message: "What is the engineer's email?",
            name: "email",
            validate: validateEmail
        },
        {
            type: "input",
            message: "What is the engineer's GitHub username?",
            name: "github",
            validate: validateGitHub
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
            name: "name",
            validate: validateName
        },
        {
            type: "input",
            message: "What is the intern's email?",
            name: "email",
            validate: validateEmail
        },
        {
            type: "input",
            message: "What is the name of the intern's school?",
            name: "school",
            validate: validateSchool
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

function validateName(input) {
    if (!input) {
        return "Please enter a name.";
    } else {
        return true;
    }
}

function validateEmail(input) {
    if (!input) {
        return "Please enter an email address."
    }  else if (!input.includes("@") || !input.includes(".")) {
        return "Please enter a valid email address."
    } else if (input.indexOf("@") > input.indexOf(".")) {
        return "Please enter a valid email address."
    } else {
        return true;
    }
}

function validateGitHub(input) {
    if (!input) {
        return "Please enter a GitHub username."
    } else {
        return true;
    }
}

function validateSchool(input) {
    if (!input) {
        return "Please enter a school."
    } else {
        return true;
    }
}