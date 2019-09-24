import adder from "../src/mikes-awesome-function";

test("mikes awesome function in fact adds two numbers", () => {
  expect(adder(2,5)).toBe(7);
});