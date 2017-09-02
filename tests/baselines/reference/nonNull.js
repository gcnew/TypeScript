//// [nonNull.ts]
type NonNull<T> = T!
type IndexNullable<T, K extends keyof T!> = T![K]
type NonNullableMember<T, K extends keyof T> = T[K]!
type StrictMembers<T> = { [K in keyof T]: T[K]! }

type FlipFlop<T> = StrictMembers<Partial<StrictMembers<T>>>

type HasKey<T, Key extends string> = (
  { [K in keyof T]: 'true' } &
  { [key: string]: 'false' }
)[Key]

type HasKindKey<T> = HasKey<T!, 'kind'>
type MapHasKey<T, Key extends string> = {
    [K in keyof T]: HasKey<T[K]!, Key>
}

type KeyOfBang<T> = keyof T!

type Strip1<T> = { [K in keyof T!]: T![K] }
type Strip2<T> = { [K in keyof T!]: T![K]! }

type Obj = {
    x: number|null,
    z: { kind: 'Just', value: string } |
       { kind: 'Nothing' } |
       undefined
}

type T1 = number!
type T2 = (number|undefined)!
type T3 = (number|null)!
type T4 = NonNull<null|number>
type T5 = NonNull<number|undefined>
type T6 = NonNull<null>
type T7 = NonNullableMember<Obj, 'x'>
type T8 = IndexNullable<Obj|undefined, 'x'>
type T9 = StrictMembers<Obj>
type T10 = StrictMembers<Obj|undefined>
type T11 = FlipFlop<Obj>
type T12 = FlipFlop<number>
type T13 = keyof (Obj|null)!
type T14 = KeyOfBang<Obj|null>
type T15 = Obj['z']!['kind']
type T16 = MapHasKey<Obj, 'kind'>
type T17 = Strip1<Obj>
type T18 = Strip1<Obj|undefined>
type T19 = Strip2<Obj|undefined>


type Error1<T, K extends keyof T!> = T[K]

let a: string | undefined | null | never;
let b: typeof a!;
type Assert<T> = T!;
let c: Assert<typeof a>;

declare function infer1<T>(x: T): T!;
infer1(null! as (number | undefined));

declare function infer2<T>(x: { a: T }): T!;
infer2(null! as { a: number | null });
infer2(null! as { a: null });

declare function infer3<T>(x: { a: T! }): T;
infer3(null! as { a: number });
infer3(null! as { a: null });
const res3: number|undefined = infer3(null! as { a: number });

declare function infer4<T>(x: T, y: T!): void;
infer4(5, null);
infer4(5 as (number|null), 5);
infer4(null, 5); // should be number

declare function infer5<T>(x: T!): T;
infer5(null);
infer5(undefined);
infer5(null as never);
infer5(null as any);

infer5<null>(null);
infer5<undefined>(null);
infer5<never>(null);
infer5<any>(null);

declare function infer6<T>(x: Record<'x'|'y', T!>): void;
infer6({ x: 1, y: 2 });
infer6({ x: 1, y: 'string' });

function assignability<T>(x: T, y: T!) {
    const a: T = x;
    const b: T = y;
    const c: T! = x;
    const d: T! = y;
}

function mappedAssignability<T>(x: T, y: StrictMembers<T>) {
    const a: T = x;
    const b: T = y;
    const c: T! = x;
    const d: T! = y;
}

function comparability<T>(x: T, y: T!) {
    x === x;
    y === y;
    x === y;
}

function mappedComparability<T>(x: T, y: StrictMembers<T>) {
    x === x;
    y === y;
    x === y;
}

type IdMapped<T> = { [K in keyof T]: T[K] }

function mappedRelations<T>(x: IdMapped<T>, y: Partial<T>, z: StrictMembers<T>) {
    x === z;
    y === z;

    const a: IdMapped<T> = z;
    const b: Partial<T> = z;
}

mappedRelations(null! as Obj, null! as Partial<Obj>, null! as StrictMembers<Obj>);
mappedRelations(null! as StrictMembers<Obj>, null! as StrictMembers<Obj>, null! as StrictMembers<Obj>);

declare const f: <T>() => Partial<T>;
declare const g: <T>() => IdMapped<T>;
declare const h: <T>() => T;
declare const w: <T>() => StrictMembers<T>;

// OK
const fw: typeof f = w;
const gw: typeof g = w;

// These should be the same
const hw: typeof h = w;
const hg: typeof h = g;

// Errors
const wf: typeof w = f;
const wg: typeof w = g;
const wh: typeof w = h;


