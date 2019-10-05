import { map } from "../../src/transforms"
import { persons, Person } from "../data"

describe('map', () => {

  it('should work like Array.prototype.map', () => {
    expect([...map(persons, x => x.name)]).toEqual(persons.map(x => x.name))
    expect([...map(persons, x => x.city)]).toEqual(persons.map(x => x.city))
  })

  it('should work on empty arrays without throwing errors', () => {
    const empty: Person[] = []
    expect([...map(empty, x => x.name.length)]).toEqual([])
  })
})
