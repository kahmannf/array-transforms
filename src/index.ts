import { ArrayTransform } from "./array-transforms";

function create<T>(source: Iterable<T>) {
  return new ArrayTransform(source)
}

export default create
