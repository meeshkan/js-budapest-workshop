import fetchLobotomies, { getIndividualLobotomy } from "../src/banhills-awesome-function";
import unmock from "unmock";

unmock
  .nock("https://www.js-budapest.com/api")
  .get("/lobotomies")
  .reply(200, { lobotomies: [{ id: 0, name: 'Some Unfortunate Guy' }] })
  .get("/lobotomies/{id}")
  .reply(200, { lobotomies: [{ id: 0, name: 'Some Unfortunate Guy' }] });

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test("banhills awesome function pulls something from an api", async () => {
  const lobotomies = await fetchLobotomies();
  expect(lobotomies.length).toBeGreaterThan(0);
});

test("get individual lobotony", async () => {
  const lobotomies = await getIndividualLobotomy(9);
  expect(lobotomies.length).toEqual(1);
});
