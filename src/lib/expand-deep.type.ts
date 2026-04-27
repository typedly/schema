/**
 * @description
 * @export
 * @template T 
 */
export type ExpandDeep<T> =
  // Handle function types. e.g. () => void => () => void
  T extends (...args: unknown[]) => unknown ? T
  // Handle Date type. e.g. Date => Date
  : T extends Date ? T
  // Handle array types. e.g. string[] => string[]
  : T extends readonly (infer U)[] ? ExpandDeep<U>[]
  // Handle object types. e.g. { name: string } => { name: string }
  : T extends object ? { -readonly [K in keyof T]: ExpandDeep<T[K]> }
  // Handle primitive types. e.g. string => string
  : T;
