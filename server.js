var mysql = require("mysql");
var inquirer = require("inquirer");
// const cTable = require('console.table');

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
            "Update an Employee's Role",
            "Update an Employee's Manager",
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
                updateEmpRole();
                break;
            case "Update an Employee's Manager":
                updateEmpMang();
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
        console.log(res);
        start();
    })
    
};

function employeeByDep() {
    var query = 'select employee.first_name, employee.last_name, role.title from employeedb.role inner join employeedb.employee on (role.id = employee.role_id)'

    connection.query(query, function (err, res) {
        if (err) throw err;
        console.log(res);
        start();
    })
};
