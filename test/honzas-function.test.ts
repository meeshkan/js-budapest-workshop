import fetchCoffees from "../src/honza-function";

test ("testing honzas API", async() => {
    const coffees = await fetchCoffees();
    expect(coffees.length).toBeGreaterThanOrEqual(100000);

});