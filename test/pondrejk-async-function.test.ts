import { fetchInitiatives, fetchIndividualInitiative } from "../src/pondrejk-async-function";
import unmock, {u} from "unmock";
import { IService } from "unmock-core/dist/service/interfaces";

unmock
  .nock("http://its-a-green-world.com", "greenWorld")
  .get("/initiatives")
  .reply(200, { initiatives: u.array({id: u.string(), name: u.string()})})
  .get("/initiatives/{id}")
  .reply(200, {
    id: u.string(),
    name: u.string()   
  });

unmock
  .nock("http://my-analytics.com/api", "analytics")
  .post("/");

let greenWorld: IService;

beforeAll(
    () => {
        greenWorld = unmock.on().services.greenWorld;
    }
);
afterAll(() => unmock.off());  

afterEach(() => {
    greenWorld.reset();
  }
);

test("testing async function", async () => {
    const initiatives = await fetchInitiatives();
    expect(initiatives.initiatives instanceof Array).toBe(true);
    expect(initiatives).toMatchObject({
        ...JSON.parse(greenWorld.spy.getResponseBody()),
        onInternetExplorer: true
      });
    greenWorld.spy.resetHistory();
    const initiative1000 = await fetchIndividualInitiative("1000");
    expect(typeof initiative1000.name).toBe("string");
    expect(initiative1000).toMatchObject({
        ...JSON.parse(greenWorld.spy.getResponseBody())
    })
});
