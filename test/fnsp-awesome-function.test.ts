import { divide, fetchAttendees, getIndividualAttendee } from '../src/fnsp-awesome-function';
import unmock, { u } from 'unmock';
import { number } from 'json-schema-poet';
import { Integer } from 'io-ts';

unmock
  .nock('https://www.js-budapest.com/api')
  .get('/attendees')
  .reply(200, { attendees: u.array({ id: u.integer(), name: u.string('name.firstName') }) })
  .get('/attendee/{id}')
  .reply(200, { id: u.integer(), name: u.string('name.firstName') });

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test('fnsp awesome function in fact divide two numbers', () => {
  expect(divide(6, 2)).toBe(3);
  expect(divide(6, 0)).toBe(Infinity);
});

test('fnsp get the list of attendees', async () => {
  const attendees = await fetchAttendees();

  expect(attendees instanceof Array).toBe(true);
});

test('fnsp get attendee information', async () => {
  const attendee = await getIndividualAttendee(4);

  expect(typeof attendee.name).toBe('string');
  expect(typeof attendee.id).toBe('number');
});
