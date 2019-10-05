import { last } from "../../src/transforms"

describe('last', () => {
  it('should return the last item of a array', () => {
    expect(last([10,2,3])).toBe(3)
    expect(last(["hello","world"])).toBe("world")
  })

  it('should return undefined on empty iterable', () => {
    expect(last([])).toBeUndefined()
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

    expect(last(arr, x => x.a === 2)).toBe(arr[1])
    expect(last(arr, x => x.a === 4)).toBeUndefined()
  })
})
