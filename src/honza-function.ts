import axios from "axios";


export const fetchCoffees =  async () => {
  const { data } = await axios("https://www.js-budapest.com/api/coffees");
  return data.coffees;
}

export const getCoffeeType = async (type: string) => {
  const { data } = await axios(`https://www.js-budapest.com/api/coffees/${type}`);
  return data;
}