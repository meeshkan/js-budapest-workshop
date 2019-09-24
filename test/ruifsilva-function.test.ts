import unmock from 'unmock';

import {
    multiply,
    getRandomFact,
    getRandomFactFromTopic
} from '../src/ruifsilva-function';

test('ruifsilva :: multiply', () => {
    expect(multiply(2, 2)).toEqual(4);
});

describe('ruifsilva :: unmock', () => {
    const topic = 'cats';

    beforeAll(() => unmock.on());
    afterAll(() => unmock.off());

    unmock
        .nock('https://super-duper-facts.com/api')
        .get('/random')
        .reply(200, {
            fact: 'JavaScript and Java are, in fact, two different languages.'
        })
        .get(`/${topic}/random`)
        .reply(200, {
            fact: 'Cats are not animals, they are small devils masked as pure cuteness.'
        });

    test(':: getRandomFact', async () => {
        const randomFact = await getRandomFact();
    
        expect(randomFact.length).toBeGreaterThan(0);
    });

    test(':: getRandomFactFromTopic', async () => {
        const randomFact = await getRandomFactFromTopic(topic);

        expect(randomFact.length).toBeGreaterThan(0);
    });
});
