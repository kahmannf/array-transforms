import { IterableTransform } from "./array-transforms";

function create<T>(source: Iterable<T>) {
  return new IterableTransform(source)
}

export default create
