import fetchCoffees from "../src/honza-function";
import unmock from "unmock";

unmock
    .nock("https://www.js-budapest.com/api")
    .get("coffees")
    .reply(200, { coffees: [{ id: 0, type: "espresso" }] });

beforeAll() => unmock.on(); //intercept http requests for all tests
afterAll() => unmock.off();

test ("testing honzas API", async() => {
    const coffees = await fetchCoffees();
    expect(coffees.length).toBeGreaterThanOrEqual(100000);

});