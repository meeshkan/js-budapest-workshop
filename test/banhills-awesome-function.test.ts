import fetchLobotomies, { getIndividualLobotomy } from "../src/banhills-awesome-function";
import unmock, { u } from "unmock";

unmock
  .nock("https://www.js-budapest.com/api")
  .get("/lobotomies")
  .reply(200, { lobotomies: u.array({ id: u.integer(), name: u.string() }) })
  .get("/lobotomies/{id}")
  .reply(200, { id: u.integer(), name: u.string() });

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test("banhills awesome function pulls something from an api", async () => {
  const lobotomies = await fetchLobotomies();
  expect(lobotomies instanceof Array).toBe(true);
});

test("get individual lobotony", async () => {
  const lobotomy = await getIndividualLobotomy(9);
  expect(typeof lobotomy.name).toBe("string");
});
