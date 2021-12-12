INSERT INTO department (id, name)
VALUES 
  (1, "Sales"),
  (2,"Engineering"),
  (3,"Finance"),
  (4,"Legal");

INSERT INTO role (id, title, salary, department_id) 
VALUES
  (1, "Salesperson", "80000", 1),
  (2, "Lead Engineer", "150000", 2),
  (3, "Software Engineer", "120000", 2),
  (4, "Account Manager", "160000", 3),
  (5, "Accountant", "125000", 3),
  (6, "Legal Team Lead", "250000", 4),
  (7, "Lawyer", "190000", 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
VALUES 
(1, "John", "Doe", 4, NULL),
(2, "Mike", "Chen", 1, 1),
(3, "Ashley", "Rodriguez", 2, NULL),
(4, "Kevin", "Tupik", 3, 3),
(5, "Kunal", "Singh", 4, NULL),
(6, "Malia", "Brown", 5, 5),
(7, "Sarah", "Lourd", 6, NULL),
(8, "Tom", "Allen", 7, 7);
