const test = (title, fn) => {
  const errors = [];
  const assert = (condition, errorMessage) =>
    !condition && errors.push(errorMessage);
  fn(assert);

  if (errors.length) {
    console.error("Test Failed: %s", title);
    for (const msg of errors) {
      console.error(msg);
    }
  } else {
    console.log("Test Passed: %s", title);
  }
};

export default test;
