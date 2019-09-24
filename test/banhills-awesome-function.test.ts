import fetchLobotomies, { getIndividualLobotomy } from "../src/banhills-awesome-function";
import unmock, { u } from "unmock";
import { IService } from "unmock-core/dist/service/interfaces"
// import * as jsp from "json-schema-poet";

unmock
  .nock("https://www.js-budapest.com/api", "budapest")
  .get("/lobotomies")
  .reply(200, { lobotomies: u.array({ id: u.integer(), name: u.string() }) })
  .get("/lobotomies/{id}")
  .reply(200, { id: u.integer(), name: u.string() });
unmock
  .nock("https://www.analytics.com/api", "analytics")
  .post("/")
  .reply(200)

let budapest: IService;
let analytics: IService;

beforeAll(() => {
  const services = unmock.on().services;
  budapest = services.budapest;
  analytics = services.analytics;
});
beforeEach(() => {
  budapest.reset()
  analytics.reset()
})
afterAll(() => unmock.off());

test("banhills awesome function pulls something from an api", async () => {
  const lobotomies = await fetchLobotomies();
  expect(lobotomies).toMatchObject({
    ...JSON.parse(budapest.spy.getResponseBody()),
    onInternetExplorer: true
  })
  expect(analytics.spy.postRequestPath()).toBe("/api/")
});

test("get individual lobotony", async () => {
  const lobotomy = await getIndividualLobotomy(9);
  expect(typeof lobotomy.name).toBe("string");
});
