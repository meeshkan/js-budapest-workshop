import { fetchCoffees, getCoffeeType }  from "../src/honza-function";
import unmock from "unmock";

unmock
    .nock("https://www.js-budapest.com/api")
    .get("/coffees")
    .reply(200, { coffees: [{ type: "espresso", rating: "very good" }] })
    .get("/coffees/{type}")
    .reply(200, { type: "espresso", rating: "very good"});

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test ("coffee count test", async() => {
    const coffees = await fetchCoffees();
    expect(coffees.length).toBeGreaterThanOrEqual(1);
});

test ("coffee type test", async() => {
    const coffees = await getCoffeeType("espresso");
    expect(coffees.rating).toBe("very good");
});

