import axios from 'axios'

const fetchAttendees = async () => {
  const { data } = await axios.get('https://superapi.com/attendees')

  return data
}

export default fetchAttendees
