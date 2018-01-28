let cleanRoom = () => {
    return new Promise((resolve, reject) => resolve('cleaned the room'));
};

let takeOutGarbage = (p) => {
    return new Promise((resolve, reject) => resolve(p + ' took out garbage'));
};

let winIceCream = (p) => {
    return new Promise((resolve, reject) => resolve(p + ' won ice cream'));
};

cleanRoom().then((result) => {
    return takeOutGarbage(result);
}).then((result) => {
    return winIceCream(result);
}).then((result) => {
    console.log('finished ' + result);
});

