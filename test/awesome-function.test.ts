import adder from "../src/awesome-function";

test("wow it adds two numbers", () => {
    expect(adder(2, 5)).toBe(7);
});


