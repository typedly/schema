// Type.
import type { SchemaValue } from "./schema-value.type";
import type { ExpandDeep } from '@typedly/utility';
/**
 * @description Defines a type that converts a schema definition (a record of string keys to schema values) into a corresponding TypeScript type.
 * It recursively maps each key in the schema to its corresponding TypeScript type using the `SchemaValue` type, and expands the resulting type for better readability.
 * This allows you to define complex data structures using a simple schema format and have them automatically converted into fully typed TypeScript types.
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
