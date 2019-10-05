import { flat } from "../../src/transforms"

describe('flat', () => {
  it('should flatten a array of arrays', () => {
    expect([...flat([[1,2,3], [1,2,3]])]).toEqual([1,2,3,1,2,3])
  })
})
