import unmock, { u, runner } from 'unmock';

import {
    multiply,
    getAllFacts,
    getRandomFact,
    getRandomFactFromTopic
} from '../src/ruifsilva-function';
import { IService } from 'unmock-core/dist/service/interfaces';

test('ruifsilva :: multiply', () => {
    expect(multiply(2, 2)).toEqual(4);
});

describe('ruifsilva :: unmock', () => {
    let analytics: IService;
    let superDuperFacts: IService;
    
    beforeAll(() => {
        unmock
            .nock("https://www.analytics.com/api", "analytics")
            .post("/")
            .reply(200);

        unmock
            .nock('https://super-duper-facts.com/api', 'superDuperFacts')
            .get('/')
            .reply(200, {
                facts: u.array({
                    id: u.integer({ minimum: 0 }),
                    topic: u.string('random.word'),
                    fact: u.string('random.words')
                })
            })
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

        const services = unmock.on().services;
        analytics = services.analytics;
        superDuperFacts = services.superDuperFacts;
    });

    beforeEach(() => {
        analytics.reset();
    });

    afterAll(() => unmock.off());

    describe(':: super-duper-facts', () => {
        beforeEach(() => {
            superDuperFacts.reset();
        });

        test(':: getAllFacts', runner(async () => {
            const randomFacts = await getAllFacts();

            expect(analytics.spy.postRequestBody()).toEqual({
                message: 'SuperDuperFacts API has been called'
            });
            expect(randomFacts).toMatchObject({
                ...JSON.parse(superDuperFacts.spy.getResponseBody()),
                requestTime: expect.any(Date),
                responseTime: expect.any(Date),
            });

            superDuperFacts.spy.resetHistory();
            analytics.spy.resetHistory();
        }));

        test(':: getRandomFact', runner(async () => {
            const randomFact = await getRandomFact();

            expect(analytics.spy.postRequestBody()).toEqual({
                message: 'SuperDuperFacts API has been called'
            });
            expect(randomFact).toMatchObject({
                ...JSON.parse(superDuperFacts.spy.getResponseBody()),
                requestTime: expect.any(Date),
                responseTime: expect.any(Date),
                isRandomTopic: true
            });

            superDuperFacts.spy.resetHistory();
            analytics.spy.resetHistory();
        }));
    
        test(':: getRandomFactFromTopic', runner(async () => {
            const randomFact = await getRandomFactFromTopic('cats');
    
            expect(analytics.spy.postRequestBody()).toEqual({
                message: 'SuperDuperFacts API has been called'
            });
            expect(randomFact).toMatchObject({
                ...JSON.parse(superDuperFacts.spy.getResponseBody()),
                requestTime: expect.any(Date),
                responseTime: expect.any(Date),
                isRandomTopic: false
            });

            superDuperFacts.spy.resetHistory();
            analytics.spy.resetHistory();
        }));
    });
});
