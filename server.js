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
            case "Update an Employee's Role":
                updateEmployee();
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
    ).then(function (response){
        let query = 'delete from employeedb.employee where ?'
        connection.query(query,
                {id: response.employeeId},
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + 'Employee removed')
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
        switch(response.choices){
            case 'Update Employee name':
                inquirer.prompt(
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
                connection.query('update employeedb.employee')
                })
            break;

            case 'Update Employee role':
                connection.query()
            break;

            case 'Update Employee manager':
                connection.query()
            break;
        }
    })
    
}

function totalBudget() {

}