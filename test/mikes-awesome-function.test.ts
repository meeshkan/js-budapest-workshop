import fetchAttendees, { getIndividualAttendeeInfo } from "../src/mikes-awesome-function";
import unmock, { u } from "unmock";

unmock
  .nock("https://www.js-budapest.com/api")
  .get("/attendees")
  .reply(200, { attendees: u.array({ id: u.integer({ minimum: 1 }), name: u.string() }) })
  .get("/attendees/{id}")
  .reply(200, { id: u.integer(), name: u.string() });

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test("mikes awesome function in fact adds two numbers", async () => {
  const attendees = await fetchAttendees();
  expect(attendees instanceof Array).toBe(true);
});

test("gets individual attendee ok", async () => {
  const attendee = await getIndividualAttendeeInfo(4);
  expect(attendee.id).toBeGreaterThan(0);
  expect(typeof attendee.name).toBe("string");
 });