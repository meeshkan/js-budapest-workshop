import { myMultiply } from "../src/pondrejk-function";

test("peter function in fact multiplies two numbers", () => {
  expect(myMultiply(2,5)).toBe(10);
});