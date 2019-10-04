import { map, distinct, flat, first, last, reverse, reduce } from './transforms'

export class ArrayTransform<T> implements Iterable<T> {

  constructor(private source: Iterable<T>) {}

  distinct(): ArrayTransform<T>;
  distinct<U>(selector: (item: T) => U): ArrayTransform<U>;
  distinct<U>(selector?: (item: T) => U): ArrayTransform<T> | ArrayTransform<U> {
    return selector
    ? new ArrayTransform(distinct(this.source, selector))
    : new ArrayTransform(distinct(this.source))
  }

  first(predicate?: (item: T) => boolean): T | undefined {
    return first(this.source, predicate);
  }

  flatMap<U>(selector: (x: T) => Iterable<U>): ArrayTransform<U> {
    return new ArrayTransform(flat(map(this.source, selector)))
  }

  last(predicate?: (item: T) => boolean): T | undefined {
    return last(this.source, predicate)
  }

  map<U>(selector: (items: T) => U): ArrayTransform<U> {
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
