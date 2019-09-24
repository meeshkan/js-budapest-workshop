import fetchCoffees, { getCoffeeType } from "../src/honza-function";
import unmock, { u, runner } from "unmock";
import { IService } from "unmock-core/dist/service/interfaces";

unmock
    .nock("https://www.js-budapest.com/api", "budapest") //give api a name 'budapest'
    .get("/coffees")
    .reply(200, { coffees: u.array(
        { type: u.string(), rating: u.integer({ minimum: 1 }) }
        ) })
    .get("/coffees/{type}")
    .reply(200, { type: u.string(), rating: u.integer({ minimum:1 }) });

unmock
    .nock("https://www.analytics.com/api", "analytics")
    .post("/")
    .reply(200);

let analytics: IService;
let budapest: IService;

beforeAll(() => {
    const services = unmock.on().services; // only use unmock for these services
    budapest = services.budapest;
    analytics = services.analytics;
});
beforeEach( () => {
    budapest.reset();
    analytics.reset();
});
afterAll(() => unmock.off());

test("coffee count test", runner(async () => {
    const coffeeResponse = await fetchCoffees();
    expect(coffeeResponse.coffees instanceof Array).toBe(true);
    expect(coffeeResponse).toMatchObject({
        ...JSON.parse(budapest.spy.getResponseBody()),
        onInternetExplorer: true,
    });
    expect(analytics.spy.postRequestPath()).toBe("/api");
    if(coffeeResponse.coffees.length > 5) {
        expect(typeof coffeeResponse.coffees[5].type).toBe("string"); //thanks to runner there are more random values generated, not in all cases there is at least 5 items in this array
    }
    analytics.spy.resetHistory();
    budapest.spy.resetHistory();
}));

test("coffee type test", async () => {
    const coffees = await getCoffeeType("espresso");
    expect(coffees.rating).toBeGreaterThan(0);
    expect(typeof coffees.type).toBe("string");
});