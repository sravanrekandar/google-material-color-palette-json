require('jsdom').env('', function(err, window) {
    if (err) {
        console.error(err)
        return;
    }

    var $ = require('jquery')(window)
    require('./generateColorsJSON')($)
    require('./generateSVGForDemo')($)
});
