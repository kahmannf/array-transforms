import { map } from "./map";

export function distinct<T>(source: Iterable<T>): Iterable<T>
export function distinct<T, U>(source: Iterable<T>, selector: (item: T) => U): Iterable<U>
export function* distinct<T, U>(source: Iterable<T>, selector?: (item: T) => U): Iterable<T|U> {
  const select = selector ? selector : ((x: T) => x)
  const set = new Set<T|U>()

  for(const item of source) {
    if (set.size < set.add(select(item)).size) {
      yield item
    }
  }
}
