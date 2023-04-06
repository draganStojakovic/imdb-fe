export function isObjOfType<T>(obj: unknown): obj is T {
  return !!obj;
}
