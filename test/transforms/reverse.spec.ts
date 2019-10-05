import { reverse } from "../../src/transforms"

describe('reverse', () => {
  it('should reverse a array', () => {
    expect([...reverse([1,2,3,4,5,6])]).toEqual([6,5,4,3,2,1])
  })

  it('should handle an empty array', () => {
    expect([...reverse([])]).toEqual([])
  })
})
