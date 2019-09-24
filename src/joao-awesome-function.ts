import axios from 'axios';

export default async (id: number) => {
  let { data } = await axios(`https://www.my-api.com/api/attendees/${id}`);
  return data.attendees;
};
