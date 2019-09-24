import axios from "axios";
const divide = (a: number, b: number) => a / b;

const fetchAttendees = async () => {
  const { data } = await axios("https://www.js-budapest.com/api/attendees");
  return data.attendees;
};

export { divide, fetchAttendees };
