import axios from "axios";

export async function fetchInitiatives() {
    //const response: any [] = await axios.get("http://its-a-green-world.com/initiatives");
    const { data } = await axios.get("http://its-a-green-world.com/initiatives");
    return {
        ...data,
        onInternetExplorer: true,
        timestamp: new Date().getTime()
    };
}

export async function fetchIndividualInitiative(id: string) {
    const { data } = await axios.get("http://its-a-green-world.com/initiatives/" + id);
    return data;
}