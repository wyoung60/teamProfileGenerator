// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

//Creates manager class that extends employee class.
class Manager extends Employee {
  //Calls for all necessary variables
  constructor(name, id, email, officeNumber) {
    //Pushes employee variable to employee class
    super(name, id, email);
    //Sets unique manager key/value pairs
    this.officeNumber = officeNumber;
    this.role = "Manager";
  }

  //Unique function for manager
  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = Manager;
