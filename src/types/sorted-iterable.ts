import { Selector, Comparer } from "./functions";
import { SortDirection } from "./sort-direction";

export interface SortedIterable<T> extends Iterable<T> {
  extendOrder<TKey>(keySelector: Selector<T, TKey>, direction: SortDirection, comparer?: Comparer<TKey>): SortedIterable<T>;
}
