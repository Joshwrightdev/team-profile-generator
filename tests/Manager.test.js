const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");

test("set office number with construct arg", () => {
  const testValue = 1;
  const e = new Manager("var", 1, "gmail@gmail.com", testValue);
  expect(e.officeNumber).toBe(testValue);
});
