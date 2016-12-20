const {expect} = require('util/chai-sinon');
const AboutHearingCtrl = require('app/modules/abouthearing/AboutHearingCtrl');

describe('AboutHearingCtrl', () => {

    let ctrlInstance1,
        ctrlInstance2,
        router = function() {};
    
    describe('creating multiple instances of AboutHearingCtrl', function() {

        beforeEach(() => {
            ctrlInstance1 = AboutHearingCtrl.instance(router);
            ctrlInstance2 = AboutHearingCtrl.instance(router);
        });

        afterEach(() => {
            ctrlInstance1 = undefined;
            ctrlInstance2 = undefined;
        });

        it('should only create a single instance', () => {
            expect(ctrlInstance1).to.deep.equal(ctrlInstance2);
        });

    });

    describe('instantiating AboutHearingCtrl with the new keyword', function() {

        it('should throw an Error', function() {
            expect(() => {
                new AboutHearingCtrl();
            }).to.throw(Error, 'Cannot construct AboutHearing singleton, use the static instance function');
        });

    });

});