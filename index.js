const esprima = require('esprima');

const hej = esprima.parseScript(`
const test = val => {
  if (val) {
    if (val2) {
      return 'GOOD'
    } else {
      return 'BAD'
    }
  } else {
    return 'NOTHING'
  }
};

    `);
console.log(JSON.stringify(hej, null, 2));
