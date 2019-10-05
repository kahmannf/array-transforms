# Iterable Transforms

[![npm version](https://badge.fury.io/js/%40kahmannf%2Fiterable-transforms.svg)](https://badge.fury.io/js/%40kahmannf%2Fiterable-transforms)

## Installation 

yarn:
```
yarn add @kahmannf/iterable-transforms
```
npm:
```
npm install @kahmannf/iterable-transforms
```


Typescript/Javascript library for manipulation of Iterables. Inspiered by the C#-Linq API

Available transformations:

- concat
- count
- distinct
- filter
- first
- flat
- groupBy
- last
- map
- reduce
- reverse
- skip
- skipWhile
- sort
- thenSort
- take
- takeWhile

There is a function for each operator/tranformation. In addition to that there is the `IterableTransform` class available for easy chaining of these operators. The signature of the class-Methods are the same, with an exception to the source-Parameter.

## Operators

### concat
Concatenates two iterables. The resulting iterable will return all items of the first Iterable and then all items of the second Iterable
```typescript
function concat<T>(source1: Iterable<T>, source2: Iterable<T>): Iterable<T>
```

### count
Counts all items that match the predicate. If no predicate is provided, it counts all items.
```typescript
function count<T>(source: Iterable<T>, predicate?: Predicate<T>): number
```

### distinct
Returns an iterable with no duplicate items. If a selector-lambda is provided, the resulting iterable only returns items with distinct return-values for that keySelector.
```typescript
function distinct<T>(source: Iterable<T>): Iterable<T>
function distinct<T, U>(source: Iterable<T>, selector: Selector<T, U>): Iterable<U>
```

Example:
```typescript

const array = [1,2,3,1,2,3,4]
distinct(array) // => 1,2,3,4

const array2 = [
  {
    name: 'Felix',
    age: 22
  },
  {
    name: 'Jonas',
    age: 19
  },
  {
    name: 'Felix',
    age: 54
  }
]

distinct(array2, x => x.name) 
// { name: 'Felix', age: 22 }
// { name: 'Jonas', age: 19 }

distinct(array2, x => x.age)
// { name: 'Felix', age: 22 }
// { name: 'Jonas', age: 19 }
// { name: 'Felix', age: 54 }

const array3 = [...array2, ...array2] // length = 6
// { name: 'Felix', age: 22 }
// { name: 'Jonas', age: 19 }
// { name: 'Felix', age: 54 }
// { name: 'Felix', age: 22 }
// { name: 'Jonas', age: 19 }
// { name: 'Felix', age: 54 }

distinct(array3)
// { name: 'Felix', age: 22 }
// { name: 'Jonas', age: 19 }
// { name: 'Felix', age: 54 }
```

### filter
Returns a iterable that only contains items which match the predicate. Similar to `Array.prototype.filter`.
```typescript
function filter<T>(source: Iterable<T>, predicate: Predicate<T>): Iterable<T>
```

### first
Returns the first element of the sequence, or (if a predicate is provided) the first item that matches the predicate. Returns `undefined` if iterable is empty or no item matches the predicate.
```typescript
function first<T>(source: Iterable<T>, predicate?: Predicate<T>): T | undefined
```

### flat
Flattens an iterable of iterables into a iterable that containes all items of the inner iterables
```typescript
function flat<T>(source: Iterable<Iterable<T>>): Iterable<T>
```

### groupBy
Groups an items of an iterable by a key. Returns an array of groupings.
```typescript
function groupBy<T, TKey>(
  source: Iterable<T>,
  keySelector: Selector<T, TKey>,
  equals?: EqualityFn<TKey>
): Grouping<TKey, T>[]

function groupBy<T, TKey, TValue>(
  source: Iterable<T>,
  keySelector: Selector<T, TKey>,
  equals?: EqualityFn<TKey>,
  valueSelector?: Selector<T, TValue>
): Grouping<TKey, TValue>[]

interface Grouping<TKey, TValue> {
  key: TKey
  value: TValue[]
}
```

### last
Returns the last element of the sequence, or (if a predicate is provided) the last item that matches the predicate. Returns `undefined` if iterable is empty or no item matches the predicate.
```typescript
function last<T>(source: Iterable<T>, predicate?: Predicate<T>): T | undefined
```

### map
Maps all the items of the iterable to a new value. Similar to `Array.prototype.map`.
```typescript
function map<T, U>(source: Iterable<T>, selector: Selector<T, U>): Iterable<U>
```

### reduce
Reduces the iterable to a single value. Similar to `Array.prototype.reduce`
```typescript
function reduce<T>(source: Iterable<T>, reducer: (pv: T, cv: T) => T, initialValue?: T): T
function reduce<T, U>(source: Iterable<T>, reducer: (pv: U, cv: T) => U, initialValue: U): U
```

### reverse
Returns an iterable with aöö items in reversed order.
```typescript
function reverse<T>(source: Iterable<T>): Iterable<T>
```

### skip
Skips a certain amount of items of the iterable and returns the remaining as iterable
```typescript
function skip<T>(source: Iterable<T>, amount: number): Iterable<T>
```

### skipWhile
Skips all items of a iterable until the predicate returns false for a item and returns the remaining as iterable.
```typescript
function skipWhile<T>(source: Iterable<T>, predicate: Predicate<T>): Iterable<T>
```

### sort
Returns an iterable with all items sorted by the property that `keySelector` returns. Returns a `SortedIterable` and allows to do further sorting with `thenSort`.
A custom comparer-function can be provided.
```typescript
function sort<T, TKey>(
  source: Iterable<T>,
  keySelector: Selector<T, TKey>,
  direction: SortDirection = 'asc',
  comparer?: Comparer<TKey>
): SortedIterable<T>
```

### thenSort
Sorts a sorted iterable further:
All items that are equivalent regarding the sort order of the source are sorted, while keeping the original sort-order valid.

```typescript
function thenSort<T, TKey>(
  source: SortedIterable<T>,
  keySelector: Selector<T, TKey>,
  direction: SortDirection = 'asc',
  comparer?: Comparer<TKey>
): SortedIterable<T>
```
Example:
```typescript
const persons = [
  {
    name: 'Felix',
    age: 54
  },
  {
    name: 'Jonas',
    age: 19
  },
  {
    name: 'Felix',
    age: 22
  }
]

const sortedByName = sort(persons, p => p.name)
// { name: 'Felix', age: 54 }
// { name: 'Felix', age: 22 }
// { name: 'Jonas', age: 19 }

const sortedByNameAndAge = thenSort(sortedByName, p => p.age)
// { name: 'Felix', age: 22 }
// { name: 'Felix', age: 54 }
// { name: 'Jonas', age: 19 }
```

### take
Takes a certain amount of items and returns them as iterable.
```typescript
function take<T>(source: Iterable<T>, amount: number): Iterable<T>
```

### takeWhile
Takes all items of a iterable until the predicate returns false for a item and returns them as iterable.
```typescript
function takeWhile<T>(source: Iterable<T>, predicate: Predicate<T>): Iterable<T>
```

