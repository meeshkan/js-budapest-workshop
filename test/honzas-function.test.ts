import { fetchCoffees, getCoffeeType } from "../src/honza-function";
import unmock, { u } from "unmock";

unmock
    .nock("https://www.js-budapest.com/api")
    .get("/coffees")
    .reply(200, { coffees: u.array(
        { type: u.string(), rating: u.integer({ minimum: 1 }) }
        ) })
    .get("/coffees/{type}")
    .reply(200, { type: u.string(), rating: u.integer({ minimum:1 }) });


beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test("coffee count test", async () => {
    const coffees = await fetchCoffees();
    expect(coffees instanceof Array).toBe(true);
});

test("coffee type test", async () => {
    const coffees = await getCoffeeType("espresso");
    expect(coffees.rating).toBeGreaterThan(0);
});

