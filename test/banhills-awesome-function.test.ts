import adder from "../src/banhills-awesome-function";

test("banhills awesome function in fact adds two numbers", () => {
  expect(adder(2, 5)).toBe(7);
});
