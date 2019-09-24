import fetchSomeData, { getPerson } from "../src/lubos-verybest-function";
import unmock from "unmock";

unmock
  .nock("https://www.js-budapest.com/api")
  .get("/somedata")
  .reply(200, { somedata: [{ id: 0, data: "Awesome data" }]})
  .get("/persons/{id}")
  .reply(200, { name: "Jack", surname: "Handsome" });

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test("should fetch some data", async () => {
  const somedata = await fetchSomeData();
  expect(somedata.length).toBeGreaterThan(0);
});

test("gets person", async () => {
  const person = await getPerson(2);
  expect(person.name).toBe("Jack");
  expect(person.surname).toBe("Handsome");
});