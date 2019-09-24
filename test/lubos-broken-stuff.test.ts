import fetchMoreStuff from "../src/lubos-broken-stuff";

test("this should fetch some stuff", async () => {
  const morestuff = await fetchMoreStuff();
  expect(morestuff.length).toBeGreaterThan(0);
});