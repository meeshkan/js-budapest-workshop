import fetchSomeData, { getPerson } from "../src/lubos-verybest-function";
import unmock, { u } from "unmock";

unmock
  .nock("https://www.js-budapest.com/api")
  .get("/somedata")
  .reply(200, { somedata: u.array({
    id: u.number(),
    data: u.object(u.object())
  })})
  .get("/persons/{id}")
  .reply(200, { name: u.string(), lastname: u.string('name.lastName') });

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test("should fetch some data", async () => {
  const somedata = await fetchSomeData();
  expect(somedata instanceof Array).toBe(true);
  expect(typeof somedata[0].id).toBe("number");
  expect(typeof somedata[0].data).toBe("object");
});

test("gets person", async () => {
  const person = await getPerson(2);
  expect(typeof person.name).toBe("string");
  expect(typeof person.lastname).toBe("string");
});