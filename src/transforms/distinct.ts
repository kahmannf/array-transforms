import { Selector } from "../types";

export function* distinct<T>(source: Iterable<T>, selector?: Selector<T, any>): Iterable<T> {
  const select = selector ? selector : ((x: T) => x)
  const set = new Set<T>()

  for(const item of source) {
    if (set.size < set.add(select(item)).size) {
      yield item
    }
  }
}
