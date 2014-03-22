describe('Timer', function () {
    var now = {
        milliseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
        month: 0
    };

    function elementFactory () {
        return {
            style: jasmine.createSpy(),
            classList: {
                add: jasmine.createSpy(),
                remove: jasmine.createSpy()
            },
            setAttribute: jasmine.createSpy()
        };
    }

    function spyOnTime (time) {
        for (var accuracy in time) {
            var methodName = 'get' + accuracy.slice(0, 1).toUpperCase() + accuracy.slice(1);
            spyOn(Date.prototype, methodName).and.returnValue(time[accuracy]);
        }
    }

    beforeEach(function () {
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    describe('should show text that current time', function () {
        function spyOnSelector (target, spyObj) {
            spyOn(document, 'querySelector').and.callFake(function (selector) {
                if (selector === target) {
                    return spyObj;
                } else {
                    return elementFactory();
                }
            });
        }

        afterEach(function () {
            now.hours = 2;
        });

        it('for meridiem at morning', function () {
            var meridiem = elementFactory();
            spyOnSelector('.time_meridiem', meridiem);
            now.hours = 11;
            spyOnTime(now);

            Timer();

            jasmine.clock().tick(41);

            expect(meridiem.innerHTML).toBe('AM');
        });

        it('for meridiem at evening', function () {
            var meridiem = elementFactory();
            spyOnSelector('.time_meridiem', meridiem);
            now.hours = 12;
            spyOnTime(now);

            Timer();

            jasmine.clock().tick(41);

            expect(meridiem.innerHTML).toBe('PM');
        });
    });
});
