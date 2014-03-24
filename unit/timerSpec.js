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

        describe('meridiem', function () {
            var meridiem;

            beforeEach(function () {
                meridiem = elementFactory();
                spyOnSelector('.time_meridiem', meridiem);
            });

            it('should display AM at morning', function () {
                now.hours = 11;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(meridiem.innerHTML).toBe('AM');
            });

            it('should display PM at evening', function () {
                now.hours = 12;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(meridiem.innerHTML).toBe('PM');
            });

        });
        describe('hours', function () {
            var hour;

            beforeEach(function () {
                hour = elementFactory();
                spyOnSelector('.time_hour', hour);
            });

            it('should be zero at midnight', function () {
                now.hours = 0;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(hour.innerHTML).toBe('00');
            });

            it('should be twelve at forenoon', function () {
                now.hours = 12;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(hour.innerHTML).toBe('12');
            });

            it('should be less than twelve at evening', function () {
                now.hours = 20;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(hour.innerHTML).toBe('08');
            });
        });

        describe('minutes', function () {
            var minute;

            beforeEach(function () {
                minute = elementFactory();
                spyOnSelector('.time_minute', minute);
            });

            it('should display number', function () {
                now.minutes = 59;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(minute.innerHTML).toBe('59');
            });

            it('should be zeroizing to double digit', function () {
                now.minutes = 9;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(minute.innerHTML).toBe('09');
            });
        });
    });
});
