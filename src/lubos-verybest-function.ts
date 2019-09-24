import axios from "axios";

export default async () => {
  const { data } = await axios("https://www.js-budapest.com/api/somedata");
  return data.somedata;
}

export const getPerson = async (id: number) => {
  const { data } = await axios(`https://www.js-budapest.com/api/persons/${id}`);
  return data;
}