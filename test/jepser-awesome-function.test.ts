import minus from '../src/jepser-awesome-function'

describe('minus', () => {
  it('should substrat the second number to the first', () => {
    expect(minus(3, 1)).toBe(2)
  })
})
