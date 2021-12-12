SELECT 
    employee.id, 
    first_name, 
    last_name, 
    role.title, 
    department.dept, 
    role.salary, 
    manager_id 
FROM employee 
INNER JOIN role ON role_id = role.id 
INNER JOIN department ON role.department_id = department.id;