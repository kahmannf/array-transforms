import { IterableTransform } from "./array-transforms";

function create<T>(source: Iterable<T>) {
  return new IterableTransform(source)
}

export * from "./array-transforms"
export * from "./transforms"
export * from "./types"

export default create
