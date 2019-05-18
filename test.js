class Queue {
  constructor() {
    this.queue = [];
    // this.task = this.task.bind(this);
    // this.run = this.run.bind(this);
  }

  task(fn, delay) {
    this.queue.push(function () {
      setTimeout(function () {
        fn();
      }, delay);
    });
    return this;
  }

  run() {
    this.queue.forEach(fn => {
      fn();
    });
  }

}

// new Queue()
//   .task(() => {
//     console.log(1)
//   }, 1000).task(() => {
//     console.log(2)
//   }, 2000).task(() => {
//     console.log(3)
//   }, 3000).run();

//2
function sum(num1) {
  var count = num1;
  var tmp = function (num2) {
    count += num2;
    return tmp;
  }

  tmp.valueOf = function () {
    console.log(count);
    return count;
  }
  return tmp;
};
sum(1)(2)(3)(4).valueOf();

function getData(url) {
  return new Promise((resolve, reject) => {
    try {
      axios.get(url, function (res) {
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  })
}

function parallelReqs(n) {
  var parallelReqArr = [];
  for (let i = 0; i < n; i++) {
    parallelReqArr.push(getData(url));
  }
  Promise.all(parallelReqArr).then();
}
