import fetchSomeData, { getPerson } from "../src/lubos-verybest-function";
import unmock, { u, runner } from "unmock";
import { IService } from "unmock-core/dist/service/interfaces";

unmock
  .nock("https://www.js-budapest.com/api", "budapest")
  .get("/somedata")
  .reply(200, { somedata: u.array({
    id: u.number(),
    data: u.object(u.object())
  })})
  .get("/persons/{id}")
  .reply(200, { name: u.string(), lastname: u.string('name.lastName') });
unmock
  .nock("https://www.analytics.com/api", "analytics")
  .post("/test/")
  .reply(200);

let budapest: IService;
let analytics: IService;

beforeAll(() => {
  const services = unmock.on().services;
  budapest = services.budapest;
  analytics = services.analytics;
});
beforeEach(() => {
  budapest.reset();
  analytics.reset();
})
afterAll(() => unmock.off());

test("should fetch some data", runner(async() => {
  const somedata = await fetchSomeData();

  expect(somedata.somedata instanceof Array).toBe(true);

  expect(somedata).toMatchObject({
    ...JSON.parse(budapest.spy.getResponseBody()),
    onInternetExplorer: true,
  });

  expect(analytics.spy.postRequestPath()).toBe("/api/test/");

  if (somedata.somedata.length > 3) {
    expect(typeof somedata.somedata[3].id).toBe("number");
  }

  analytics.spy.resetHistory();
  budapest.spy.resetHistory();
}));

test("gets person", async() => {
  const person = await getPerson(2);

  expect(typeof person.name).toBe("string");
  expect(typeof person.lastname).toBe("string");
});