import multiply from "../src/honza-function";

test("honzas multiply function", () => {
    expect(multiply(3, 5)).toBe(15);
});