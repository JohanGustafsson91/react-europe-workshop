export const pipe = (...funcs) => (...args) =>
  funcs.reduce((acc, curr, i) => (i === 0 ? curr(...acc) : curr(acc)), args);

export const partial = (fn, args) => (...restOfArgs) =>
  fn(...args.concat(restOfArgs));
