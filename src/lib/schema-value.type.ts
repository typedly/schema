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
  V extends { array: infer Arr }
    ? Arr extends keyof SchemaTypeMap
      ? SchemaTypeMap[Arr][]
      : Arr extends Record<string, any>
        ? ExpandDeep<SchemaToType<Arr>>[]
        : never[]
  : V extends keyof SchemaTypeMap
    ? SchemaTypeMap[V]
  : V extends Record<string, any>
    ? ExpandDeep<SchemaToType<V>>
  : never;
