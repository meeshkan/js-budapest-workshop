import { divide, fetchAttendees } from "../src/fnsp-awesome-function";
import unmock from "unmock";

unmock
  .nock("https://www.js-budapest.com/api")
  .get("/attendees")
  .reply(200, { attendees: [{ id: 0, name: "FNSP" }]});

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test("fnsp awesome function in fact divide two numbers", () => {
  expect(divide(6, 2)).toBe(3);
  expect(divide(6, 0)).toBe(Infinity);
});

test("fnsp get the list of attendees", async () => {
  const attendees = await fetchAttendees();
  
  expect(attendees.length).toBeGreaterThan(0);
});
