requirejs(['./update', './timer', './tabata', 'mod/wind', '../lib/jquery/dist/jquery.min'], function (Update, Timer, Tabata, Wind) {
    var tabataMod = false;
    var timer = Timer();
    timer.start();
    var tabata = Tabata({
        onEnd: toTimerMod
    }).init();
    Wind(function (angle) {
        tabataMod ? toTimerMod() : toTabataMod();
    });

    function toTimerMod () {
        tabataMod = false;
        tabata.hide().stop();
        timer.counter.show();
    }
    function toTabataMod () {
        tabataMod = true;
        tabata.show().start();
        timer.counter.hide();
    }
});