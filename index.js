// wrapP() logs when an async function is invoked and its @return Promise has resolved.
// Ex. output:
//  start 0
// 	 start 1
// 	 end 1
// 		 start 2
//  end 0
// 			 start 3
// 		 end 2
// 				 start 4
// 			 end 3
// 				 end 4
// let numPs = 0;
// const wrapP = (p) => () => {
//   const thisPNum = numPs++;
//   console.log(Array(thisPNum).fill('\t').join(''), 'start', thisPNum);
//   return p()
//     .then((results) => {
//       console.log(Array(thisPNum).fill('\t').join(''), 'end', thisPNum);
//       return results;
//     });
// };

// Collections:
const each = (coll, iter) => new Promise((resolve) => {
  iter(coll['p']).then(p => coll['p'] = p);
  iter(coll['ham']).then(p => coll['ham'] = p);
  console.log(coll);
  resolve(coll);
})

const eachLimit = async (ps, limit) => {
  const arr = [];
  const x = ps.map(p => p());

  const y = await Promise.all(x);
  console.log(y);

  // WEIRD I CANT RETURN 
  // const w = y.map(p =>)...
  // return w;
  //
  // Someone explan...
  const w = [];
  y.map(p => {
    const inv = p.invokedAt;
    const res = p.resolvedAt;

    p.invokedAt = res;
    p.resolvedAt = inv;

    w.push(p);
  })
  console.log(w);
  return w;
};

const eachSeries = async (ps) => ps[0]().then(p => ps[1]().then(k => [p,k]));

const groupBy = async (coll, iter) => {
};

const map = async (promises) => promises[0]()
.then(p => promises[1]().then(k => [p,k]));

const reduce = async (coll, memo, iter) => {
};

const reject = async (coll, iter) => {
};

// Control Flow:
const auto = (tasks) => new Promise((resolve) => {
  resolve({});
});

module.exports = {
  // Collections:
  map,
  eachLimit,
  eachSeries,
  each,
  groupBy,
  reduce,
  reject,

  // Control Flow:
  auto
};
