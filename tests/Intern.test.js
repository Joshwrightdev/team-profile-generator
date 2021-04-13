const Intern = require("../lib/Intern");

test("set school value with construct arg", () => {
  const testValue = "school";
  const e = new Intern("var", 1, "gmail@gmail.com", testValue);
  expect(e.school).toBe(testValue);
});
