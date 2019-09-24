import fetchLobotomies, { getIndividualLobotomy } from "../src/banhills-awesome-function";
import unmock, { u, runner, transform } from "unmock";
import { IService } from "unmock-core/dist/service/interfaces"
// import * as jsp from "json-schema-poet";

const { withCodes, responseBody } = transform;

unmock
  .nock("https://www.js-budapest.com/api", "budapest")
  .get("/lobotomies")
  .reply(200, { lobotomies: u.array({ id: u.integer(), name: u.string() }) })
  .reply(401, { message: 'Unauthorized' })
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

test("banhills awesome function pulls something from an api", runner(async () => {
  budapest.state(withCodes(200))

  const lobotomies = await fetchLobotomies();
  expect(lobotomies).toMatchObject({
    ...JSON.parse(budapest.spy.getResponseBody()),
    onInternetExplorer: true
  })
  expect(analytics.spy.postRequestPath()).toBe("/api/")

  analytics.spy.resetHistory()
  budapest.spy.resetHistory()
}));

test("banhills awesome function pulls something from an api when fails", async () => {
  budapest.state(withCodes(401))

  const lobotomies = await fetchLobotomies();
  expect(lobotomies.lobotomies).toEqual([])
  expect(lobotomies.error).toBe(true)
});

test("get individual lobotony", async () => {
  const lobotomy = await getIndividualLobotomy(9);
  expect(typeof lobotomy.name).toBe("string");
});
