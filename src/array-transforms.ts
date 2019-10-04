import { map, distinct, flat, first, last, reverse } from './transforms'

export class ArrayTransform<T> implements Iterable<T> {

  constructor(private source: Iterable<T>) {}

  distinct(): ArrayTransform<T>;
  distinct<U>(selector: (item: T) => U): ArrayTransform<U>;
  distinct<U>(selector?: (item: T) => U): ArrayTransform<T> | ArrayTransform<U> {
    return selector
    ? new ArrayTransform(distinct(this.source, selector))
    : new ArrayTransform(distinct(this.source))
  }

  first(): T | undefined {
    return first(this.source);
  }

  flatMap<U>(selector: (x: T) => Iterable<U>): ArrayTransform<U> {
    return new ArrayTransform(flat(map(this.source, selector)))
  }

  last(): T | undefined {
    return last(this.source)
  }

  map<U>(selector: (items: T) => U): ArrayTransform<U> {
    return new ArrayTransform(map(this.source, selector))
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
