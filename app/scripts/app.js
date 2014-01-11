var app = angular.module('loanApp', []);

app.controller('mainCtrl', function($scope){

    //Define the model for persons
    var persons = [
        {name: 'Luke Skywalker', picture: 'lukeskywalker.jpg'},
        {name: 'Doctor Who', picture: 'doctorWho.jpg'},
        {name: 'Actarus', picture: 'actarus.jpg'},
        {name: 'Capitaine Kirk', picture: 'kirk.jpeg'}
    ];
    //Define the model for loans
    var loans = [
        {id:1, object: 'sabre laser', person: persons[0], done: true},
        {id:2, object: 'Tournevis sonique', person: persons[1], done: false},
        {id:3, object: 'Goldorak', person: persons[2], done: false}
    ];

    $scope.loans = loans;
    $scope.persons = persons;

    $scope.remaining = function () {
        return $scope.loans.reduce(function (count, loan) {
            return loan.done ? count : count + 1;
        }, 0);
    };

    $scope.ajouter = function(newLoan, selectedPerson){
        var loan = {object: newLoan.loanedObject, person: selectedPerson, done: false};
        loans.push(loan);
        $scope.newLoan = {};
    }
});