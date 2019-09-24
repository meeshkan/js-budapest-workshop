import axios from "axios";

export default async () => {
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
