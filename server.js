var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    hot: 'localhost',
    port: 3030,
    user: 'root',
    password:'',
    databse:'employeeDB'
});

connection.connect(function(err){
    if(err) throw err;
    start();
})

function start (){
    inquirer.prompt({
        type: 'list',
        message: 'What would you like to do?',
        name: 'firstAction',
        choices: [
            'View an Employee',
            'Add an Employee',
            'Delete an Employee',
            'View a Role',
            'Add a Role',
            'Delete a Role',
            'View a Department',
            'Add a Department',
            'Delete a Department',
            "Update an Employee's Role",
            "Update an Employee's Manager",
            'View Employees by Manager',
            'View Total Budget by Department'

        ]
    }).then(function(answers){
        
    })
}