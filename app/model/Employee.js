class Employee {

    constructor(name, id){
        this.id = id;
        this.name = name;
        this.salary = 0;
    } 

    setSalary(salary){
        this.salary = salary;
    } 
}

module.exports = Employee;