import fetchAttendees, { getIndividualAttendeeInfo } from "../src/mikes-awesome-function";
import unmock, { u, runner } from "unmock";
import { IService } from "unmock-core/dist/service/interfaces";

unmock
  .nock("https://www.js-budapest.com/api", "budapest")
  .get("/attendees")
  .reply(200, { attendees: u.array({ id: u.integer({ minimum: 1 }), name: u.string() }) })
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

test("mikes awesome function gets the attendees", runner(async () => {
  const attendees = await fetchAttendees();
  expect(attendees.attendees instanceof Array).toBe(true);
  expect(attendees).toMatchObject({
    ...JSON.parse(budapest.spy.getResponseBody()),
    onInternetExplorer: true,
  });
  expect(analytics.spy.postRequestPath()).toBe("/api/")
  if (attendees.attendees.length > 5) {
    expect(typeof attendees.attendees[5].id).toBe("number")
  }
  analytics.spy.resetHistory();
  budapest.spy.resetHistory();
}));

test("gets individual attendee ok", async () => {
  const attendee = await getIndividualAttendeeInfo(4);
  expect(attendee.id).toBeGreaterThan(0);
  expect(typeof attendee.name).toBe("string");
 });