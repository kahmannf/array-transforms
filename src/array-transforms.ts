import { map, distinct, flat, first, last, reverse, reduce } from './transforms'
import { concat } from './transforms/concat';
import { Predicate, Selector } from './types';
import { count } from './transforms/count';

export class ArrayTransform<T> implements Iterable<T> {

  constructor(private source: Iterable<T>) {}

  concat(other: Iterable<T>): ArrayTransform<T> {
    return new ArrayTransform(concat(this.source, other))
  }

  count(predicate?: Predicate<T>): number {
    return count(this.source, predicate)
  }

  distinct(): ArrayTransform<T>;
  distinct<U>(selector: Selector<T, U>): ArrayTransform<U>;
  distinct<U>(selector?: Selector<T, U>): ArrayTransform<T|U>  {
    return selector
    ? new ArrayTransform(distinct(this.source, selector))
    : new ArrayTransform(distinct(this.source))
  }

  first(predicate?: Predicate<T>): T | undefined {
    return first(this.source, predicate);
  }

  flatMap<U>(selector: Selector<T, Iterable<U>>): ArrayTransform<U> {
    return new ArrayTransform(flat(map(this.source, selector)))
  }

  last(predicate?: Predicate<T>): T | undefined {
    return last(this.source, predicate)
  }

  map<U>(selector: Selector<T, U>): ArrayTransform<U> {
    return new ArrayTransform(map(this.source, selector))
  }
  
  reduce<T>(source: Iterable<T>, reducer: (pv: T, cv: T, initialValue?: T) => T): T;
  reduce<T, U>(source: Iterable<T>, reducer: (pv: U, cv: T) => U, initialValue: U): U
  reduce<T, U>(source: Iterable<T>, reducer: (pv: T|U, cv: T) => T|U, initialValue?: U): T|U {
    return reduce(source, <any>reducer, <any>initialValue);
  }

  reverse(): ArrayTransform<T> {
    return new ArrayTransform(reverse(this.source));
  }

  [Symbol.iterator](): IterableIterator<T> {
    const _this = this
    return function*() {
      for(const item of _this.source) yield item
    }();
  }
}
