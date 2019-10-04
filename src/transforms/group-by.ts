import { Selector, Grouping, EqualityFn } from "../types";

export function groupBy<T, TKey>(source: Iterable<T>, keySelector: Selector<T, TKey>, equals?: EqualityFn<TKey>): Grouping<TKey, T>[]
export function groupBy<T, TKey, TValue>(source: Iterable<T>, keySelector: Selector<T, TKey>, equals?: EqualityFn<TKey>, valueSelector?: Selector<T, TValue>): Grouping<TKey, TValue>[]
export function groupBy<T, TKey, TValue>(source: Iterable<T>, keySelector: Selector<T, TKey>, equals?: EqualityFn<TKey>, valueSelector?: Selector<T, TValue|T>): Grouping<TKey, T|TValue>[] {
  const result: Grouping<TKey, TValue|T>[] = []
  const eqFn = equals || ((a: TKey, b: TKey) => a === b)
  const valueFn = valueSelector || ((x: T) => x)

  for(const item of source) {
    const key = keySelector(item);
    let group = result.find(x => eqFn(x.key, key));

    if(typeof group === 'undefined') {
      group = {
        key,
        values: []
      }

      result.push(group);
    }

    group.values.push(valueFn(item));
  }

  return result
}
