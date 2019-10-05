# Iterable Transforms

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

