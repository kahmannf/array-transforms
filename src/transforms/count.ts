import { reduce } from "./reduce";
import { Predicate } from "../types";

export function count<T>(source: Iterable<T>, predicate?: Predicate<T>): number {
  predicate = predicate || (x => true);
  return reduce(source, (pv, cv) => (<any>predicate)(cv) ? ++pv : pv, 0)
}
