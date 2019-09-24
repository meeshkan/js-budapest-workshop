import axios from "axios";


export default async () => {
  try {
    const { data } = await axios("https://www.js-budapest.com/api/attendees");
    await axios.post("https://www.analytics.com/api/", {
      message: "Attendees came to event"
    });
    return {
      ...data,
      error: false,
      onInternetExplorer: true,
      timestamp: new Date().getTime()
    };
  } catch (e) {
    return {
      error: true,
      attendees: [],
      onInternetExplorer: true,
      timestamp: new Date().getTime()
    }
  }
}

export const getIndividualAttendeeInfo = async (id: number) => {
  const { data } = await axios(`https://www.js-budapest.com/api/attendees/${id}`);
  return {
    ...data,
    seenOnClient: data.name === "Joe" ? true : false,
    checkedOnClient: false
  };
}