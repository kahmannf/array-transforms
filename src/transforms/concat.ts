export function* concat<T>(source1: Iterable<T>, source2: Iterable<T>): Iterable<T> {
  for(const element of source1) yield element;
  for(const element of source2) yield element;
}
