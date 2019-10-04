export function* reverse<T>(source: Iterable<T>): Iterable<T> {
  const all = [...source]
  const length = all.length
  for(let i = length; i >= 0;) yield all[--i]
}