import { Selector, Comparer } from "../types";
import { SortedIterable } from "../types";
import { SortDirection } from "../types";

export function sort<T, TKey>(
  source: Iterable<T>,
  keySelector: Selector<T, TKey>,
  direction: SortDirection = 'asc',
  comparer?: Comparer<TKey>
): SortedIterable<T> {
  return new SortedIterableImpl<T, TKey>(
    source,
    keySelector,
    direction,
    comparer
  )
}

export function thenSort<T, TKey>(
  source: SortedIterable<T>,
  keySelector: Selector<T, TKey>,
  direction: SortDirection = 'asc',
  comparer?: Comparer<TKey>
): SortedIterable<T> {
  return source.extendOrder(
    keySelector,
    direction,
    comparer
  )  
}

const defaultComparer: Comparer<any> = (a: any, b: any) => a === b ? 0 : a > b ? 1 : -1;

class IterableSorter<T, TKey> {

  keys?: TKey[]

  constructor(
    private keySelector: Selector<T, TKey>,
    private comparer: Comparer<TKey> = defaultComparer,
    private isRevese: boolean,
    private next?: IterableSorter<T, TKey>
  ) { }

  setKeys(elements: T[], count: number) {
    this.keys = [];
    for (let i = 0; i < count; i++) this.keys[i] = this.keySelector(elements[i]);
    if (this.next) this.next.setKeys(elements, count);
  }
  
  compare(index1: number, index2: number): number {
    if(!this.keys) return 0
    const result = this.comparer(this.keys[index1], this.keys[index2])

    if(result === 0) {
      return this.next
      ? this.next.compare(index1, index2) 
      : index1 - index2
    }

    return this.isRevese ? -result : result
  }

  sort(elements: T[], count: number): number[] {
    this.setKeys(elements, count);
    const map: number[] = [];
    for (let i = 0; i < count; i++) map[i] = i;
    this.quickSort(map, 0, count - 1);
    return map;
  }

  quickSort(map: number[], left: number, right: number) {
    do {
      let i = left;
      let j = right;
      let x = map[i + ((j - i) >> 1)];
      do {
        while (i < map.length && this.compare(x, map[i]) > 0) i++;
        while (j >= 0 && this.compare(x, map[j]) < 0) j--;
        if (i > j) break;
        if (i < j) {
          const temp = map[i];
          map[i] = map[j];
          map[j] = temp;
        }
        i++;
        j--;
      } while (i <= j);
      if (j - left <= right - i) {
        if (left < j) this.quickSort(map, left, j);
        left = i;
      }
      else {
        if (i < right) this.quickSort(map, i, right);
        right = j;
      }
    } while (left < right);
  }

}

class SortedIterableImpl<T, TKey> implements SortedIterable<T> {

  private parent?: SortedIterableImpl<T, any>

  constructor(
    private source: Iterable<T>,
    private keySelector: Selector<T, TKey>,
    private sortDirection: SortDirection,
    private comparer?: Comparer<TKey>
  ) {

  }

  extendOrder<TKey>(keySelector: Selector<T, TKey>, direction: SortDirection, comparer?: Comparer<TKey>): SortedIterable<T> {
    const result = new SortedIterableImpl(
      this.source,
      keySelector,
      direction,
      comparer
    )
    result.parent = this
    return result
  }

  getSorter(next?: IterableSorter<T, any>): IterableSorter<T, any> {
    const thisSorter = new IterableSorter(this.keySelector, this.comparer, this.sortDirection === 'desc', next);
    return this.parent ? this.parent.getSorter(thisSorter) : thisSorter
  }
  
  [Symbol.iterator](): Iterator<T> {

    const source = this.source;
    const _this: SortedIterableImpl<T, TKey> = this
    return function*() {
      const buffer = [...source];

      if (buffer.length > 0) {
        const sorter = _this.getSorter()
        const map = sorter.sort(buffer, buffer.length);

        for (let i = 0; i < buffer.length; i++) yield buffer[map[i]]
      }
    }()
  }




}
