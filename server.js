var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    hot: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Gustavo11012015',
    databse: 'employeedb'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Welcome');
    start();
})

function start() {
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'firstAction',
        choices: [
            'View all Employees',
            'View all Employees by Department',
            'View all Employees by Manager',
            'Add an Employee',
            'Remove an Employee',
            'Update an Employee',
            'Add a Role',
            'Remove a Role',
            'Update a Role',
            'Add a Department',
            'Remove a Department',
            'View Total Budget by Department',
            'Exit'
        ]
    }).then(function (answers) {
        switch (answers.firstAction) {
            case 'View all Employees':
                employeeSearch();
                break;
            case 'View all Employees by Department':
                employeeByDep();
                break;
            case 'View all Employees by Manager':
                employeeByMang();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Remove an Employee':
                removeEmployee();
                break;
            case 'Update an Employee':
                updateEmployee();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Remove a Role':
                removeRole();
                break;
            case 'Update a Role':
                updateRole();
                break;
            case 'Add a Department':
                addDepart();
                break;
            case 'Remove a department':
                removeDepart();
                break;
            case 'View Total Budget by Department':
                totalBudget();
                break;
            case 'Exit':
                connection.end();
                break;
        }
    });
}

function employeeSearch() {
    var query = 'select first_name, last_name from employeedb.employee';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })

};

function employeeByDep() {
    var query = 'select employee.first_name, employee.last_name, role.title, role.salary from employeedb.role inner join employeedb.employee on (role.id = employee.role_id) group by role.id'

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
};

function employeeByMang() {
    var query = 'select employee.first_name, employee.last_name, role.title from employeedb.role inner join employeedb.employee on (role.id = employee.role_id)'
}
// ^^ not done yet

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'First name of Employee to Add'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Surname of Employee to Add'
            },
            {
                type: 'number',
                name: 'managerId',
                message: 'Id of employee Manager'
            },
            {
                type: 'list',
                name: 'role',
                message: 'Employee title',
                choices: ['Manager', 'Lead Engineer', 'Engineer', 'Head of Sales', 'Sales Assistant', 'Janitor']
            }
        ]).then(function (response) {
            switch (response.role) {
                case 'Manager':
                    connection.query(
                        'insert into employeedb.employee set ?',
                        {
                            first_name: response.first_name,
                            last_name: response.last_name,
                            manager_id: response.managerId,
                            role_id: 1
                        },
                        function (err) {
                            if (err) throw err;
                        }
                    )
                    break;
                case 'Lead Engineer':
                    connection.query(
                        'insert into employeedb.employee set ?',
                        {
                            first_name: response.first_name,
                            last_name: response.last_name,
                            manager_id: response.managerId,
                            role_id: 2
                        },
                        function (err) {
                            if (err) throw err;
                        }
                    )
                    break;
                case 'Engineer':
                    connection.query(
                        'insert into employeedb.employee set ?',
                        {
                            first_name: response.first_name,
                            last_name: response.last_name,
                            manager_id: response.managerId,
                            role_id: 3
                        },
                        function (err) {
                            if (err) throw err;
                        }
                    )
                    break;
                case 'Head of Sales':
                    connection.query(
                        'insert into employeedb.employee set ?',
                        {
                            first_name: response.first_name,
                            last_name: response.last_name,
                            manager_id: response.managerId,
                            role_id: 4
                        },
                        function (err) {
                            if (err) throw err;
                        }
                    )
                    break;
                case 'Sales Assistant':
                    connection.query(
                        'insert into employeedb.employee set ?',
                        {
                            first_name: response.first_name,
                            last_name: response.last_name,
                            manager_id: response.managerId,
                            role_id: 5
                        },
                        function (err) {
                            if (err) throw err;
                        }
                    )
                    break;
                case 'Janitor':
                    connection.query(
                        'insert into employeedb.employee set ?',
                        {
                            first_name: response.first_name,
                            last_name: response.last_name,
                            manager_id: response.managerId,
                            role_id: 6
                        },
                        function (err) {
                            if (err) throw err;
                        }
                    )
                    break;
            }
            console.log(response);
            console.log('Employee Added')
            start();
        })
}

function removeEmployee() {
    inquirer.prompt(
        {
            type: 'number',
            name: 'employeeId',
            message: 'Id of the employee to remove?'
        }
    ).then(function (response) {
        let query = 'delete from employeedb.employee where ?'
        connection.query(query,
            { id: response.employeeId },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + ' Employee removed')
            }
        )
        start();
    })
}

