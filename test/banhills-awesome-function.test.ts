import fetchAttendees from "../src/banhills-awesome-function";

test("banhills awesome function pulls something from an api", async () => {
  const attendees = await fetchAttendees();
  expect(attendees.length).toBeGreaterThan(0);
});
