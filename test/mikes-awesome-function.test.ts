import fetchAttendees from "../src/mikes-awesome-function";
import unmock from "unmock";
import { IService } from "unmock-core/dist/service/interfaces";

unmock
  .nock("https://www.js-budapest.com/api")
  .get("/attendees")
  .reply(200, { attendees: [{ id: 0, name: "Foo McBar" }]});

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test("mikes awesome function in fact adds two numbers", async () => {
  const attendees = await fetchAttendees();
  expect(attendees.length).toBeGreaterThan(0);
});