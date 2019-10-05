import { Predicate } from "../types";

export function* filter<T>(source: Iterable<T>, predicate: Predicate<T>): Iterable<T> {
  for(const item of source) {
    if(predicate(item)) yield item
  }
}
