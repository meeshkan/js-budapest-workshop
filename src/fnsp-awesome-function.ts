import axios from "axios";
const divide = (a: number, b: number) => a / b;

const fetchAttendees = async () => {
  const { data } = await axios("https://www.js-budapest.com/api/attendees");
  return data.attendees;
};

const getIndividualAttendee = async (id: number) => {
  const { data } = await axios(
    `https://www.js-budapest.com/api/attendee/${id}`
  );
  return data;
};

export { divide, fetchAttendees, getIndividualAttendee };
