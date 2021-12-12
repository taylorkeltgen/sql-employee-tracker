const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./config/connection');

var initQuestions = [
  {
    type: 'list',
    name: 'option-select',
    message: 'What would you like to do?',
    choices: [
      'view all departments', //THEN I am presented with a formatted table showing department names and department ids
      'view all roles', //THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
      'view all employees', //THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
      new inquirer.Separator(),
      'add a department', //THEN I am prompted to enter the name of the department and that department is added to the database
      'add a role', //THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
      'add an employee', //THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
      new inquirer.Separator(),
      'update an employee role', //THEN I am prompted to select an employee to update and their new role and this information is updated in the database
    ],
  },
];

inquirer.prompt(initQuestions).then((answers) => {
  //====== VIEW DEPARTMENT - ALL ========
  if (answers === 'view all departments') {
    db.query('SELECT * FROM department', (err, rows, fields) => {
      console.table(rows);
    });
  }
  //====== VIEW ROLES - ALL ========
  if (answers === 'view all roles') {
    db.promise()
      .query('SELECT * FROM role')
      .then(([rows, fields]) => {
        console.table(rows);
      })
      .catch(console.log)
      .then(() => db.end());
  }
  //======== VIEW EMPLOYEES - ALL ========
  if (answers === 'view all employees') {
    db.promise()
      .query('SELECT * FROM employee')
      .then(([rows, fields]) => {
        console.table(rows);
      })
      .catch(console.log)
      .then(() => db.end());
  }
});

// db.promise()
//   .query('SELECT * FROM employee')
//   .then(([rows, fields]) => {
//     console.table(rows);
//   })
//   .catch(console.log)
//   .then(() => db.end());
