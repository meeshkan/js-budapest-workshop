import fetchattendees from "../src/awesome-function";

test("it should fetch dem attendees", async () => {
    const attendees = await fetchattendees();
    expect(attendees.lenght.toBeGreaterThan(0));
});


