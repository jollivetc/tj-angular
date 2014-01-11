var app = angular.module('loanApp', ['ngResource']);

app.controller('mainCtrl', function($scope, Loan){

    //Define the model for persons
    var persons = [
        {name: 'Luke Skywalker', picture: 'lukeskywalker.jpg'},
        {name: 'Doctor Who', picture: 'doctorWho.jpg'},
        {name: 'Actarus', picture: 'actarus.jpg'},
        {name: 'Capitaine Kirk', picture: 'kirk.jpeg'}
    ];

    $scope.loans = Loan.query();
    $scope.persons = persons;

    $scope.remaining = function () {
        return $scope.loans.reduce(function (count, loan) {
            return loan.done ? count : count + 1;
        }, 0);
    };

    $scope.ajouter = function(newLoan, selectedPerson){
        //var loan = {object: newLoan.loanedObject, person: selectedPerson, done: false};
        var loan = new Loan();
        loan.object = newLoan.loanedObject;
        loan.person = selectedPerson;
        loan.$save(function(){
            $scope.loans = Loan.query();
        });

        $scope.newLoan = {};
        $scope.selectedPerson = {};
    }

    $scope.details = function(id){
        Loan.get({loanId: id}, function(loan){
            $scope.currentLoan = loan;
        });
    }
});

app.filter('picUrl', function () {
    return function (personPic) {
        return 'pics/' + personPic;
    };
});

app.factory('Loan',function($resource){
    var Loan = $resource(
           'http://localhost:8000/api/loans/:loanId',
           {},
           {
               update:{method:'PUT'}
           }
       );
        Loan.prototype.done=false;
        return Loan;
});

app.directive('tjAvatar', function(){
    return{
        restrict: 'E',
        replace: true,
        scope: {
            personpic: '='
        },
        template: '<div class="avatar label">' +
            '<img ng-src="{{personpic | picUrl}}" class="thumb">' +
            '</div>'

    }
});