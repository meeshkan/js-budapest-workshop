import axios from "axios";

export default async () => {
  const { data } = await axios("https://www.js-budapest.com/api/somedata");

  await axios.post("https://www.analytics.com/api/test/", {
    message: "It works!"
  });

  return {
    ...data,
    onInternetExplorer: true,
    timestamp: new Date().getTime()
  };
}

export const getPerson = async (id: number) => {
  const { data } = await axios(`https://www.js-budapest.com/api/persons/${id}`);
  
  return {
    ...data,
    seenOnClient: false,
    checkedOnClient: false
  };
}