const ms = [{
  at: '2017-08-29 19:36:36',
}, {
  at: '2017-08-29 19:36:35',
}, {
  at: '2017-08-29 19:36:34',
}, {
  at: '2017-08-29 19:36:33',
}, {
  at: '2017-08-29 19:36:32',
}, {
  at: '2017-08-29 19:34:35',
}, {
  at: '2017-08-29 19:34:34',
}, {
  at: '2017-08-29 19:34:33',
}, {
  at: '2017-08-29 19:34:31',
}, {
  at: '2017-08-29 19:26:35',
}, {
  at: '2017-08-29 19:26:34',
}, {
  at: '2017-08-29 19:26:33',
}, {
  at: '2017-08-29 19:26:32',
}, {
  at: '2017-08-29 19:26:31',
}];

const datas = [];
ms.reduce((acc, curr, index) => {
  const n = +new Date(curr.at);
  const l = +new Date(acc.at);
// console.log(index,"-->>", l-n)
  if (index == 1) {
    datas.push(curr);
  }
  if (Math.abs(l - n) >= 2000) {
    datas.push(curr);
  }
  return curr;
});
console.log(datas);
