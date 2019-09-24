import unmock, { u } from 'unmock';

import {
    multiply,
    getRandomFact,
    getRandomFactFromTopic
} from '../src/ruifsilva-function';

test('ruifsilva :: multiply', () => {
    expect(multiply(2, 2)).toEqual(4);
});

describe('ruifsilva :: unmock', () => {
    beforeAll(() => unmock.on());
    afterAll(() => unmock.off());

    unmock
        .nock('https://super-duper-facts.com/api')
        .get('/random')
        .reply(200, {
            id: u.integer({ minimum: 0 }),
            topic: u.string('random.word'),
            fact: u.string('random.words')
        })
        .get('/{topic}/random')
        .reply(200, {
            id: u.integer({ minimum: 0 }),
            topic: u.string('random.word'),
            fact: u.string('random.words')
        });

    test(':: getRandomFact', async () => {
        const { id, topic, fact } = await getRandomFact();
    
        expect(id).toBeGreaterThanOrEqual(0);
        expect(typeof id).toEqual('number');

        expect(typeof topic).toEqual('string');
        expect(typeof fact).toEqual('string');
    });

    test(':: getRandomFactFromTopic', async () => {
        const { id, topic, fact } = await getRandomFactFromTopic('cats');

        expect(id).toBeGreaterThanOrEqual(0);
        expect(typeof id).toEqual('number');

        expect(typeof topic).toEqual('string');
        expect(typeof fact).toEqual('string');
    });
});
