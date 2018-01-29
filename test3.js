function asyncFunction(name, callback) {
      const err = null
      callback(err, `Hi ${name}`);
}

function asyncFunctionWithErr(input, callback) {
      const result = null;
      callback(new Error('This function fails'), result);
}

/*
 * asyncFunction('Eric', (err, message) => {
 *   if (err)
 *       throw err;
 *         console.log(message);
 *           asyncFunctionWithErr(message, (err, result) => {
 *               if (err)
 *                     throw err;
 *                         console.log(result);
 *                           })
 *                           });
 *                           */

function promiseFunction(name) {
      return Promise.resolve(`Hi ${name}`);
}

function promiseFunctionWithErr(input) {
      return Promise.reject(new Error('This function fails'));
}

promiseFunction('Kevin').then(message => {
      console.log(message);
}).then(message => {
      return promiseFunctionWithErr(message);
}).then(result => {
      console.log(result);
}).catch(err => {
      console.log(err.message);
});

/*
    try {
          const message = await promiseFunction('World');
          const result = await promiseFunctionWithErr(message);
    }
catch (err) {
      console.log(err);
}
*/
