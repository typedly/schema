/**
 * @description
 * @export
 * @template T 
 */
export type ExpandDeep<T> =
  T extends (...args: unknown[]) => unknown ? T
  : T extends Date ? T
  : T extends readonly (infer U)[] ? ExpandDeep<U>[]
  : T extends object ? { [K in keyof T]: ExpandDeep<T[K]> }
  : T;