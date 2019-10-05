import { groupBy } from "../../src/transforms"
import { persons } from "../data"

describe('groupBy', () => {
  it('should group objects by various keys (1)', () => {
    const cityGroup = groupBy(persons, x => x.city)

    expect(cityGroup.length).toBe(3)

    const cities = cityGroup.map(x => x.key)
    expect(cities).toEqual(["Berlin", "Dortmund", "Bielefeld"])

    expect(cityGroup[0].values).toEqual([
      persons[0],
      persons[1],
      persons[2]
    ])
    
    expect(cityGroup[1].values).toEqual([
      persons[3],
      persons[4]
    ])
    
    expect(cityGroup[2].values).toEqual([
      persons[5]
    ])

  })
  
  it('should group objects by various keys (2)', () => {
    const streetGroup = groupBy(persons, x => x.street)

    expect(streetGroup.length).toBe(5)

    const streets = streetGroup.map(x => x.key)
    expect(streets).toEqual([
      "Berliner Strasse",
      "Georgenstrasse",
      "Reinoldistasse",
      "Ludwigstrasse",
      "Detmolder Strasse"
    ])
  })

  it('should group objects by various keys (3)', () => {
    const nameGroup = groupBy(persons, x => x.name)
  
    expect(nameGroup.length).toBe(6)

    const names = nameGroup.map(x => x.key)
    expect(names).toEqual([
      "Johannes",
      "Andreas",
      "Julian",
      "Alexander",
      "Anna",
      "Sarah"
    ])
  })

  it('should group with a EqualityFn', () => {
    const extendPersons = persons.map(x => ({
      ...x,
      city: {
        name: x.city
      }
    }))

    expect([...groupBy(extendPersons, x => x.city)].length).toBe(6)
    expect([...groupBy(extendPersons, x => x.city, (a,b) => a.name === b.name)].length).toBe(3)
  })

  it('should group with a value selector', () => {
    const extendPersons = persons.map(x => ({
      ...x,
      city: {
        name: x.city
      }
    }))

    const groups = [...groupBy(extendPersons, x => x.city, (a,b) => a.name === b.name, x => x.name)]

    expect(groups[0].values).toEqual([ "Johannes", "Andreas", "Julian" ])
  })
})
