import { fetchInitiatives } from "../src/pondrejk-async-function";
import unmock from "unmock";

unmock
  .nock("http://its-a-green-world.com")
  .get("/initiatives")
  .reply(200, { initiatives: [{
    id: "1000",
    name: "Plant Trees"    
  }]})

beforeAll(() => unmock.on());
afterAll(() => unmock.off());  

test("testing async function", async () => {
    const initiatives = await fetchInitiatives();
    expect(initiatives.length).toBeGreaterThan(0);
});
