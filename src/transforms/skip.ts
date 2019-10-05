import { Predicate } from "../types";

export function* skip<T>(source: Iterable<T>, amount: number): Iterable<T> {
  const iterator = source[Symbol.iterator]()

  for(let i = 0; i < amount; i++) {
    if(iterator.next().done) return
  }

  let remaining: IteratorResult<T>;
  while(!(remaining = iterator.next()).done) yield remaining.value
}

export function* skipWhile<T>(source: Iterable<T>, predicate: Predicate<T>) {
  const iterator = source[Symbol.iterator]()
  
  let item: IteratorResult<T>
  while(!(item = iterator.next()).done && predicate(item.value))

  if(item.done) return
  yield item.value

  while(!(item = iterator.next()).done) yield item.value
}
