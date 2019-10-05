import { Predicate } from "../types"

export function* take<T>(source: Iterable<T>, amount: number): Iterable<T> {
  const iterator = source[Symbol.iterator]()
  
  let item: IteratorResult<T>
  let current = 0
  while(!(item = iterator.next()).done && current++ < amount) yield item.value
}

export function* takeWhile<T>(source: Iterable<T>, predicate: Predicate<T>): Iterable<T> {
  const iterator = source[Symbol.iterator]()
  
  let item: IteratorResult<T>
  let current = 0
  while(!(item = iterator.next()).done && predicate(item.value)) yield item.value
}