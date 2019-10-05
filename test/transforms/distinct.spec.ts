import { distinct } from "../../src/transforms"

describe('distinct', () => {

  let objectList: {
    a: number,
    b: number,
    c: number
  }[] = []

  beforeAll(() => {
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        objectList.push({
          a: i,
          b: j,
          c: i * 10 + j
        })
      }
    }
  })

  it('should return distinct numbers and keep the order', () => {
    const arr = [1,2,3,3,2,3,1,4,5,2,6,7,6,6,6,6,0]
    expect([...distinct(arr)]).toEqual([1,2,3,4,5,6,7,0])
  })

  it('should work on object-references', () => {
    const arr = [...objectList, ...objectList]

    expect([...distinct(arr)]).toEqual(objectList)
    expect([...distinct(objectList)]).toEqual(objectList)
  })

  it('should work with property-selector', () => {
    expect([...distinct(objectList, x => x.b)].length).toBe(10)
    expect([...distinct(objectList, x => x.a)].length).toBe(10)
    expect([...distinct(objectList, x => x.c)]).toEqual(objectList)
  })
})
