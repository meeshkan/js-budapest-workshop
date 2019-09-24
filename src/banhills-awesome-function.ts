import axios from "axios";

export default async () => {
  await axios.post("https://www.analytics.com/api/", {
    message: "Lobotomies to the rescue"
  });

  const { data } = await axios("https://www.js-budapest.com/api/lobotomies");
  return {
    ...data,
    onInternetExplorer: true,
    timestamp: new Date().getTime()
  };
}

export const getIndividualLobotomy = async (id: number) => {
  const { data } = await axios("https://www.js-budapest.com/api/lobotomies/${id}");
  return {
    ...data,
    seenOnClient: false,
    checkedOnClient: false
  };
}
