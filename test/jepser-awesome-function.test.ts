import unmock from 'unmock'
import { fetchAttendees, fetchAttendee, API_BASE_URL, API_ATTENDEES_PATH } from '../src/jepser-awesome-function'

unmock
  .nock(API_BASE_URL)
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

beforeAll(() => unmock.on())
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
    const response = await fetchAttendee(1)
    expect(response).toEqual(expect.objectContaining({
      id: 1,
      name: 'batman'
    }))
  })
})
