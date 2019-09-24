import unmock from 'unmock'
import fetchAttendees, { API_BASE_URL, API_ATTENDEES_PATH } from '../src/jepser-awesome-function'

unmock
  .nock(API_BASE_URL)
  .get(API_ATTENDEES_PATH)
  .reply(200, [
    {
      id: 1,
      name: 'batman'
    }
  ])

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
