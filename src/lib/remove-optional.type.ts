/**
 * @description
 * @export
 * @template {string} S 
 */
export type RemoveOptional<S extends string> = S extends `${infer R}?` ? R : S;
