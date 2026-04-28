// Type.
import type { SchemaToType } from "./schema-to-type";
import type { Expand, Mutable } from "@typedly/utility";
/**
 * @description Defines a type that converts a record of schema definitions (where each key maps to a schema object) into a corresponding TypeScript type.
 * @export
 * @template {Record<string, Record<string, unknown>>} Schema 
 */
export type SchemaRecordToType<Schema extends Record<string, Record<string, unknown>>> = Expand<{
  [K in keyof Schema & string]: Expand<Mutable<SchemaToType<Schema[K]>>>;
}>;

/*
Example:

type dbSchema = SchemaRecordToType<{
  person: { id: 'number', name: 'string' },
  cart: { id: 'number', items: { array: 'string' } },
}>;

// Result:
// type dbSchema = {
//   person: {
//     id: number;
//     name: string;
//   };
//   cart: {
//     id: number;
//     items: string[];
//   };
// }
*/
