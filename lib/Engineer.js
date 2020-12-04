// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

//Creates engineer class that extends employee class.
class Engineer extends Employee {
  //Calls for all necessary variables
  constructor(name, id, email, github) {
    //Pushes employee variable to employee class
    super(name, id, email);
    //Sets unique engineer key/value pairs
    this.github = github;
    this.role = "Engineer";
  }

  //Unique function for engineer
  getGithub() {
    return this.github;
  }
}

module.exports = Engineer;
