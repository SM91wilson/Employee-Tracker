use employeedb;

insert into department(name)
	values('Management'), ('Engineering'), ('sales'), ('Maintenance');
    
insert into role(title, salary, department_id)
	values	('Manager', 150000, 1), 
			('Lead Engineer', 130000, 2), 
            ('Engineer', 100000, 2),
            ('Head of Sales', 120000, 3),
            ('Sales Assistant', 90000, 3),
            ('Janitor', 100000, 4);

            
insert into employee(first_name, last_name, role_id)
	values 	('Steve', 'W', 1);
            
insert into employee(first_name, last_name, role_id, manager_id)
	values 	('John', 'W', 2, 1),
            ('Ann','V', 3, 1),
            ('Chloe', 'G', 4, 1),
            ('Gregg', 'T', 5, 1),
            ('Emily', 'R', 3, 1);