export function reduce<T>(source: Iterable<T>, reducer: (pv: T, cv: T, initialValue?: T) => T): T;
export function reduce<T, U>(source: Iterable<T>, reducer: (pv: U, cv: T) => U, initialValue: U): U
export function reduce<T, U>(source: Iterable<T>, reducer: (pv: T|U, cv: T) => T|U, initialValue?: U): T|U {
  const iterator = source[Symbol.iterator]()

  const first = typeof initialValue !== 'undefined' ? initialValue : getOrThrow(iterator)
  const second = getOrThrow(iterator)
  
  let result = reducer(first, second)

  let remaining: IteratorResult<T>;

  while(!(remaining = iterator.next()).done) {
    result = reducer(result, remaining.value)
  }

  return result
}

function getOrThrow<T>(iterator: Iterator<T>): T {
  const next = iterator.next()
  if(next.done) throw new Error("Iterator did not provide enough items to reduce")
  return next.value
}