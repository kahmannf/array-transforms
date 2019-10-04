import { map, distinct, flat } from './transforms'

export class ArrayTransform<T> implements Iterable<T> {

  constructor(private source: Iterable<T>) {}

  distinct(): ArrayTransform<T>;
  distinct<U>(selector: (item: T) => U): ArrayTransform<U>;
  distinct<U>(selector?: (item: T) => U): ArrayTransform<T> | ArrayTransform<U> {
    return selector
    ? new ArrayTransform(distinct(this.source, selector))
    : new ArrayTransform(distinct(this.source))
  }

  flatMap<U>(selector: (x: T) => Iterable<U>): ArrayTransform<U> {
    return new ArrayTransform(flat(map(this.source, selector)))
  }

  map<U>(selector: (items: T) => U): ArrayTransform<U> {
    return new ArrayTransform(map(this.source, selector))
  }

  [Symbol.iterator](): IterableIterator<T> {
    const _this = this
    return function*() {
      for(const item of _this.source) yield item
    }();
  }
}
