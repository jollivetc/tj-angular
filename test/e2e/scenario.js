'use strict';

describe('filter', function(){
    it('should filter', function () {
        browser.get('http://localhost:9000/#/');

        var firstElement = element(by.repeater('loan in loans').row(0).column('{{loan.object | uppercase}}'));
        expect(firstElement.getText()).toBe('SABRE LASER');
        element(by.model('search')).sendKeys('tour');
        firstElement = element(by.repeater('loan in loans').row(0).column('{{loan.object | uppercase}}'));
        expect(firstElement.getText()).toBe('TOURNEVIS SONIQUE');
    });
});