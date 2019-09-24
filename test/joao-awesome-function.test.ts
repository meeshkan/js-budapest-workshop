import myFunction from '../src/joao-awesome-function';

test('wow it adds three numbers', () => {
  expect(myFunction(2, 5, 4)).toBe(7);
});
