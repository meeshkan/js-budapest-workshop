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

describe('fetchAttendees', () => {
  it('should return the list of attendees', async () => {
    const response = await fetchAttendees()
    expect(response instanceof Array).toBeTruthy()
    expect(response[0]).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String)
    }))
  })
})

describe('fetchAttendee', () => {
  it('should return the correct attendee for the given id', async () => {
    conference.state((req, o) => {
      const attendeeId = +req.pathname.split("/").slice(-1)[0]
      return responseBody({ lens: ["id"]}).const(attendeeId)(req, o)
    });
    const ATTENDEE_ID = 42;

    const response = await fetchAttendee(ATTENDEE_ID)
    expect(response).toEqual(expect.objectContaining({
      id: ATTENDEE_ID,
      name: expect.any(String)
    }))
  })
})
