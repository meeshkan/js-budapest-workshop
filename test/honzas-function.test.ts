<<<<<<< Updated upstream
import multiply from "../src/honza-function";

test("honzas multiply function", () => {
    expect(multiply(3, 5)).toBe(15);
=======
import fetchCoffees from "../src/honza-function";

test ("testing honzas API", async() => {
    const coffees = await fetchCoffees();
    expect(coffees.length).toBeGreaterThanOrEqual(100000);
>>>>>>> Stashed changes
});