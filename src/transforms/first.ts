export function first<T>(source: Iterable<T>, predicate?: (item: T) => boolean): T | undefined {
  predicate = predicate || (x => true);

  const iterator = source[Symbol.iterator]();

  let element = iterator.next();

  while (!element.done) {
    if (predicate(element.value)) {
      return element.value;
    }
    element = iterator.next();
  }

  return undefined
}