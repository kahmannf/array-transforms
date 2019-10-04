export function* flat<T>(source: Iterable<Iterable<T>>): Iterable<T> {
  for(const a of source) for(const b of a) yield b
}
