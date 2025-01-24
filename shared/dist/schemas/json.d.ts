import { z } from "zod";
declare const literalSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
type Literal = z.infer<typeof literalSchema>;
type Json = Literal | {
    [key: string]: Json;
} | Json[];
/**
zu.json() is a schema that validates that a JavaScript object is JSON-compatible. This includes `string`, `number`, `boolean`, and `null`, plus `Array`s and `Object`s containing JSON-compatible types as values.
Note: `JSON.stringify()` enforces non-circularity, but this can't be easily checked without actually stringifying the results, which can be slow.
@example
import { zu } from 'zod_utilz'
const schema = zu.json()
schema.parse( false ) // false
schema.parse( 8675309 ) // 8675309
schema.parse( { a: 'deeply', nested: [ 'JSON', 'object' ] } )
// { a: 'deeply', nested: [ 'JSON', 'object' ] }
 */
export declare const json: () => z.ZodType<Json, z.ZodTypeDef, Json>;
export {};
