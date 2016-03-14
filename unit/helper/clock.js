define(function () {
    return {
        mockTime: function (date) {
            if (date instanceof Date) {
                date = new Date(date);
            }
            spyOn(window, 'Date').and.returnValue(date);
        }
    };
});
