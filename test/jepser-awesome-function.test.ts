import unmock, { transform, u } from 'unmock'
import { fetchAttendees, fetchAttendee, API_BASE_URL, API_ATTENDEES_PATH } from '../src/jepser-awesome-function'
import { IService } from 'unmock-core/dist/service/interfaces';

const { responseBody } = transform;

unmock
  .nock(API_BASE_URL, "conference")
  .get(API_ATTENDEES_PATH)
  .reply(200, u.array(
    {
      id: u.integer({ minimum: 0}),
      name: u.string('name.firstName')
    }
  ))
  .get(`${API_ATTENDEES_PATH}/{id}`)
  .reply(200, {
      id: u.integer({ minimum: 0}),
      name: u.string('name.firstName')
    })

let conference: IService;
beforeAll(() => {
  conference = unmock.on().services.conference;
})
afterAll(() => unmock.off())
beforeEach(() => {
  conference.reset();
})

describe('fetchAttendees', () => {
  it('should return the list of attendees', async () => {
    const response = await fetchAttendees()
    expect(response.attendees instanceof Array).toBeTruthy()
    expect(response).toMatchObject({
      attendees: JSON.parse(conference.spy.getResponseBody()),
      timestamp: expect.any(Number)
    })
    expect(response.attendees[0]).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String)
    }))
  })
})

describe('fetchAttendee', () => {
  it('should return the correct attendee for the given id', async () => {

    conference.state((req, o) => responseBody({lens: ["id"]}).const(+req.pathname.split("/").slice(-1)[0])(req, o));
    const response = await fetchAttendee(1)
    expect(response).toEqual(expect.objectContaining({
      id: +conference.spy.getRequestPath().split("/").slice(-1)[0],
      name: expect.any(String)
    }))
  })
})
