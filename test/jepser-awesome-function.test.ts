import fetchAttendees from '../src/jepser-awesome-function'

describe('fetchAttendees', () => {
  it('should return the list of attendees', async () => {
    const response = await fetchAttendees()
    expect(response).toBe([])
  })
})
