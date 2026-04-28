// Type.
import type { SchemaValue } from "./schema-value.type";
import type { ExpandDeep } from '@typedly/utility';
/**
 * @description
 * @export
 * @template {Record<string, unknown>} Schema 
 */
export type SchemaToType<Schema extends Record<string, unknown>> = ExpandDeep<{
  [K in keyof Schema]: SchemaValue<Schema[K]>
}>;

// export type SchemaToType<Schema extends Record<string, unknown>> = ExpandDeep<
//   { [K in keyof Schema as IsOptional<K & string> extends true ? never : RemoveOptional<K & string>]: SchemaValue<Schema[K]> } &
//   { [K in keyof Schema as IsOptional<K & string> extends true ? RemoveOptional<K & string> : never]?: SchemaValue<Schema[K]> }
// >;
