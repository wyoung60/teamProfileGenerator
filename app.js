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
      case "No more employees to add.":
        let html = render(employeeArray);
        writeHTML(html);
      default:
        break;
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
      case "No more employees to add.":
        let html = render(employeeArray);
        writeHTML(html);
      default:
        break;
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

function writeHTML(html) {
  fs.writeFile(outputPath, html, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Creating HTML");
    }
  });
}
