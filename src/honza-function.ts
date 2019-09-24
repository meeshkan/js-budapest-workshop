import axios from "axios";


export default async () => {
await axios.post("https://www.analytics.com/api", {
  message: "Coffee has arrived"
});

  const { data } = await axios("https://www.js-budapest.com/api/coffees");
  return {
    ...data,
    onInternetExplorer: true,
    timestamp: new Date().getTime()
  };
}

export const getCoffeeType = async (type: string) => {
  const { data } = await axios(`https://www.js-budapest.com/api/coffees/${type}`);
  return {
    ...data,
    seenOnClient: false,
    checkedOnClicent: false
  };
}