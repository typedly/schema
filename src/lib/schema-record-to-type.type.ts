// Type.
import type { SchemaToType } from "./schema-to-type";
import type { Expand, Mutable } from "@typedly/utility";
/**
 * @description
 * @export
 * @template {Record<string, Record<string, unknown>>} Schema 
 */
export type SchemaRecordToType<Schema extends Record<string, Record<string, unknown>>> = Expand<{
  [K in keyof Schema & string]: Expand<Mutable<SchemaToType<Schema[K]>>>;
}>;
