import { concat } from "../../src/transforms"

describe('concat', () => {
  it('should return all items in correct order', () => {
    const arr1 = [1,2,3]
    const arr2 = [4,5,6]
    
    const result = [...concat(arr1, arr2)]
    expect(result).toEqual([1,2,3,4,5,6])
  })

  it('should work with empty arrays', () => {
    expect([...concat([1,2,3], [])]).toEqual([1,2,3])
    expect([...concat([], [4,5,6])]).toEqual([4,5,6])
    expect([...concat([], [])]).toEqual([])
  })
})
