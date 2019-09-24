import fetchAttendees, { getIndividualAttendeeInfo } from "../src/mikes-awesome-function";
import unmock, { u, runner, transform } from "unmock";
import { IService } from "unmock-core/dist/service/interfaces";

const { withCodes, responseBody } = transform;

unmock
  .nock("https://www.js-budapest.com/api", "budapest")
  .get("/attendees")
  .reply(200, { attendees: u.array({ id: u.integer({ minimum: 1 }), name: u.string() }) })
  .reply(401, { message: "Unauthorized" })
  .get("/attendees/{id}")
  .reply(200, { id: u.integer(), name: u.string() });
  unmock
  .nock("https://www.analytics.com/api", "analytics")
  .post("/")
  .reply(200);

let analytics: IService;
let budapest: IService;
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

test("mikes awesome function gets the attendees when it works", async () => {
  budapest.state(withCodes(200))
  const attendees = await fetchAttendees();
  expect(attendees.attendees instanceof Array).toBe(true);
  expect(attendees.error).toBe(false);
  expect(attendees).toMatchObject({
    ...JSON.parse(budapest.spy.getResponseBody()),
    onInternetExplorer: true,
  });
  expect(analytics.spy.postRequestPath()).toBe("/api/")
});

test("mikes awesome function gets the attendees when it does not work", async () => {
  budapest.state(withCodes(401))
  const attendees = await fetchAttendees();
  expect(attendees.attendees instanceof Array).toBe(true);
  expect(attendees.attendees.length).toBe(0);
  expect(attendees.error).toBe(true);
});

test("gets individual attendee ok when name is Joe", async () => {
  budapest.state(responseBody({ lens: ["name"]}).const("Joe"));
  const attendee = await getIndividualAttendeeInfo(4);
  expect(attendee.id).toBeGreaterThan(0);
  expect(typeof attendee.name).toBe("string");
  expect(attendee.name).toBe("Joe");
  expect(attendee.seenOnClient).toBe(true);
 });

 test("gets individual attendee ok when name is not Joe", async () => {
  const attendee = await getIndividualAttendeeInfo(4);
  expect(attendee.id).toBeGreaterThan(0);
  expect(typeof attendee.name).toBe("string");
  expect(attendee.seenOnClient).toBe(false);
 });