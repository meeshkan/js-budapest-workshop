import fetchAttendees, { getAttendeeByID } from "../src/beawesome-function";
import unmock, { u } from "unmock";
import { array } from "json-schema-poet";
import { string } from "io-ts";

unmock
    .nock("https://www.js-budapest.com/api")
    .get("/attendees")
    .reply(200, { attendees: u.array({ id: u.integer({ minimum: 1 }), name: u.string() }) })
    .get("/attendees/{id}")
    .reply(200, { id: u.integer(), name: u.string() });

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test("it should fetch dem attendees", async () => {
    const attendees = await fetchAttendees();
    expect(attendees instanceof Array).toBe(true);
});

test("get attendee by id", async () => {
    const attendee = await getAttendeeByID(4);
    expect(attendee.id).toBeGreaterThan(0);
    expect(typeof attendee.name).toBe("string");
});


