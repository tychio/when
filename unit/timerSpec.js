describe('Timer', function () {
    var now = {
        milliseconds: 0,
        seconds: 0,
        minutes: 0,
        hours: 0,
        month: 0
    };

    function spyOnTime (time) {
        for (var accuracy in time) {
            var methodName = 'get' + accuracy.slice(0, 1).toUpperCase() + accuracy.slice(1);
            spyOn(Date.prototype, methodName).and.returnValue(time[accuracy]);
        }
    }

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

    function spyOnSelector (target, spyObj) {
        spyOn(document, 'querySelector').and.callFake(function (selector) {
            if (target[selector]) {
                return spyObj[target[selector]];
            } else if (selector === target) {
                return spyObj;
            } else {
                return elementFactory();
            }
        });
    }

    beforeEach(function () {
        jasmine.clock().install();
    });

    afterEach(function() {
        jasmine.clock().uninstall();
    });

    describe('text of', function () {
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

            afterEach(function () {
                now.hours = 0;
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

            afterEach(function () {
                now.minutes = 0;
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

        describe('seconds', function () {
            var second;

            beforeEach(function () {
                second = elementFactory();
                spyOnSelector('.time_second', second);
            });

            afterEach(function () {
                now.seconds = 0;
            });

            it('should display number', function () {
                now.seconds = 59;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(second.innerHTML).toBe('59');
            });

            it('should be zeroizing to double digit', function () {
                now.seconds = 9;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(second.innerHTML).toBe('09');
            });
        });
    });

    describe('pointer of', function () {
        var pointer;
        beforeEach(function () {
            pointer = {
                hour: elementFactory(),
                minute: elementFactory(),
                second: elementFactory()
            };
            spyOnSelector({
                '.point_hour': 'hour',
                '.point_minute': 'minute',
                '.point_second': 'second'
            }, pointer);
        });

        describe('hour', function () {
            beforeEach(function () {
                now.minutes = 0;
            });

            afterEach(function () {
                now.hours = 0;
            });

            it('should fix webkit, moz and standard', function () {
                Timer();
                jasmine.clock().tick(40);

                expect(pointer.hour.style['-webkit-transform']).toBeDefined();
                expect(pointer.hour.style['-moz-transform']).toBeDefined();
                expect(pointer.hour.style['transform']).toBeDefined();
            });

            it('should be correct rotate and skew when 0 o clock', function () {
                now.hours = 0;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(pointer.hour.style.transform).toEqual('rotate(-75deg) skew(-60deg)');
            });

            it('should be correct rotate and skew when 00:01:00 o clock', function () {
                now.hours = 0;
                now.minutes = 1;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(pointer.hour.style.transform).toEqual('rotate(-74.5deg) skew(-60deg)');
            });

            it('should be correct rotate and skew when 24 o clock', function () {
                now.hours = 24;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(pointer.hour.style.transform).toEqual('rotate(645deg) skew(-60deg)');
            });
        });

        describe('minute', function () {
            beforeEach(function () {
                now.seconds = 0;
            });

            afterEach(function () {
                now.minutes = 0;
            });

            it('should fix webkit, moz and standard', function () {
                Timer();
                jasmine.clock().tick(40);

                expect(pointer.minute.style['-webkit-transform']).toBeDefined();
                expect(pointer.minute.style['-moz-transform']).toBeDefined();
                expect(pointer.minute.style['transform']).toBeDefined();
            });

            it('should be correct rotate and skew when 0 minutes', function () {
                now.minutes = 0;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(pointer.minute.style.transform).toEqual('rotate(-85deg) skew(-80deg)');
            });

            it('should be correct rotate and skew when 00:00:01', function () {
                now.minutes = 0;
                now.seconds = 1;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(pointer.minute.style.transform).toEqual('rotate(-84.9deg) skew(-80deg)');
            });

            it('should be correct rotate and skew when 60 minutes', function () {
                now.minutes = 60;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(pointer.minute.style.transform).toEqual('rotate(275deg) skew(-80deg)');
            });
        });

        describe('second', function () {
            beforeEach(function () {
                now.milliseconds = 0;
            });

            afterEach(function () {
                now.seconds = 0;
            });

            it('should fix webkit, moz and standard', function () {
                Timer();
                jasmine.clock().tick(40);

                expect(pointer.second.style['-webkit-transform']).toBeDefined();
                expect(pointer.second.style['-moz-transform']).toBeDefined();
                expect(pointer.second.style['transform']).toBeDefined();
            });

            it('should be correct rotate and skew when 0 seconds', function () {
                now.seconds = 0;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(pointer.second.style.transform).toEqual('rotate(-88deg) skew(-86deg)');
            });

            it('should be correct rotate and skew when 00:00:00:001', function () {
                now.seconds = 0;
                now.milliseconds = 1;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(pointer.second.style.transform).toEqual('rotate(-87.994deg) skew(-86deg)');
            });

            it('should be correct rotate and skew when 60 seconds', function () {
                now.seconds = 60;
                spyOnTime(now);
                Timer();
                jasmine.clock().tick(40);

                expect(pointer.second.style.transform).toEqual('rotate(272deg) skew(-86deg)');
            });
        });

    });
});
