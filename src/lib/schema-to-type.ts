// Type.
import type { ExpandDeep } from "./expand-deep.type";
import type { IsOptional } from "./is-optional.type";
import type { RemoveOptional } from "./remove-optional.type";
import type { SchemaValue } from "./schema-value.type";
/**
 * @description
 * @export
 * @template {Record<string, any>} S 
 */
export type SchemaToType<S extends Record<string, any>> = ExpandDeep<
  { [K in keyof S as IsOptional<K & string> extends true ? never : RemoveOptional<K & string>]: SchemaValue<S[K]> } &
  { [K in keyof S as IsOptional<K & string> extends true ? RemoveOptional<K & string> : never]?: SchemaValue<S[K]> }
>;
