import { first } from "../../src/transforms"

describe('first', () => {
  it('should return the first item of a array', () => {
    expect(first([10,2,3])).toBe(10)
    expect(first(["hello","world"])).toBe("hello")
  })

  it('should return undefined on empty iterable', () => {
    expect(first([])).toBeUndefined()
  })

  it('should return first item that matches predicate', () => {
    const arr = [
      {
        a: 1,
      },
      {
        a: 2
      },
      {
        a: 3
      }
    ]

    expect(first(arr, x => x.a === 2)).toBe(arr[1])
    expect(first(arr, x => x.a === 4)).toBeUndefined()
  })
})
