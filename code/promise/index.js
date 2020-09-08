const MyPromise = require('./MyPromise');

let promise = new MyPromise((resolve, reject) => {
  //   resolve('success');
  reject('fail');
});

promise.then(
  (res) => {
    console.log(res, 'res');
  },
  (err) => {
    console.log(err, 'err');
  }
);
