export type Predicate<T> = (item: T) => boolean
export type Selector<T, U> = (item: T) => U
export type EqualityFn<T> = (item1: T, item2: T) => boolean 
