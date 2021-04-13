const Engineer = require("../lib/Engineer");

test(" set GH account via construct arg", () => {
  const testValue = "username";
  const e = new Engineer("var", 1, "gmail@gmail.com", testValue);
  expect(e.github).toBe(testValue);
});
