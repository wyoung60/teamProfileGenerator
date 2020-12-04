const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//Global variables
let employeeID = 1;
let employeeArray = [];
let employeeInfo = {};

//Array of questions for inquirer
const employeeQuestions = [
  { message: "What is the employee's name? ", name: "name" },
  { message: "What is the employee's email address? ", name: "email" },
  { message: "Employee role unique question", name: "uniqueQuestion" },
  {
    type: "list",
    message: "Select the appropriate role of the new employee: ",
    name: "role",
    choices: ["Engineer", "Intern", "No more employees to add."],
  },
];

//Function to prompt employee questions.  Takes in the employee's role specific question and role
function newEmployeeInquire(employeeSpecificQuestion, role) {
  //Inserts employee's role specific question
  employeeQuestions[2].message = employeeSpecificQuestion;
  //Inquire prompts questions
  inquirer.prompt(employeeQuestions).then((response) => {
    //Erases employee array
    employeeInfo = {};
    //Sets employee name
    employeeInfo.name = response.name;
    //Sets employee email
    employeeInfo.email = response.email;
    //Sets employee's unique answer
    employeeInfo.uniqueQuestion = response.uniqueQuestion;
    //Sets employee id
    employeeInfo.id = employeeID;
    //Sets employee role
    employeeInfo.role = role;
    //Moves to function to store employee info into an array.  Takes in the created object and the next employee's role.
    storeEmployees(employeeInfo, response.role);
  });
}

//Function to store employee object into an array.  Takes in the created object and the next employee's role.
function storeEmployees(employee, nextEmployee) {
  //If statements based on employee role creates new class.
  if (employee.role === "Manager") {
    var newEmployee = new Manager(
      employee.name,
      employee.id,
      employee.email,
      employee.uniqueQuestion
    );
  } else if (employee.role === "Engineer") {
    var newEmployee = new Engineer(
      employee.name,
      employee.id,
      employee.email,
      employee.uniqueQuestion
    );
  } else {
    var newEmployee = new Intern(
      employee.name,
      employee.id,
      employee.email,
      employee.uniqueQuestion
    );
  }
  //Pushes new employee to array.
  employeeArray.push(newEmployee);
  //Increments the employee id number for next employee.
  employeeID++;
  //Switch statement to kick off next set of question for next employee or render the html when completed.
  switch (nextEmployee) {
    case "Engineer":
      newEmployeeInquire(
        "What is the employee's github username? ",
        "Engineer"
      );
      break;
    case "Intern":
      newEmployeeInquire("What school does the employee attend? ", "Intern");
      break;
    //Case to call render function.
    case "No more employees to add.":
      //Store html from render into variable.
      let html = render(employeeArray);
      //Calls function to create team html file.
      writeHTML(html);
    default:
      return;
  }
}

//Function to write team html using fs.
function writeHTML(html) {
  //Takes in file path, html data, and creates file.  Handles errors as well.
  fs.writeFile(outputPath, html, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Creating HTML");
    }
  });
}

//Kicks off first set of question for the manager.
newEmployeeInquire("What is the employee's office number? ", "Manager");
