function promiseHi(name) {
    return Promise.resolve(`hi ${name}`);
}

let data = 1;

promiseHi('kevin').then(message => {
    data = 5;
    console.log(data);
});

console.log(data);


setInterval(function() {
    console.log(data);
}, 2000);
