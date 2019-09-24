import fetchAttendees, { getAttendeeByID } from "../src/beawesome-function";
import unmock, { u } from "unmock";
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
    analytics = services.analytics
});

beforeEach(() => {
    budapest.reset();
    analytics.reset();
});

afterAll(() => unmock.off());

test("it should fetch dem attendees", async () => {
    const attendees = await fetchAttendees();
    expect(attendees.attendees instanceof Array).toBe(true);
    expect(attendees).toMatchObject({
        ...JSON.parse(budapest.spy.getResponseBody()),
        onInternetExplorer: true,
    });
    expect(analytics.spy.postRequestPath()).toBe("/api/");
    expect(analytics.spy.postRequestBody().message).toEqual("Attendees came to event");
    expect(Object.keys(analytics.spy.postRequestBody())).toEqual(["message"]);
});

test("get attendee by id", async () => {
    const attendee = await getAttendeeByID(4);
    expect(attendee.id).toBeGreaterThan(0);
    expect(typeof attendee.name).toBe("string");
});


