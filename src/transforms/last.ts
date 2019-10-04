export function last<T>(source: Iterable<T>, predicate?: (item: T) => boolean): T | undefined {
  let last: T | undefined = undefined

  predicate = predicate || (x => true);

  const iterator = source[Symbol.iterator]();

  let element = iterator.next();

  while (!element.done) {
    if (predicate(element.value)) {
      last = element.value;
    }
    element = iterator.next();
  }

  return last
}
