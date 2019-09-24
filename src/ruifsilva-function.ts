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

    try {
        const { data } = await axios(`${SDF_API_ENDPOINT}/`);
    
        await postCallToAPI('SuperDuperFacts');

        return {
            ...data,
            requestTime,
            responseTime: new Date()
        };
    } catch (err) {
        const message = 'Unauthorized access';
        return { message, requestTime };
    }
};

const getRandomFact = async () => {
    const requestTime = new Date();

    try {
        const { data } = await axios(`${SDF_API_ENDPOINT}/random`);

        await postCallToAPI('SuperDuperFacts');
    
        return {
            ...data,
            requestTime,
            responseTime: new Date(),
            isRandomTopic: true
        };
    } catch (err) {
        const message = 'Unauthorized access';
        return { message, requestTime };
    }
    
};

const getRandomFactFromTopic = async (topic: string) => {
    const requestTime = new Date();

    try {
        const { data } = await axios(`${SDF_API_ENDPOINT}/${topic}/random`);
    
        await postCallToAPI('SuperDuperFacts');
    
        return {
            ...data,
            requestTime,
            responseTime: new Date(),
            isRandomTopic: false
        };
    }  catch (err) {
        const message = 'Unauthorized access';
        return { message, requestTime, topic };
    }
};

export {
    multiply,
    getAllFacts,
    getRandomFact,
    getRandomFactFromTopic
};