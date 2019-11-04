import { Selector } from "../types";

export function distinct<T>(source: Iterable<T>): Iterable<T>
export function distinct<T, U>(source: Iterable<T>, selector: Selector<T, U>): Iterable<T>
export function* distinct<T, U>(source: Iterable<T>, selector?: Selector<T, U>): Iterable<T> {
  const select = selector ? selector : ((x: T) => x)
  const set = new Set<T|U>()

  for(const item of source) {
    if (set.size < set.add(select(item)).size) {
      yield item
    }
  }
}
