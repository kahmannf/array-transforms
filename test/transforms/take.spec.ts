import { take, takeWhile } from "../../src/transforms"

describe('take', () => {
  it('should take amount of items', () => {
    expect([...take(["a", "b", "c", "d", "e", "f"], 3)]).toEqual(["a", "b", "c"])
  })

  
  it('should take while predicate', () => {
    expect([...takeWhile([1,2,3,4,3,2,1], x => x < 4)]).toEqual([1,2,3])
  })
})
