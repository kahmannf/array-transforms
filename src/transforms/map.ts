import { Selector } from "../selector";

export function* map<T, U>(source: Iterable<T>, selector: Selector<T, U>): Iterable<U> {
  for (const x of source) yield selector(x)
}
