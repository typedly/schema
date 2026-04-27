/**
 * @description
 * @export
 * @template {string} K 
 */
export type IsOptional<K extends string> = K extends `${string}?` ? true : false;
