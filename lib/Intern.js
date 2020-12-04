// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

//Creates intern class that extends employee class.
class Intern extends Employee {
  //Calls for all necessary variables
  constructor(name, id, email, school) {
    //Pushes employee variable to employee class
    super(name, id, email);
    //Sets unique intern key/value pairs
    this.school = school;
    this.role = "Intern";
  }

  //Unique function for intern
  getSchool() {
    return this.school;
  }
}

module.exports = Intern;
