import unmock, { u, runner, transform } from 'unmock';

import {
    multiply,
    getAllFacts,
    getRandomFact,
    getRandomFactFromTopic
} from '../src/ruifsilva-function';
import { IService } from 'unmock-core/dist/service/interfaces';

const { withCodes, responseBody } = transform;

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
            // getAllFacts
            .get('/')
            .reply(200, {
                facts: u.array({
                    id: u.integer({ minimum: 0 }),
                    topic: u.string('random.word'),
                    fact: u.string('random.words')
                })
            })
            .reply(401, {
                message: 'Unauthorized access'
            })
            // getRandomFact
            .get('/random')
            .reply(200, {
                id: u.integer({ minimum: 0 }),
                topic: u.string('random.word'),
                fact: u.string('random.words')
            })
            .reply(401, {
                message: 'Unauthorized access'
            })
            // getRandomFactFromTopic
            .get('/{topic}/random')
            .reply(200, {
                id: u.integer({ minimum: 0 }),
                topic: u.string('random.word'),
                fact: u.string('random.words')
            })
            .reply(401, {
                message: 'Unauthorized access'
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

        describe(':: getAllFacts', () => {
            test(':: it should return all facts when it works', async () => {
                superDuperFacts.state(withCodes(200));
    
                const randomFacts = await getAllFacts();
    
                expect(analytics.spy.postRequestBody()).toEqual({
                    message: 'SuperDuperFacts API has been called'
                });
                expect(randomFacts).toMatchObject({
                    ...JSON.parse(superDuperFacts.spy.getResponseBody()),
                    requestTime: expect.any(Date),
                    responseTime: expect.any(Date),
                });
            });

            test(':: it should return error when it doesn\'t work', async () => {
                superDuperFacts.state(withCodes(401));
    
                const randomFacts = await getAllFacts();
    
                expect(randomFacts).toMatchObject({
                    message: 'Unauthorized access',
                    requestTime: expect.any(Date)
                });
            });
        });

        describe(':: getRandomFact', () => {
            test(':: it should return a random fact when it works', async () => {
                superDuperFacts.state(withCodes(200));

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
            });

            test(':: it should return error when it doesn\'t work', async () => {
                superDuperFacts.state(withCodes(401));
    
                const randomFact = await getRandomFact();
    
                expect(randomFact).toMatchObject({
                    message: 'Unauthorized access',
                    requestTime: expect.any(Date)
                });
            });
        });

        describe(':: getRandomFactFromTopic', () => {
            test(':: it should return a random fact when it works', async () => {
                superDuperFacts.state(withCodes(200));

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
            });

            test(':: it should return error when it doesn\'t work', async () => {
                superDuperFacts.state(withCodes(401));
    
                const randomFact = await getRandomFactFromTopic('cats');
    
                expect(randomFact).toMatchObject({
                    message: 'Unauthorized access',
                    requestTime: expect.any(Date),
                    topic: 'cats'
                });
            });
        });
    });
});
