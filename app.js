const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employeeID = 1;
let employeeArray = [];
let employeeInfo = {};

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
const managerQuestions = [
  { message: "What is the manager's name? ", name: "name" },
  { message: "What is the manager's email address? ", name: "email" },
  { message: "What is the manager's office number? ", name: "officeNumber" },
  {
    type: "list",
    message: "Select the appropriate role of the new employee: ",
    name: "role",
    choices: ["Engineer", "Intern", "No more employees to add."],
  },
];

const engineerQuestions = [
  { message: "What is the engineer's name? ", name: "name" },
  { message: "What is the engineer's email address? ", name: "email" },
  { message: "What is the engineer's github username? ", name: "github" },
  {
    type: "list",
    message: "Select the appropriate role of the new employee: ",
    name: "role",
    choices: ["Engineer", "Intern", "No more employees to add."],
  },
];

const internQuestions = [
  { message: "What is the intern's name? ", name: "name" },
  { message: "What is the intern's email address? ", name: "email" },
  { message: "What school does the intern attend? ", name: "school" },
  {
    type: "list",
    message: "Select the appropriate role of the new employee: ",
    name: "role",
    choices: ["Engineer", "Intern", "No more employees to add."],
  },
];

function managerInquire() {
  inquirer.prompt(managerQuestions).then((response) => {
    employeeInfo.name = response.name;
    employeeInfo.email = response.email;
    employeeInfo.officeNumber = response.officeNumber;
    employeeInfo.id = employeeID;
    employeeInfo.role = "Manager";
    storeEmployees(employeeInfo);
    switch (response.role) {
      case "Engineer":
        engineerInquire();
        break;
      case "Intern":
        internInquire();
        break;
      default:
        return;
    }
  });
}

managerInquire();

function engineerInquire() {
  inquirer.prompt(engineerQuestions).then((response) => {
    employeeInfo = {};
    employeeInfo.name = response.name;
    employeeInfo.email = response.email;
    employeeInfo.github = response.github;
    employeeInfo.id = employeeID;
    employeeInfo.role = "Engineer";
    storeEmployees(employeeInfo);
    switch (response.role) {
      case "Engineer":
        engineerInquire();
        break;
      case "Intern":
        internInquire();
        break;
      default:
        return;
    }
  });
}

function internInquire() {
  inquirer.prompt(internQuestions).then((response) => {
    employeeInfo = {};
    employeeInfo.name = response.name;
    employeeInfo.email = response.email;
    employeeInfo.school = response.school;
    employeeInfo.id = employeeID;
    employeeInfo.role = "Intern";
    storeEmployees(employeeInfo);
    switch (response.role) {
      case "Engineer":
        engineerInquire();
        break;
      case "Intern":
        internInquire();
        break;
      default:
        return;
    }
  });
}

function storeEmployees(employee) {
  if (employee.role === "Manager") {
    var newEmployee = new Manager(
      employee.name,
      employee.id,
      employee.email,
      employee.officeNumber
    );
  } else if (employee.role === "Engineer") {
    var newEmployee = new Engineer(
      employee.name,
      employee.id,
      employee.email,
      employee.github
    );
  } else {
    var newEmployee = new Intern(
      employee.name,
      employee.id,
      employee.email,
      employee.school
    );
  }
  employeeArray.push(newEmployee);
  employeeID++;
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

render(employeeArray);
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
// for the provided `render` function to work! ```
