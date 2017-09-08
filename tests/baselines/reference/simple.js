//// [simple.ts]
let a: string | undefined | null | never;
let b: typeof a!;
type Assert<T> = T!;
let c: Assert<typeof a>;


//// [simple.js]
var a;
var b;
var c;
