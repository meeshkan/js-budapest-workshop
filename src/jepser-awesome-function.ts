import axios from 'axios'

export const API_BASE_URL = `https://superapi.com`
export const API_ATTENDEES_PATH = `/attendees`

const API_ATTENDEES_ENDPOINT = `${API_BASE_URL}${API_ATTENDEES_PATH}`

export const fetchAttendees = async () => {
  const { data } = await axios.get(API_ATTENDEES_ENDPOINT)

  return data
}

export const fetchAttendee = async (id: number) => {
  const { data } = await axios.get(`${API_ATTENDEES_ENDPOINT}/${id}`)
  
  return data
}
