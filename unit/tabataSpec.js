describe('Tabata', function () {
	var count, round, roundNum;
	var audio;
    function facultyCount () {
        var counter = jasmine.createSpyObj('counter', ['init', 'prefix', 'set', 'show', 'hide', 'get']);
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
		audio = [];
		window.Audio = jasmine.createSpy('audio');
		window.Audio.and.callFake(function (param) { 
			audio.push(jasmine.createSpy('play' + audio.length));
			return {
				name: param,
				play: audio[audio.length - 1],
				load: jasmine.createSpy('loadAudio')
			};
		});
    });

    describe('option', function () {
    	beforeEach(function () {
    		Tabata();
    	});

    	describe('audio', function () {
    		it('should new a audio for positive', function () {
    			expect(window.Audio.calls.all()[0].args[0]).toEqual('audio/do.wav');
    		});

    		it('should new a audio for relax', function () {
    			expect(window.Audio.calls.all()[1].args[0]).toEqual('audio/re.wav');
    		});

    		it('should new a audio for end of positive', function () {
    			expect(window.Audio.calls.all()[2].args[0]).toEqual('audio/disable.wav');
    		});

    		it('should new a audio for end of relax', function () {
    			expect(window.Audio.calls.all()[3].args[0]).toEqual('audio/enable.wav');
    		});
    	});
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

		describe('hide', function () {
			beforeEach(function () {
				tabata = Tabata();
				tabata.init();
			});

			it('should hide count component', function () {
				tabata.hide();
				expect(count.hide).toHaveBeenCalled();
			});

			it('should hide round number component', function () {
				tabata.hide();
				expect(roundNum.hide).toHaveBeenCalled();
			});

			it('should hide round component', function () {
				tabata.hide();
				expect(round.hide).toHaveBeenCalled();
			});
		});

		describe('start', function () {
			var classList;

			beforeEach(function () {
				classList = jasmine.createSpyObj('classList', ['add', 'remove']);
				spyOn(document, 'querySelector').and.returnValue({
					'classList': classList
				});

				tabata = Tabata({ round: 2, pause: 3 });
				tabata.init();
			});

			describe('starting', function () {
				beforeEach(function () {
					jasmine.clock().install();
					tabata.start();
				});

				afterEach(function () {
					jasmine.clock().uninstall();
				});

				describe('when before pause', function () {
					it('should set round number', function () {
						expect(roundNum.set).toHaveBeenCalledWith(2);					
					});

					it('should set round', function () {
						expect(round.set).toHaveBeenCalledWith(['*', '*']);					
					});

					it('should set count to pause seconds', function () {
						expect(count.set).toHaveBeenCalledWith(3);
					});

					it('should add class to background', function () {
						expect(document.querySelector).toHaveBeenCalledWith('.main');
						expect(classList.add).toHaveBeenCalledWith('relax');
					});
				});

				describe('when pause', function () {
					beforeEach(function () {
						count.get.and.returnValue([2]);
						jasmine.clock().tick(1001);
					});
					
					it('should decrease second', function () {
						expect(count.set.calls.mostRecent().args[0]).toEqual([1]);
					});

					it('should play sounds for relax', function () {
						expect(audio[1]).toHaveBeenCalled();
					});
				});

				describe('when end pause', function () {
					beforeEach(function () {
						count.get.and.returnValue([1]);
						jasmine.clock().tick(1001);
					});
					
					it('should decrease second to zero', function () {
						expect(count.set).toHaveBeenCalledWith([0]);
					});

					it('should play sounds for end of relax', function () {
						expect(audio[3]).toHaveBeenCalled();
					});

					it('should clear style of relax', function () {
						expect(document.querySelector).toHaveBeenCalledWith('.main');
						expect(classList.remove).toHaveBeenCalledWith('relax');
					});
				});
			});
		});
	});
});