import unmock, { u, runner } from 'unmock';
import myFunction from '../src/joao-awesome-function';
import { IService } from 'unmock-core/dist/service/interfaces';

unmock
  .nock('https://www.my-api.com/api', 'attendees')
  .get('/attendees/{id}')
  .reply(200, {
    attendees: [
      {
        id: u.integer(),
        name: u.string('name.firstName'),
      },
    ],
  });

let attendees: IService;

beforeAll(() => {
  const services = unmock.on().services;
  attendees = services.attendees;
});

beforeEach(() => {
  attendees.reset();
});

afterAll(() => unmock.off());

test(
  'Unmock saved me',
  runner(async () => {
    const apiAttendees = await myFunction(0);

    expect(apiAttendees).toMatchObject({
      ...JSON.parse(attendees.spy.getResponseBody()),
    });
    attendees.spy.resetHistory();
  }),
);
