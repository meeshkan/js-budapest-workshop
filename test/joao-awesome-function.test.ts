import myFunction from '../src/joao-awesome-function';
import unmock from 'unmock';

unmock
  .nock('https://www.my-api.com/api')
  .get('/attendees/{id}')
  .reply(200, {
    attendees: {
      id: 0,
      name: 'Pedro',
    },
  });

beforeAll(() => unmock.on());
afterAll(() => unmock.off());

test('Unmock saved me', async () => {
  const { name } = await myFunction(0);
  expect(name).toEqual('Pedro');
});
