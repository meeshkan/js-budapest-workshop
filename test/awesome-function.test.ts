import fetchAttendees from "../src/awesome-function";
import unmock from "unmock";

unmock
    .nock("https://www.js-budapest.com/api")
    .get("/attendees")
    .reply(200, { attendees: [{ id: 0, name: "yay" }] });

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test("it should fetch dem attendees", async () => {
    const attendees = await fetchAttendees();
    expect(attendees.length).toBeGreaterThan(0);
});


