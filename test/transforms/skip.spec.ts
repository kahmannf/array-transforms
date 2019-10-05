import { skip, skipWhile } from "../../src/transforms/skip"

describe('skip', () => {

  it('should skip amount of items', () => {
    expect([...skip(["a", "b", "c", "d", "e", "f"], 3)]).toEqual(["d", "e", "f"])
  })

  
  it('should skip while predicate', () => {
    expect([...skipWhile([1,2,3,4,3,2,1], x => x < 4)]).toEqual([4,3,2,1])
  })

})
