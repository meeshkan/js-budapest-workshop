import axios from "axios";

export default async () => {
  const { data } = await axios("https://www.js-budapest.com/api/lobotomies");
  return data.lobotomies;
}

export const getIndividualLobotomy = async (id: number) => {
  const { data } = await axios("https://www.js-budapest.com/api/lobotomies/${id}");
  return data.lobotomies;
}
