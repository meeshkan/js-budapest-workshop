import axios from "axios";

export default async () => {
    await axios.post("https://www.analytics.com/api/", {
        message: "Attendees came to event"
    });
    const { data } = await axios("https://www.js-budapest.com/api/attendees");
    return {
        ...data,
        onInternetExplorer: true,
        timestamp: new Date().getTime()
    };
}

export const getAttendeeByID = async (id: number) => {
    const { data } = await axios(`https://www.js-budapest.com/api/attendees/${id}`);
    return {
        ...data,
        seenOnClient: false,
        checkedOnClient: false
    };
};