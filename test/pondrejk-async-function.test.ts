import { fetchInitiatives, fetchIndividualInitiative } from "../src/pondrejk-async-function";
import unmock, {u} from "unmock";

unmock
  .nock("http://its-a-green-world.com")
  .get("/initiatives")
  .reply(200, { initiatives: u.array({id: u.string(), name: u.string()})})
  .get("/initiatives/{id}")
  .reply(200, {
    id: u.string(),
    name: u.string()   
  });

beforeAll(() => unmock.on());
afterAll(() => unmock.off());  

test("testing async function", async () => {
    const initiatives = await fetchInitiatives();
    expect(initiatives instanceof Array).toBe(true);
    const initiative1000 = await fetchIndividualInitiative("1000");
    expect(typeof initiative1000.name).toBe("string");
});
