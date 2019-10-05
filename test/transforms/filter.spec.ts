import { filter } from "../../src/transforms"
import { Person } from "../data";

describe('filter', () => {
  it('should work like Array.prototype.filter', () => {
    const arr: number[] =  []

    const predicate = (x: number) => x % 2 === 0;

    for(let i = 0; i < 100; i++) arr.push(i)
    expect([...filter(arr, predicate)]).toEqual(arr.filter(predicate))
  })

  it('should work on empty array', () => {
    expect([...filter<Person>([], x => x.name.length === 3)]).toEqual([])
  })
})
