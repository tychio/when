describe('Timer', function () {
    beforeEach(function () {
        spyOn(window, 'Count').and.returnValue({
            init: function () {}
        });
        spyOn(window, 'Dial').and.returnValue({
            init: function () {}
        });
        spyOn(window, 'Sky').and.returnValue({
            init: function () {}
        });
    });
    describe('api', function () {
        it('should return two methods to start and stop timer', function () {
            var timer = Timer();
            expect(timer.start).toBeDefined();
            expect(timer.stop).toBeDefined();
        });
    });
});
