import axios from 'axios'

export const API_BASE_URL = `https://superapi.com`
export const API_ATTENDEES_PATH = `/attendees`

const API_ATTENDEES_ENDPOINT = `${API_BASE_URL}${API_ATTENDEES_PATH}`

export const fetchAttendees = async () => {

  await axios.post('https://analytics.com/events', {
    message: 'hola'
  })

  const { data } = await axios.get(API_ATTENDEES_ENDPOINT)

  return {
    attendees: data,
    timestamp: new Date().getDate()
  }
}

export const fetchAttendee = async (id: number) => {
  const { data } = await axios.get(`${API_ATTENDEES_ENDPOINT}/${id}`)
  
  return data
}
