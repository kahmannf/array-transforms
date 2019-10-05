import { 
  map,
  distinct,
  flat,
  first,
  last,
  reverse,
  reduce,
  concat,
  count,
  groupBy,
  sort,
  thenSort,
  skip,
  skipWhile
} from './transforms'
import {
  Predicate,
  Selector,
  EqualityFn,
  Grouping,
  Comparer,
  SortedIterable,
  SortDirection
} from './types';

export class IterableTransform<T> implements Iterable<T> {

  constructor(private source: Iterable<T>) {}

  concat(other: Iterable<T>): IterableTransform<T> {
    return new IterableTransform(concat(this.source, other))
  }

  count(predicate?: Predicate<T>): number {
    return count(this.source, predicate)
  }

  distinct(): IterableTransform<T>;
  distinct<U>(selector: Selector<T, U>): IterableTransform<U>;
  distinct<U>(selector?: Selector<T, U>): IterableTransform<T|U>  {
    return selector
    ? new IterableTransform(distinct(this.source, selector))
    : new IterableTransform(distinct(this.source))
  }

  first(predicate?: Predicate<T>): T | undefined {
    return first(this.source, predicate);
  }

  flatMap<U>(selector: Selector<T, Iterable<U>>): IterableTransform<U> {
    return new IterableTransform(flat(map(this.source, selector)))
  }

  groupBy<TKey>(keySelector: Selector<T, TKey>, equals?: EqualityFn<TKey>): IterableTransform<Grouping<TKey, T>>
  groupBy<TKey, TValue>(keySelector: Selector<T, TKey>, equals?: EqualityFn<TKey>, valueSelector?: Selector<T, TValue>): IterableTransform<Grouping<TKey, TValue>>
  groupBy<TKey, TValue>(keySelector: Selector<T, TKey>, equals?: EqualityFn<TKey>, valueSelector?: Selector<T, TValue|T>): IterableTransform<Grouping<TKey, T|TValue>> {
    return new IterableTransform(groupBy(this.source, keySelector, equals, valueSelector))
  }

  last(predicate?: Predicate<T>): T | undefined {
    return last(this.source, predicate)
  }

  map<U>(selector: Selector<T, U>): IterableTransform<U> {
    return new IterableTransform(map(this.source, selector))
  }
  
  reduce<T>(source: Iterable<T>, reducer: (pv: T, cv: T, initialValue?: T) => T): T;
  reduce<T, U>(source: Iterable<T>, reducer: (pv: U, cv: T) => U, initialValue: U): U
  reduce<T, U>(source: Iterable<T>, reducer: (pv: T|U, cv: T) => T|U, initialValue?: U): T|U {
    return reduce(source, <any>reducer, <any>initialValue);
  }

  reverse(): IterableTransform<T> {
    return new IterableTransform(reverse(this.source));
  }

  skip(amount: number): IterableTransform<T> {
    return new IterableTransform(skip(this.source, amount))
  }

  skipWhile(predicate: Predicate<T>): IterableTransform<T> {
    return new IterableTransform(skipWhile(this.source, predicate))
  }

  sort<TKey>(
    keySelector: Selector<T, TKey>,
    direction: SortDirection = 'asc',
    comparer?: Comparer<TKey>
  ): SortedIterableTransform<T> {
    return new SortedIterableTransform(sort(this.source, keySelector, direction, comparer))
  }

  [Symbol.iterator](): IterableIterator<T> {
    const _this = this
    return function*() {
      for(const item of _this.source) yield item
    }();
  }
}

export class SortedIterableTransform<T> extends IterableTransform<T> {
  
  constructor(private sortedSource: SortedIterable<T>) {
    super(sortedSource)
  }

  thenSort<TKey>(
    keySelector: Selector<T, TKey>,
    direction: SortDirection = 'asc',
    comparer?: Comparer<TKey>
  ): SortedIterableTransform<T> {
    return new SortedIterableTransform(thenSort(this.sortedSource, keySelector, direction, comparer))
  }
}
