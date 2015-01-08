describe('Tabata', function () {
	var count, round, roundNum;
    function facultyCount () {
        var counter = jasmine.createSpyObj('counter', ['init', 'prefix', 'set', 'show']);
        counter.init.and.returnValue(counter);
        counter.prefix.and.returnValue(counter);
        counter.set.and.returnValue(counter);

        return counter;
    }

    beforeEach(function () {
    	var counter = {};
    	count = counter['tabata'] = facultyCount();
    	roundNum = counter['tabata-round-num'] = facultyCount();
    	round = counter['tabata-round'] = facultyCount();
        spyOn(window, 'Count').and.callFake(function (params) {
        	return counter[params.name];
        });

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

			it('should init count', function () {
				expect(Count).toHaveBeenCalledWith({
					name: 'tabata',
					className: 'tabataTestName',
                	handler: '.time-cycle'
				});

				expect(count.init).toHaveBeenCalled();
			});

			it('should init round number', function () {
				expect(Count).toHaveBeenCalledWith({
					name: 'tabata-round-num',
                	handler: '#count-set',
                	digit: 1,
                	division: '',
                	hidden: true
				});

				expect(roundNum.init).toHaveBeenCalled();
			});

			it('should init round', function () {
				expect(Count).toHaveBeenCalledWith({
		            name: 'tabata-round',
		            handler: '#count-set',
		            digit: 1,
		            division: '',
		            hidden: true
				});

				expect(round.init).toHaveBeenCalled();
			});
		});

		describe('show', function () {
			beforeEach(function () {
				tabata = Tabata();
				tabata.init();
			});

			it('should init value of count', function () {
				tabata.show();
				expect(count.set).toHaveBeenCalledWith(0);
			});

			it('should show count component', function () {
				tabata.show();
				expect(count.show).toHaveBeenCalled();
			});

			it('should show round number component', function () {
				tabata.show();
				expect(roundNum.show).toHaveBeenCalled();
			});

			it('should show round component', function () {
				tabata.show();
				expect(round.show).toHaveBeenCalled();
			});
		});
	});
});