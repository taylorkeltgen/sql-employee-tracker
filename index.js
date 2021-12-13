const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./config/connection');

var initQuestions = [
  {
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
      'view all departments', //THEN I am presented with a formatted table showing department names and department ids
      'view all roles', //THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
      'view all employees', //THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
      'add a department', //THEN I am prompted to enter the name of the department and that department is added to the database
      'add a role', //THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
      'add an employee', //THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
      'update an employee role', //THEN I am prompted to select an employee to update and their new role and this information is updated in the database
    ],
  },
];

inquirer.prompt(initQuestions).then((answers) => {
  const { option } = answers;

  //====== VIEW DEPARTMENT - ALL ========
  if (option === 'view all departments') {
    db.promise()
      .query('SELECT * FROM department')
      .then(([rows, fields]) => {
        console.table(rows);
      })
      .catch(console.log)
      .then(() => db.end());
  }
  //====== VIEW ROLES - ALL ========
  if (option === 'view all roles') {
    db.promise()
      //expect {id  title salary  department_id}
      .query(
        'SELECT role.id, role.title, department.dept, role.salary  FROM role INNER JOIN department ON role.department_id = department.id;'
      )
      .then(([rows, fields]) => {
        console.table(rows);
      })
      .catch(console.log)
      .then(() => db.end());
  }
  //======== VIEW EMPLOYEES - ALL ========
  if (option === 'view all employees') {
    //expect {id  first_name  last_name  title, dept, salary,  manager_id}
    db.promise()
      .query(
        'SELECT employee.id, first_name, last_name, role.title, department.dept, role.salary, manager_id FROM employee INNER JOIN role ON role_id = role.id INNER JOIN department ON role.department_id = department.id;'
      )
      .then(([rows, fields]) => {
        console.table(rows);
      })
      .catch(console.log)
      .then(() => db.end());
  }
  //======== ADD DEPARTMENT ========
  if (option === 'add a department') {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'newDept',
          message: 'What is the name of the Department?',
          validate: function (input) {
            if (input == '') {
              return 'Please enter a Department!';
            }
            return true;
          },
        },
      ])
      .then((answers) => {
        const { newDept } = answers;

        db.promise()
          .query(`INSERT INTO department(dept) VALUES("${newDept}")`)
          .then(([rows, fields]) => {
            console.log(`${newDept} has been added to the department list!`);
          })
          .catch(console.log)
          .then(() => db.end());
      });
  }

  //======== ADD ROLE ========
  //prompted to enter the name, salary, and department for the role and that role is added to the database
  if (option === 'add a role') {
    // db.promise()
    //   .query('SELECT dept FROM department')
    //   .then(([rows, fields]) => {
    //     const dept = [rows];
    //     const deptObj = JSON.stringify(rows);
    //     console.log(deptObj);
    //   })
    //   .catch(console.log)
    //   .then(() => db.end());

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'newRole',
          message: 'What is the name of the Role?',
          validate: function (input) {
            if (input == '') {
              return 'Please enter a name!';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'newSalary',
          message: 'What is the Salary for the role?',
          validate: function (input) {
            if (input == '') {
              return 'Please enter a salary!';
            }
            if (isNaN(input)) {
              return 'Please enter a valid salary!';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'setDept',
          message: 'What Department is this role from?',
          validate: function (input) {
            if (input == '') {
              return 'Please enter a Department!';
            }
            return true;
          },
        },
      ])
      .then((answers) => {
        const { newRole, newSalary, setDept } = answers;
        console.log(newRole);
        db.promise()
          .query(
            `INSERT INTO role(title, salary) VALUES("${newRole}", "${newSalary}")`
          )
          .then(([rows, fields]) => {
            console.log(`Role has been created!`);
          })
          .catch(console.log)
          .then(() => db.end());
      });
  }

  //======== ADD EMPLOYEES ========
  if (option === 'add an employee') {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'What is the First name of the Employee?',
          validate: function (input) {
            if (input == '') {
              return 'Please enter a name!';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'lastName',
          message: 'What is the Last name of the Employee?',
          validate: function (input) {
            if (input == '') {
              return 'Please enter a name!';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'role',
          message: 'What is the employee role?',
          validate: function (input) {
            if (input == '') {
              return 'Please enter a role!';
            }
            return true;
          },
        },
        {
          type: 'input',
          name: 'manager',
          message: 'Who is their supervisor?',
          validate: function (input) {
            if (input == '') {
              return 'Please enter a name!';
            }
            return true;
          },
        },
      ])
      .then((answers) => {
        const { firstName, lastName, role, manager } = answers;
        db.promise()
          .query(
            `INSERT INTO employee(first_name, last_name) VALUES("${firstName}", "${lastName}")`
          )
          .then(([rows, fields]) => {
            console.log(`Employee has been added!`);
          })
          .catch(console.log)
          .then(() => db.end());
      });
  }

  //======== UPDATE EMPLOYEE ROLE ========
  if (option === 'update an employee role') {
    db.promise()
      .query('')
      .then(([rows, fields]) => {
        console.table(rows);
      })
      .catch(console.log)
      .then(() => db.end());
  }
});
