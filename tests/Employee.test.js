const Employee = require("../lib/Employee");

describe("Employee", () => {
  it("Can set name with construct args", () => {
    const name = "Adam";
    const e = new Employee(name);
    expect(e.name).toBe(name);
  });

  it("Can set id via construct arg", () => {
    const testValue = 100;
    const e = new Employee("var", testValue);
    expect(e.id).toBe(testValue);
  });

  it("Can set email via construct arg", () => {
    const testValue = "gmail@gmail.com";
    const e = new Employee("var", 1, testValue);
    expect(e.email).toBe(testValue);
  });

  describe("getName", () => {
    it("Can get name via getName()", () => {
      const testValue = "Eve";
      const e = new Employee(testValue);
      expect(e.getName()).toBe(testValue);
    });
  });
});