function updateEmployee() {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'option',
                message: 'What would you like to update?',
                choices: [
                    'Update Employee name',
                    'Update Employee role',
                    'Update Employee manager'
                ]
            }
        ).then(response => {
            switch (response.choices) {
                case 'Update Employee name':
                    inquirer.prompt(
                        {
                            type: 'number',
                            name: 'employeeId',
                            message: 'ID of employee to update'
                        },
                        {
                            type: 'input',
                            name: 'firstName',
                            message: 'Update employee first name'
                        },
                        {
                            type: 'input',
                            name: 'lastName',
                            message: 'Update employee last name'
                        }
                    ).then(response => {
                        connection.query(`update employeedb.employee set first_name = ${response.firstName}, last_name = ${response.lastName} where id = ${employeeId}`, function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + ' Employee name updated')
                            start();
                        });
                    });
                    break;

                case 'Update Employee role':
                    inquirer.prompt(
                        {
                            type: 'number',
                            name: 'employeeId',
                            message: 'ID of employee to update'
                        },
                        {
                            type: 'list',
                            name: 'role',
                            message: 'Update to role:',
                            choices: ['Manager', 'Lead Engineer', 'Engineer', 'Head of Sales', 'Sales Assistant', 'Janitor']
                        }
                    ).then(response => {
                        switch (response.choices) {
                            case 'Manager':
                                connection.query(`update employeedb.employee set role_id = ${1} where id = ${employeeId}`, function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + ' Employee role updated');
                                    start();
                                })
                                break;

                            case 'Lead Engineer':
                                connection.query(`update employeedb.employee set role_id = ${2} where id = ${employeeId}`, function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + ' Employee role updated');
                                    start();
                                })
                                break;

                            case 'Engineer':
                                connection.query(`update employeedb.employee set role_id = ${3} where id = ${employeeId}`, function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + ' Employee role updated');
                                    start();
                                })
                                break;

                            case 'Head of Sales':
                                connection.query(`update employeedb.employee set role_id = ${4} where id = ${employeeId}`, function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + ' Employee role updated');
                                    start();
                                })
                                break;

                            case 'Sales Assistant':
                                connection.query(`update employeedb.employee set role_id = ${5} where id = ${employeeId}`, function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + ' Employee role updated');
                                    start();
                                })
                                break;

                            case 'Janitor':
                                connection.query(`update employeedb.employee set role_id = ${6} where id = ${employeeId}`, function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + ' Employee role updated');
                                    start();
                                })
                                break;
                        }
                    })
                    break;

                case 'Update Employee manager':
                    inquirer.prompt(
                        {
                            type: 'number',
                            name: 'employeeId',
                            message: 'ID of employee to update'
                        },
                        {
                            type: 'number',
                            name: 'managerId',
                            message: 'ID of manager to assign'
                        }
                    ).then(response => {
                        connection.query(`update employeedb.employee set manager_id = ${response.managerId} where id = ${response.employeeId}`, function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + ' Employee manager updated');
                            start();
                        })
                    })

                    break;
            }
        })

}

function addRole() {
    inquirer
        .prompt(
            {
                type: 'input',
                name: 'role',
                message: 'Name of new role'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Salary of new role'
            },
            {
                type: 'number',
                name: 'depId',
                message: 'ID of department to add role to'
            }
        ).then(response => {
            connection.query('insert into employeedb.role set ?',
                {
                    title: response.role,
                    salary: response.salary,
                    department_id: response.depId
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + ' New Role ' + response.role + ' added')
                    start();
                })
        })
    
}

function removeRole() {
    inquirer
        .prompt(
            {
                type: 'number',
                name: 'roleId',
                message: 'ID of Role to remove'
            }
        ).then(response => {
            connection.query('delete from employeedb.role where id = ?',
                {
                    id: response.roleId
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(res.affectedRows + ' Role removed');
                    start();
                })
        })
}

function updateRole() {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'updRole',
                message: 'What Role would you like to update?',
                choices: ['Title', 'Salary', 'Deparment Id']
            }
        ).then(response => {
            switch (response.choices) {
                case 'Title':
                    inquirer.prompt(
                        {
                            type: 'number',
                            name: 'roleId',
                            message: 'Choose ID of Role to update'
                        },
                        {
                            type: 'input',
                            name: 'title',
                            message: 'Enter new Role Title'
                        })
                        .then(response => {
                            connection.query('update employeedb.role set title = ? where id = ?',
                                {
                                    title: response.title,
                                    id: response.id
                                },
                                function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + ' Title Updated')
                                    start();
                                })
                        })
                    break;
                case 'Salary':
                    inquirer.prompt(
                        {
                            type: 'number',
                            name: 'roleId',
                            message: 'Choose ID of Role to update'
                        },
                        {
                            type: 'number',
                            name: 'salary',
                            message: 'Enter new Role Salary'
                        })
                        .then(response => {
                            connection.query('update employeedb.role set salary = ? where id = ?',
                                {
                                    salary: response.salary,
                                    id: response.id
                                },
                                function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + ' Salary Updated')
                                    start();
                                })
                        })
                    break;
                case 'Deparment Id':
                    inquirer.prompt(
                        {
                            type: 'number',
                            name: 'roleId',
                            message: 'Choose ID of Role to update'
                        },
                        {
                            type: 'number',
                            name: 'depId',
                            message: 'Enter new Department of Role'
                        })
                        .then(response => {
                            connection.query('update employeedb.role set department_id = ? where id = ?',
                                {
                                    department_id: response.depId,
                                    id: response.id
                                },
                                function (err, res) {
                                    if (err) throw err;
                                    console.log(res.affectedRows + ' Salary Updated')
                                    start();
                                })
                        })
            }
        })
}

function addDepart() {
    inquirer
        .prompt({
            type:'input',
            name:'newDep',
            message:'Name of New Department'
        }).then(response => {
            connection.query('insert into employeedb.department set ?',
            {name: response.newDep},
            function(err, res){
                if(err) throw err;
                console.log(response.newDep + ' Added');
                start();
            })
        })
};

function removeDepart() {
    inquirer
        .prompt(
            {
                type: 'number',
                name: 'depId',
                message: 'ID of Department to Remove'
            }).then(response => {
                connection.query('delete from employeedb.department where id = ?',
                {id:response.depId}, function(err, res){
                    if(err) throw err;
                    console.log(res.affectedRows + ' Departments Removed')
                    start();
                })
            })
}

function totalBudget() {
    inquirer.prompt(
        {
            type: 'list',
            name: 'dep',
            message: 'Which department would you like to see?',
            choices: ['Managment', 'Engineer', 'Sales', 'Maintenance']
        }
    ).then(response => {

        connection.query()
    })
}