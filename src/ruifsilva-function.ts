import axios from 'axios';

const API_ENDPOINT = 'https://super-duper-facts.com/api';

const multiply = (a: number, b: number) => a * b;

const getRandomFact = async () => {
    const { data } = await axios(`${API_ENDPOINT}/random`);
    return data.fact;
};

const getRandomFactFromTopic = async (topic: string) => {
    const { data } = await axios(`${API_ENDPOINT}/${topic}/random`);
    return data.fact;
};

export {
    multiply,
    getRandomFact,
    getRandomFactFromTopic
};