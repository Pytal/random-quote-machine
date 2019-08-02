const randomBetween = (min, max) => ( Math.floor( Math.random() * (max - min + 1) + min ) );

const getNewValue = (prev, arr) => {
  const min = 0;
  const max = arr.length - 1;
  let curr;
  do { curr = arr[randomBetween(min, max)] } while (curr === prev);
  return curr;
};

export { getNewValue };
