export function last<T>(source: Iterable<T>): T | undefined {
  let last: T | undefined = undefined
  for(const item of source) last = item
  return last
}
