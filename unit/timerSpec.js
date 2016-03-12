define(['jquery', 'timer', 'helper/clock'], function ($, Timer, clock) {
    describe('Timer', function () {
        beforeEach(function () {
            this.timer = Timer();
        });
        describe('when start', function () {
            it('should record time', function () {
                var timeElm = $('<time>');
                timeElm.appendTo('body');
                var date = new Date();
                clock.mockTime(date);
                jasmine.clock().install();

                this.timer.start();
                jasmine.clock().tick(41);

                expect(timeElm.attr('datetime')).toEqual(date.toLocaleString());
                jasmine.clock().uninstall();
            })
        });
    });
});
