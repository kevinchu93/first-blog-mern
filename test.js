(helloCatAsync(function(result) {
    console.log(result);
    test = result;
}));

function helloCatAsync(callback) {
        callback('Nya');
}

setInterval(function() {
    console.log(test);
}, 1000);

