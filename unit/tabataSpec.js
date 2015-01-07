describe('Tabata', function () {
    var count, dial, sky;
    beforeEach(function () {
        count = jasmine.createSpyObj('count', ['init', 'prefix', 'set']);
        count.prefix.and.returnValue(count);
        spyOn(window, 'Count').and.returnValue(count);

		window.Audio = jasmine.createSpy('audio');
		window.Audio.and.callFake(function (param) { return param; });
    });

	describe('api', function () {
		it('should return object contains some apis', function () {
			var tabata = Tabata();
			expect(tabata.init).toBeDefined();
			expect(tabata.show).toBeDefined();
			expect(tabata.hide).toBeDefined();
			expect(tabata.start).toBeDefined();
			expect(tabata.stop).toBeDefined();
		});

		describe('init', function () {
			var tabata;
			beforeEach(function () {
				tabata = Tabata({ name: 'tabataTestName' });
				tabata.init();
			});

			it('init three times', function () {
				expect(count.init.calls.count()).toEqual(3);
			});

			it('count', function () {
				expect(Count).toHaveBeenCalledWith({
					name: 'tabata',
					className: 'tabataTestName',
                	handler: '.time-cycle'
				});
			});

			it('round number', function () {
				expect(Count).toHaveBeenCalledWith({
					name: 'tabata-round-num',
                	handler: '#count-set',
                	digit: 1,
                	division: '',
                	hidden: true
				});
			});

			it('round', function () {
				expect(Count).toHaveBeenCalledWith({
		            name: 'tabata-round',
		            handler: '#count-set',
		            digit: 1,
		            division: '',
		            hidden: true
				});
			});
		});
	});
});