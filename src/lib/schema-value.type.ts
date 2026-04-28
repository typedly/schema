// Type.
import type { ExpandDeep } from "@typedly/utility";
import type { SchemaToType } from "./schema-to-type";
import type { SchemaTypeMap } from "./schema-type-map.type";
/**
 * @description Defines a type that maps a schema value to its corresponding TypeScript type.
 * It handles primitive types, arrays of primitives, nested objects, and arrays of nested objects based on the provided schema definition.
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

/*
// Example

// 1a. Primitive array:
type Ex1 = SchemaValue<{ array: 'string' }>;
// => string[]

// 1b. Nested object array:
type Ex2 = SchemaValue<{ array: { id: 'number', name: 'string' } }>;
// => { id: number; name: string; }[]

// 1c. Deeply nested arrays:
type Ex3 = SchemaValue<{ array: { array: 'boolean' } }>;
// => boolean[][]

// 2. Primitive type:
type Ex4 = SchemaValue<'string'>; // string
// => string

type Ex5 = SchemaValue<'number'>; // number
// => number

type Ex6 = SchemaValue<'boolean'>; // boolean
// => boolean

type Ex7 = SchemaValue<'date'>;    // Date
// => Date

// 4. readonly any[] — Native TypeScript array (forgiveness fallback)
type Ex8 = SchemaValue<string[]>; // string[]

// 5. Record<string, any> — Nested object (schema for object)
type Ex9 = SchemaValue<{ id: 'number'; name: 'string' }>;
// => { id: number; name: string; }

// 6. Invalid types (not in SchemaTypeMap, not an array, not a nested object)
type Ex13 = SchemaValue<null>;      // never
type Ex14 = SchemaValue<undefined>; // never
type Ex15 = SchemaValue<()=>void>;  // never
type Ex16 = SchemaValue<42>;        // never
*/