import { divide, fetchAttendees, getIndividualAttendee } from '../src/fnsp-awesome-function';
import unmock, { u, runner } from 'unmock';
import { IService } from 'unmock-core/dist/service/interfaces';

unmock
  .nock('https://www.js-budapest.com/api', 'budapest')
  .get('/attendees')
  .reply(200, { attendees: u.array({ id: u.integer(), name: u.string('name.firstName') }) })
  .get('/attendee/{id}')
  .reply(200, { id: u.integer(), name: u.string('name.firstName') });

let budapest: IService;

beforeAll(() => {
  const services = unmock.on().services;
  budapest = services.budapest;
});
beforeEach(() => {
  budapest.reset();
});
afterAll(() => unmock.off());

test('fnsp awesome function in fact divide two numbers', () => {
  expect(divide(6, 2)).toBe(3);
  expect(divide(6, 0)).toBe(Infinity);
});

test(
  'fnsp get the list of attendees',
  runner(async () => {
    const { attendees } = await fetchAttendees();

    expect(attendees instanceof Array).toBe(true);

    if (attendees.length > 5) expect(typeof attendees[5].name).toBe('string');

    expect(attendees).toMatchObject({
      ...JSON.parse(budapest.spy.getResponseBody()).attendees,
    });

    budapest.spy.resetHistory();
  })
);

test('fnsp get attendee information', async () => {
  const attendee = await getIndividualAttendee(4);

  expect(typeof attendee.name).toBe('string');
  expect(typeof attendee.id).toBe('number');
});
