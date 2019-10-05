import { sort, thenSort } from "../../src/transforms"
import { persons, Person } from "../data"

describe('sorting', () => {

  it('should sort ascending and descending', () => {
    expect([...sort(persons, x => x.name)]).toEqual([
      persons[3],
      persons[1],
      persons[4],
      persons[0],
      persons[2],
      persons[5]
    ])

    expect([...sort(persons, x => x.name, 'desc')]).toEqual([
      persons[5],
      persons[2],
      persons[0],
      persons[4],
      persons[1],
      persons[3]
    ])
  })

  it('should be a stable sort', () => {
    expect([...sort(persons, x => x.city)]).toEqual([
      persons[0],
      persons[1],
      persons[2],
      persons[5],
      persons[3],
      persons[4]
    ])

    expect([...sort(persons, x => x.street)]).toEqual([
      persons[0],
      persons[1],
      persons[5],
      persons[2],
      persons[4],
      persons[3]
    ])
  })

  it('should sort by further properties', () => {
    const byCityAndStreet = thenSort(sort(persons, x => x.city), x => x.street)
    
    expect([...byCityAndStreet]).toEqual([
      persons[0],
      persons[1],
      persons[2],
      persons[5],
      persons[4],
      persons[3]
    ])

    expect([...thenSort(byCityAndStreet, x => x.name)]).toEqual([
      persons[1],
      persons[0],
      persons[2],
      persons[5],
      persons[4],
      persons[3]
    ])
  })

  it('should sort with custom comparer', () => {

    const nameLengthComparer = (a: string, b: string) => {
      return a.length - b.length 
    }
    expect([...sort(persons, x => x.name, 'asc', nameLengthComparer)]).toEqual([
      persons[4],
      persons[5],
      persons[2],
      persons[1],
      persons[0],
      persons[3]
    ])
  })
})
