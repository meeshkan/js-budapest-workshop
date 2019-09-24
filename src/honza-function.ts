import axios from "axios";


export default async () => {
  const { data } = await axios("https://www.js-budapest.com/api/coffees");
  return data.coffees;
}

export getCoffeeType = async (type: string) => {
  const { data } = await axios("https://www.js-budapest.com/api/coffees/${type}");
  return data;
}