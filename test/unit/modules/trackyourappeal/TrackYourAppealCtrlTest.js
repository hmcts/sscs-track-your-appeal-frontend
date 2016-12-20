const {expect, sinon} = require('util/chai-sinon');
const TrackYourAppealCtrl = require('app/modules/trackyourappeal/TrackYourAppealCtrl');

describe('TrackYourAppealCtrl', () => {

    let ctrlInstance1,
        ctrlInstance2,
        router = function() {};

    describe('creating multiple instances of TrackYourAppealCtrl', function() {

        beforeEach(() => {
            ctrlInstance1 = TrackYourAppealCtrl.instance(router);
            ctrlInstance2 = TrackYourAppealCtrl.instance(router);
        });

        afterEach(() => {
            ctrlInstance1 = undefined;
            ctrlInstance2 = undefined;
        });

        it('should only create a single instance', () => {
            expect(ctrlInstance1).to.deep.equal(ctrlInstance2);
        });

    });

    describe('instantiating TrackYourAppealCtrl with the new keyword', function() {

        it('should throw an Error', function() {
            expect(() => {
                new TrackYourAppealCtrl();
            }).to.throw(Error, 'Cannot construct TrackYourAppeal singleton, use the static instance function');
        })

    });

});