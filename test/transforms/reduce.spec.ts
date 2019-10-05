import { reduce } from "../../src/transforms"
import { persons, Person } from "../data"

describe('reduce', () => {

  it('should work like Array.prototype.reduce', () => {

    const reducer = ((pv: string, cv: Person) => pv + cv.name)
    expect(reduce(persons, reducer, "")).toEqual(persons.reduce((pv, cv) => pv + cv.name, ''))
  })

  it('should throw an Error when not enugh items are present', () => {
    expect(() => reduce([], x => x)).toThrow()
    expect(() => reduce<string>([], x => x, '')).toThrow()
    expect(() => reduce([''], x => x)).toThrow()
    expect(() => reduce([''], x => x)).toThrow()
    expect(reduce([''], x => x, '')).toBe('')
  })
})
