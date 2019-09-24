import { fetchInitiatives, fetchIndividualInitiative } from "../src/pondrejk-async-function";
import unmock, {u, runner, transform} from "unmock";
import { IService } from "unmock-core/dist/service/interfaces";
const { withCodes, responseBody } = transform;

unmock
  .nock("http://its-a-green-world.com", "greenWorld")
  .get("/initiatives")
  .reply(200, { initiatives: u.array({id: u.string(), name: u.string()})})
  .reply(401, { message: "Unauthorized" })
  .get("/initiatives/{id}")
  .reply(200, {
    id: u.string(),
    name: u.string()   
  })
  .reply(401, { message: "Unauthorized" });

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

test("testing async function when it works", runner(
    async () => {        
        greenWorld.spy.resetHistory();
        greenWorld.state(withCodes(200));
        const initiatives = await fetchInitiatives();
        //console.log(initiatives);
        expect(initiatives.initiatives instanceof Array).toBe(true);
        expect(initiatives).toMatchObject({
            ...JSON.parse(greenWorld.spy.getResponseBody()),
            onInternetExplorer: true
        });
        console.log(initiatives.initiatives.length);
        if (initiatives.initiatives.length > 5) {
            expect(typeof initiatives.initiatives[3].id).toBe("string");
        }
        expect(initiatives.error).toBe(false);
        greenWorld.spy.resetHistory();
        const initiative1000 = await fetchIndividualInitiative("1000");
        expect(typeof initiative1000.name).toBe("string");
        expect(initiative1000).toMatchObject({
            ...JSON.parse(greenWorld.spy.getResponseBody())
        })
    })
);

test("testing async function it does not work", runner(async () => {
    greenWorld.state(withCodes(401))
    const initiatives = await fetchInitiatives();
    expect(initiatives.initiatives instanceof Array).toBe(true);
    expect(initiatives.initiatives.length).toBe(0);
    expect(initiatives.error).toBe(true);
  }));
