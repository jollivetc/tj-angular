'use strict';

describe('Loan master page', function () {
    it('it should filter the table', function () {

        browser.get('http://127.0.0.1:9000/#/');

        var firstObject = element(by.repeater('loan in loans'));
        expect(firstObject.getText()).toContain('SABRE LASER');

        element(by.model('search')).sendKeys('tour');

        firstObject = element(by.repeater('loan in loans'));
        expect(firstObject.getText()).toContain('TOURNEVIS SONIQUE');
    });
});