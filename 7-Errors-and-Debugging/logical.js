const logical = () => {
  let num = 5;
  if ((num = 10)) {
    console.log(`x = ${num}`);
  } else {
    console.log(`x != 10`);
  }
};

module.exports = logical;
