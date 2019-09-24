import divide from "../src/fnsp-awesome-function";

test("fnsp awesome function in fact divide two numbers", () => {
  expect(divide(6,2)).toBe(3);
  expect(divide(6,0)).toBe(0);
});