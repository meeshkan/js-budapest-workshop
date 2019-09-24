import fetchAttendees, { getIndividualAttendeeInfo } from "../src/mikes-awesome-function";
import unmock from "unmock";

unmock
  .nock("https://www.js-budapest.com/api")
  .get("/attendees")
  .reply(200, { attendees: [{ id: 0, name: "Foo McBar" }]})
  .get("/attendees/{id}")
  .reply(200, { id: 0, name: "Foo McBar"});

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test("mikes awesome function in fact adds two numbers", async () => {
  const attendees = await fetchAttendees();
  expect(attendees.length).toBeGreaterThan(0);
});

test("gets individual attendee ok", async () => {
  const attendee = await getIndividualAttendeeInfo(4);
  expect(attendee.name).toBe("Foo McBar");
 });