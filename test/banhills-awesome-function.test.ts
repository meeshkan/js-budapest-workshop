import fetchLobotomies from "../src/banhills-awesome-function";

test("banhills awesome function pulls something from an api", async () => {
  const lobotomies = await fetchLobotomies();
  expect(lobotomies.length).toBeGreaterThan(0);
});
