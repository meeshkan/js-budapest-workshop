import axios from "axios";

export default async () => {
  try {
    await axios.post("https://www.analytics.com/api/", {
      message: "Lobotomies to the rescue"
    });

    const { data } = await axios("https://www.js-budapest.com/api/lobotomies");
    return {
      ...data,
      onInternetExplorer: true,
      timestamp: new Date().getTime()
    };
  } catch(e) {
    return {
      error: true,
      lobotomies: [],
      onInternetExplorer: true,
      timestamp: new Date().getTime()
    }
  }
}

export const getIndividualLobotomy = async (id: number) => {
  const { data } = await axios("https://www.js-budapest.com/api/lobotomies/${id}");
  return {
    ...data,
    seenOnClient: data.name === "Joe",
    checkedOnClient: false
  };
}
