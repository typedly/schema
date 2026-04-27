// Type.
import type { ExpandDeep } from "./expand-deep.type";
import type { SchemaToType } from "./schema-to-type";
import type { SchemaTypeMap } from "./schema-type-map.type";
/**
 * @description
 * @export
 * @template V 
 */
export type SchemaValue<V> =
  // Handle array types first. e.g. { array: 'string' } => string[]
  V extends { array: infer Arr }
    ? Arr extends keyof SchemaTypeMap
      // Handle native array types. e.g. { array: 'string' } => string[]
      ? SchemaTypeMap[Arr][]
      // Handle nested array types. e.g. { array: { array: 'string' } } => string[][]
      : Arr extends Record<string, any>
        ? ExpandDeep<SchemaToType<Arr>>[]
        : never[]
  // Handle primitive types. e.g. 'string' => string
  : V extends keyof SchemaTypeMap
    ? SchemaTypeMap[V]
    : V extends readonly any[]  // native TS array type
      ? V
      : V extends Record<string, any>
        ? ExpandDeep<SchemaToType<V>>
      : never;
