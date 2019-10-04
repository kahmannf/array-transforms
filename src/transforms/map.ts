
export function* map<T, U>(source: Iterable<T>, selector: (item: T) => U): Iterable<U> {
  for (const x of source) yield selector(x)
}
