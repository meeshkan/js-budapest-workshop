import fetchAttendees from "../src/mikes-awesome-function";

test("mikes awesome function in fact adds two numbers", async () => {
  const attendees = await fetchAttendees();
  expect(attendees.length).toBeGreaterThan(0);
});