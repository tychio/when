describe('Timer', function () {
    var count, dial, sky;
    beforeEach(function () {
        count = jasmine.createSpyObj('count', ['init', 'prefix', 'set']);
        count.prefix.and.returnValue(count);
        spyOn(window, 'Count').and.returnValue(count);

        dial = jasmine.createSpyObj('dial', ['init', 'set']);
        spyOn(window, 'Dial').and.returnValue(dial);

        sky = jasmine.createSpyObj('dial', ['init', 'set']);
        spyOn(window, 'Sky').and.returnValue(sky);
        jasmine.clock().install();
    });

    afterEach(function () {
        jasmine.clock().install(); 
    });
    
    describe('api', function () {
        it('should return two methods to start and stop timer', function () {
            var timer = Timer();
            expect(timer.start).toBeDefined();
            expect(timer.stop).toBeDefined();
        });

        describe('start', function () {
            it('return api', function () {
                var timer = Timer().start();
                expect(timer.start).toBeDefined();
                expect(timer.stop).toBeDefined();     
            });

            describe('timeout', function () {
                beforeEach(function () {
                    var elm = jasmine.createSpyObj('elm', ['setAttribute']);
                    spyOn(document, 'querySelector').and.returnValue(elm);

                    Timer().start();
                });

                it('do not run before', function () {
                    jasmine.clock().tick(39);
                    expect(document.querySelector.calls.any()).toBeFalsy();
                });

                it('run after', function () {
                    jasmine.clock().tick(40);
                    expect(document.querySelector.calls.any()).toBeTruthy();
                });
            });

            describe('records time string', function () {
                var elm;
                beforeEach(function () {
                    jasmine.clock().mockDate(new Date(0));
                    elm = jasmine.createSpyObj('elm', ['setAttribute']);
                    spyOn(document, 'querySelector').and.returnValue(elm);
                    jasmine.clock().tick(88);
                    Timer().start();
                    jasmine.clock().tick(40);
                });

                it('query select a element that id is time', function () {
                    expect(document.querySelector.calls.any()).toBeTruthy();
                    expect(document.querySelector).toHaveBeenCalledWith('time');
                });

                it('set attribute datetime to current date', function () {
                    expect(elm.setAttribute).toHaveBeenCalledWith('datetime', (new Date(88)).toLocaleString());
                });
            });

            describe('set time', function () {
                beforeEach(function () {
                    var elm = jasmine.createSpyObj('elm', ['setAttribute']);
                    spyOn(document, 'querySelector').and.returnValue(elm);
                });

                describe('for count', function () {
                    describe('prefix', function () {
                        it('at morning', function () {
                            var morning = new Date(-28800040);
                            jasmine.clock().mockDate(morning);
                            Timer().start();

                            jasmine.clock().tick(40);
                            expect(count.prefix.calls.mostRecent().args[0]).toEqual('AM');
                        });

                        it('at forenoon', function () {
                            var forenoon = new Date(14399959);
                            jasmine.clock().mockDate(forenoon);
                            Timer().start();

                            jasmine.clock().tick(40);
                            expect(count.prefix.calls.mostRecent().args[0]).toEqual('AM');
                        });

                        it('at afternoon', function () {
                            var afternoon = new Date(14399960);
                            jasmine.clock().mockDate(afternoon);
                            Timer().start();

                            jasmine.clock().tick(40);
                            expect(count.prefix.calls.mostRecent().args[0]).toEqual('PM');
                        });

                        it('at evening', function () {
                            var evening = new Date(57599959);
                            jasmine.clock().mockDate(evening);
                            Timer().start();

                            jasmine.clock().tick(40);
                            expect(count.prefix.calls.mostRecent().args[0]).toEqual('PM');
                        });
                    });
                });
            });
        });

        describe('stop', function () {
            it('return api', function () {
                var timer = Timer().stop();
                expect(timer.start).toBeDefined();
                expect(timer.stop).toBeDefined();     
            }); 
        });

    });
});
