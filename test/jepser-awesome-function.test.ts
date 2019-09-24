import unmock, { transform } from 'unmock'
import { fetchAttendees, fetchAttendee, API_BASE_URL, API_ATTENDEES_PATH } from '../src/jepser-awesome-function'
import { IService } from 'unmock-core/dist/service/interfaces';

const { responseBody } = transform;

unmock
  .nock(API_BASE_URL, "conference")
  .get(API_ATTENDEES_PATH)
  .reply(200, [
    {
      id: 1,
      name: 'batman'
    }
  ])
  .get(`${API_ATTENDEES_PATH}/{id}`)
  .reply(200, {
      id: 1,
      name: 'batman'
    })

let conference: IService;
beforeAll(() => {
  conference = unmock.on().services.conference;
})
afterAll(() => unmock.off())

describe('fetchAttendees', () => {
  it('should return the list of attendees', async () => {
    const response = await fetchAttendees()
    expect(response).toHaveLength(1)
    expect(response[0]).toEqual(expect.objectContaining({
      id: 1,
      name: 'batman'
    }))
  })
})

describe('fetchAttendee', () => {
  it('should return the correct attendee for the given id', async () => {
    conference.state((req, o) => responseBody({path: "/attendees/{id}", lens: ["id"]}).const(+req.pathname.split("/").slice(-1))(req, o));
    const myNum = 42;
    const response = await fetchAttendee(myNum)
    expect(response).toEqual(expect.objectContaining({
      id: 1,
      name: 'batman'
    }))
  })
})
