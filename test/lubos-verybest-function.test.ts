import fetchSomeData from "../src/lubos-verybest-function";
import unmock from "unmock";

unmock
  .nock("https://www.js-budapest.com/api")
  .get("/somedata")
  .reply(200, { somedata: [{ id: 0, data: "Awesome data" }]});

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test("should fetch attendees", async () => {
  const somedata = await fetchSomeData();
  expect(somedata.length).toBeGreaterThan(0);
});