//// [nonNull.js]
var a;
var b;
var c;
infer1(null);
infer2(null);
infer2(null);
infer3(null);
infer3(null);
var res3 = infer3(null);
infer4(5, null);
infer4(5, 5);
infer4(null, 5); // should be number
infer5(null);
infer5(undefined);
infer5(null);
infer5(null);
infer5(null);
infer5(null);
infer5(null);
infer5(null);
infer6({ x: 1, y: 2 });
infer6({ x: 1, y: 'string' });
function assignability(x, y) {
    var a = x;
    var b = y;
    var c = x;
    var d = y;
}
function mappedAssignability(x, y) {
    var a = x;
    var b = y;
    var c = x;
    var d = y;
}
function comparability(x, y) {
    x === x;
    y === y;
    x === y;
}
function mappedComparability(x, y) {
    x === x;
    y === y;
    x === y;
}
function mappedRelations(x, y, z) {
    x === z;
    y === z;
    var a = z;
    var b = z;
}
mappedRelations(null, null, null);
mappedRelations(null, null, null);
// OK
var fw = w;
var gw = w;
// These should be the same
var hw = w;
var hg = g;
// Errors
var wf = f;
var wg = g;
var wh = h;


//// [nonNull.d.ts]
declare type NonNull<T> = T!;
declare type IndexNullable<T, K extends keyof T!> = T![K];
declare type NonNullableMember<T, K extends keyof T> = T[K]!;
declare type StrictMembers<T> = {
    [K in keyof T]: T[K]!;
};
declare type FlipFlop<T> = StrictMembers<Partial<StrictMembers<T>>>;
declare type HasKey<T, Key extends string> = ({
    [K in keyof T]: 'true';
} & {
    [key: string]: 'false';
})[Key];
declare type HasKindKey<T> = HasKey<T!, 'kind'>;
declare type MapHasKey<T, Key extends string> = {
    [K in keyof T]: HasKey<T[K]!, Key>;
};
declare type KeyOfBang<T> = keyof T!;
declare type Strip1<T> = {
    [K in keyof T!]: T![K];
};
declare type Strip2<T> = {
    [K in keyof T!]: T![K]!;
};
declare type Obj = {
    x: number | null;
    z: {
        kind: 'Just';
        value: string;
    } | {
        kind: 'Nothing';
    } | undefined;
};
declare type T1 = number!;
declare type T2 = (number | undefined)!;
declare type T3 = (number | null)!;
declare type T4 = NonNull<null | number>;
declare type T5 = NonNull<number | undefined>;
declare type T6 = NonNull<null>;
declare type T7 = NonNullableMember<Obj, 'x'>;
declare type T8 = IndexNullable<Obj | undefined, 'x'>;
declare type T9 = StrictMembers<Obj>;
declare type T10 = StrictMembers<Obj | undefined>;
declare type T11 = FlipFlop<Obj>;
declare type T12 = FlipFlop<number>;
declare type T13 = keyof (Obj | null)!;
declare type T14 = KeyOfBang<Obj | null>;
declare type T15 = Obj['z']!['kind'];
declare type T16 = MapHasKey<Obj, 'kind'>;
declare type T17 = Strip1<Obj>;
declare type T18 = Strip1<Obj | undefined>;
declare type T19 = Strip2<Obj | undefined>;
declare type Error1<T, K extends keyof T!> = T[K];
declare let a: string | undefined | null | never;
declare let b: typeof a!;
declare type Assert<T> = T!;
declare let c: Assert<typeof a>;
declare function infer1<T>(x: T): T!;
declare function infer2<T>(x: {
    a: T;
}): T!;
declare function infer3<T>(x: {
    a: T!;
}): T;
declare const res3: number | undefined;
declare function infer4<T>(x: T, y: T!): void;
declare function infer5<T>(x: T!): T;
declare function infer6<T>(x: Record<'x' | 'y', T!>): void;
declare function assignability<T>(x: T, y: T!): void;
declare function mappedAssignability<T>(x: T, y: StrictMembers<T>): void;
declare function comparability<T>(x: T, y: T!): void;
declare function mappedComparability<T>(x: T, y: StrictMembers<T>): void;
declare type IdMapped<T> = {
    [K in keyof T]: T[K];
};
declare function mappedRelations<T>(x: IdMapped<T>, y: Partial<T>, z: StrictMembers<T>): void;
declare const f: <T>() => Partial<T>;
declare const g: <T>() => IdMapped<T>;
declare const h: <T>() => T;
declare const w: <T>() => StrictMembers<T>;
declare const fw: typeof f;
declare const gw: typeof g;
declare const hw: typeof h;
declare const hg: typeof h;
declare const wf: typeof w;
declare const wg: typeof w;
declare const wh: typeof w;
