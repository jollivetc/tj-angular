"use strict";
describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('loanApp'));

    var mainCtrl,
        scope;

    var mockLoan = {
        query: function () {
            return "mockData";
        }
    }

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        mainCtrl = $controller('mainCtrl', {
            $scope: scope,
            Loan: mockLoan
        });
    }));

    it('should attach a list of person to the scope', function () {
        expect(scope.persons.length).toBe(4);
    });

    it('should load loans from backend and expose in scope', function () {
        expect(scope.loans).toBe("mockData");
    });

});


describe('Service : Loan', function () {
    var testedLoan,
         httpBackend;
    beforeEach(function () {
        //load the module.
        module('loanApp');

        //get your service, also get $httpBackend
        //$httpBackend will be a mock, thanks to angular-mocks.js
        inject(function ($httpBackend, Loan) {
            testedLoan = Loan;
            httpBackend = $httpBackend;
        });
    });

    //make sure no expectations were missed in your tests.
    //(e.g. expectGET or expectPOST)
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should call backend on load', function(){
        var returnedData = {result: 'from backend'};

        httpBackend.expectGET('http://localhost:8000/api/loans/1').respond(returnedData);

        testedLoan.get({loanId: 1}, function(){});

        httpBackend.flush();

    })

});
