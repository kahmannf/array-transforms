import { count } from "../../src/transforms"

describe('count', () => {
  it('should count elements in iterable', () => {
    expect(count([1,2,3,4])).toBe(4)
  })

  it('should count elements based on predicate', () => {
    expect(count([1,2,3,4], x => x > 2)).toBe(2)
  })
})
