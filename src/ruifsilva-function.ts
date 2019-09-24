import axios from 'axios';

const ANALYTICS_API_ENDPOINT = 'https://www.analytics.com/api/';
const SDF_API_ENDPOINT = 'https://super-duper-facts.com/api';

const multiply = (a: number, b: number) => a * b;

// Analytics
const postCallToAPI = async (api: string) => {
    const message = `${api} API has been called`;
    await axios.post(ANALYTICS_API_ENDPOINT, { message });
};

// Super Duper Facts
const getAllFacts = async () => {
    const requestTime = new Date();
    const { data } = await axios(`${SDF_API_ENDPOINT}/`);

    await postCallToAPI('SuperDuperFacts');

    return {
        ...data,
        requestTime,
        responseTime: new Date()
    };
};

const getRandomFact = async () => {
    const requestTime = new Date();
    const { data } = await axios(`${SDF_API_ENDPOINT}/random`);

    await postCallToAPI('SuperDuperFacts');

    return {
        ...data,
        requestTime,
        responseTime: new Date(),
        isRandomTopic: true
    };
};

const getRandomFactFromTopic = async (topic: string) => {
    const requestTime = new Date();
    const { data } = await axios(`${SDF_API_ENDPOINT}/${topic}/random`);

    await postCallToAPI('SuperDuperFacts');

    return {
        ...data,
        requestTime,
        responseTime: new Date(),
        isRandomTopic: false
    };
};

export {
    multiply,
    getAllFacts,
    getRandomFact,
    getRandomFactFromTopic
};