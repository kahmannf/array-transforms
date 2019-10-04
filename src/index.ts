import { ArrayTransform } from "./array-transforms";

function create<T>(source: IterableIterator<T>) {
  return new ArrayTransform(source)
}

export default create
