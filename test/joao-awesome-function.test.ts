import myFunction from '../src/joao-awesome-function';
import unmock, { u } from 'unmock';

unmock
  .nock('https://www.my-api.com/api')
  .get('/attendees/{id}')
  .reply(200, {
    attendees: {
      id: u.integer(),
      name: u.string('name.firstName'),
    },
  });

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test('Unmock saved me', async () => {
  const { name } = await myFunction(0);
  expect(typeof name).toBe('string');
});
