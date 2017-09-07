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

type Error1<T, K extends keyof T!> = T[K]

type StupidButOK<T>  = { [K in keyof T]: T![K] }
type StupidButOK2<T> = { [K in keyof T]: T![K!] }  // FIXME

type Obj = {
    x: number|null,

    z:   { kind: 'Just', value: string }
       | { kind: 'Nothing' }
       | undefined
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

let a: string | undefined | null | never;
let b: typeof a!;
type Assert<T> = T!;
let c: Assert<typeof a>;

declare function infer1<T>(x: T): T!;
infer1(null! as (number | undefined));

declare function infer2<T>(x: { a: T }): T!;
infer2(null! as { a: number | null });
infer2(null! as { a: null });
const res2: number|undefined = infer2(null! as { a: number });

declare function infer3<T>(x: { a: T! }): T;
infer3(null! as { a: number });  // FIXME
infer3(null! as { a: null });    // FIXME
const res3: number|undefined = infer3(null! as { a: number });

declare function infer4<T>(x: T, y: T!): void;
infer4(5, null);
infer4(5 as (number|null), 5);
infer4(null, 5);  // FIXME      // should be number

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
infer6({ x: 1, y: 2 });           // FIXME
infer6({ x: 1, y: 'string' });    // FIXME

function assignability<T>(x: T, y: T!) {
    const a: T = y;
    const b: T! = x;
    const c: T! = y;
}

function assignability2<T extends number|null>(x: T, y: T!) {
    const a: T = y;
    const b: T! = x;
    const c: T! = y;
    const d: number = x;
    const e: number = y;
}

type IdMapped<T> = { [K in keyof T]: T[K] }

function mappedAssignability<T>(x: T, y: StrictMembers<T>, z: StrictMembers<T!>) {
    const a: T = y;
    const b: T = z;     // FIXME
    const c: T! = y;
    const d: T! = z;    // FIXME

    const e: StrictMembers<T> = x;
    const f: StrictMembers<T> = y;
    const g: StrictMembers<T> = z;

    const h: StrictMembers<T!> = x;
    const i: StrictMembers<T!> = y;
    const j: StrictMembers<T!> = z;

    const k: IdMapped<T> = x;
    const l: IdMapped<T> = y;
    const m: IdMapped<T> = z;

    const n: IdMapped<T!> = x;
    const o: IdMapped<T!> = y;
    const p: IdMapped<T!> = z;

    const q: Partial<T> = x;
    const r: Partial<T> = y;
    const s: Partial<T> = z;

    const u: Partial<T!> = x; // FIXME
    const v: Partial<T!> = y;
    const w: Partial<T!> = z;
}

function comparability<T>(x: T, y: T!, z: StrictMembers<T>, w: StrictMembers<T!>) {
    x === y;
    x === z;
    x === w;  // FIXME

    y === y;
    y === z;  // FIXME
    y === w;  // FIXME

    z === z;
    z === w;

    w === w;
}

function flags<A, B>(x: A|B|undefined, y: A!) {
    if (x === y) {
        // should be A!
        x;  // FIXME
    }
}

function signatures(
    f1: <T>() => T,
    f2: <T>() => T!,
    f3: <T>() => IdMapped<T>,
    f4: <T>() => IdMapped<T!>,
    f5: <T>() => Partial<T>,
    f6: <T>() => Partial<T!>,
    f7: <T>() => StrictMembers<T>,
    f8: <T>() => StrictMembers<T!>
) {
    const g12: typeof f1 = f2;  // FIXME

    const g21: typeof f2 = f1;  // FIXME

    const g34: typeof f3 = f4;  // FIXME
    const g37: typeof f3 = f7;  // FIXME
    const g38: typeof f3 = f8;  // FIXME

    const g41: typeof f4 = f1;  // FIXME
    const g42: typeof f4 = f2;  // FIXME
    const g43: typeof f4 = f3;  // FIXME
    const g47: typeof f4 = f7;
    const g48: typeof f4 = f8;  // FIXME

    const g51: typeof f5 = f1;
    const g52: typeof f5 = f2;
    const g53: typeof f5 = f3;
    const g54: typeof f5 = f4;
    const g56: typeof f5 = f6;
    const g57: typeof f5 = f7;
    const g58: typeof f5 = f8;

    const g61: typeof f6 = f1;  // FIXME
    const g62: typeof f6 = f2;
    const g63: typeof f6 = f3;  // FIXME
    const g64: typeof f6 = f4;
    const g65: typeof f6 = f5;  // FIXME
    const g67: typeof f6 = f7;  // FIXME
    const g68: typeof f6 = f8;

    const g71: typeof f7 = f1;  // FIXME
    const g72: typeof f7 = f2;
    const g73: typeof f7 = f3;
    const g74: typeof f7 = f4;
    const g75: typeof f7 = f5;
    const g76: typeof f7 = f6;
    const g78: typeof f7 = f8;  // FIXME

    const g81: typeof f8 = f1;  // FIXME
    const g82: typeof f8 = f2;
    const g83: typeof f8 = f3;
    const g84: typeof f8 = f4;
    const g85: typeof f8 = f5;
    const g86: typeof f8 = f6;
    const g87: typeof f8 = f7;  // FIXME
}

type A<T>    = { a: T }
type OptA<T> = { a: T | null }

function knownTypes(
    a:          A<number>,
    optA:       OptA<number>,
    bangA:      A<number>!,
    bangOptA:   OptA<number>!,
    strictA:    StrictMembers<A<number>>,
    strictOptA: StrictMembers<OptA<number>>
) {
    const a1: A<number> = a;
    const a2: A<number> = optA;
    const a3: A<number> = bangA;
    const a4: A<number> = bangOptA;
    const a5: A<number> = strictA;
    const a6: A<number> = strictOptA;

    const oa1: OptA<number> = a;
    const oa2: OptA<number> = optA;
    const oa3: OptA<number> = bangA;
    const oa4: OptA<number> = bangOptA;
    const oa5: OptA<number> = strictA;
    const oa6: OptA<number> = strictOptA;

    const ba1: A<number>! = a;
    const ba2: A<number>! = optA;
    const ba3: A<number>! = bangA;
    const ba4: A<number>! = bangOptA;
    const ba5: A<number>! = strictA;
    const ba6: A<number>! = strictOptA;

    const boa1: OptA<number>! = a;
    const boa2: OptA<number>! = optA;
    const boa3: OptA<number>! = bangA;
    const boa4: OptA<number>! = bangOptA;
    const boa5: OptA<number>! = strictA;
    const boa6: OptA<number>! = strictOptA;

    const sa1: StrictMembers<A<number>> = a;
    const sa2: StrictMembers<A<number>> = optA;
    const sa3: StrictMembers<A<number>> = bangA;
    const sa4: StrictMembers<A<number>> = bangOptA;
    const sa5: StrictMembers<A<number>> = strictA;
    const sa6: StrictMembers<A<number>> = strictOptA;

    const soa1: StrictMembers<OptA<number>> = a;
    const soa2: StrictMembers<OptA<number>> = optA;
    const soa3: StrictMembers<OptA<number>> = bangA;
    const soa4: StrictMembers<OptA<number>> = bangOptA;
    const soa5: StrictMembers<OptA<number>> = strictA;
    const soa6: StrictMembers<OptA<number>> = strictOptA;
}

function unknownTypes<T>(
    a:          A<T>,
    optA:       OptA<T>,
    bangA:      A<T>!,
    bangOptA:   OptA<T>!,
    strictA:    StrictMembers<A<T>>,
    strictOptA: StrictMembers<OptA<T>>
) {
    const a1: A<T> = a;
    const a2: A<T> = optA;
    const a3: A<T> = bangA;
    const a4: A<T> = bangOptA;
    const a5: A<T> = strictA;
    const a6: A<T> = strictOptA;  // FIXME

    const oa1: OptA<T> = a;
    const oa2: OptA<T> = optA;
    const oa3: OptA<T> = bangA;
    const oa4: OptA<T> = bangOptA;
    const oa5: OptA<T> = strictA;
    const oa6: OptA<T> = strictOptA;

    const ba1: A<T>! = a;
    const ba2: A<T>! = optA;
    const ba3: A<T>! = bangA;
    const ba4: A<T>! = bangOptA;
    const ba5: A<T>! = strictA;
    const ba6: A<T>! = strictOptA;  // FIXME

    const boa1: OptA<T>! = a;
    const boa2: OptA<T>! = optA;
    const boa3: OptA<T>! = bangA;
    const boa4: OptA<T>! = bangOptA;
    const boa5: OptA<T>! = strictA;
    const boa6: OptA<T>! = strictOptA;

    const sa1: StrictMembers<A<T>> = a;
    const sa2: StrictMembers<A<T>> = optA;
    const sa3: StrictMembers<A<T>> = bangA;
    const sa4: StrictMembers<A<T>> = bangOptA;
    const sa5: StrictMembers<A<T>> = strictA;
    const sa6: StrictMembers<A<T>> = strictOptA;  // FIXME

    const soa1: StrictMembers<OptA<T>> = a;
    const soa2: StrictMembers<OptA<T>> = optA;
    const soa3: StrictMembers<OptA<T>> = bangA;
    const soa4: StrictMembers<OptA<T>> = bangOptA;
    const soa5: StrictMembers<OptA<T>> = strictA;
    const soa6: StrictMembers<OptA<T>> = strictOptA;
}

function extendsTypes<T extends number>(
    a:          A<T>,
    optA:       OptA<T>,
    bangA:      A<T>!,
    bangOptA:   OptA<T>!,
    strictA:    StrictMembers<A<T>>,
    strictOptA: StrictMembers<OptA<T>>
) {
    const a1: A<T> = a;
    const a2: A<T> = optA;
    const a3: A<T> = bangA;
    const a4: A<T> = bangOptA;
    const a5: A<T> = strictA;
    const a6: A<T> = strictOptA;  // FIXME

    const oa1: OptA<T> = a;
    const oa2: OptA<T> = optA;
    const oa3: OptA<T> = bangA;
    const oa4: OptA<T> = bangOptA;
    const oa5: OptA<T> = strictA;
    const oa6: OptA<T> = strictOptA;

    const ba1: A<T>! = a;
    const ba2: A<T>! = optA;
    const ba3: A<T>! = bangA;
    const ba4: A<T>! = bangOptA;
    const ba5: A<T>! = strictA;
    const ba6: A<T>! = strictOptA;  // FIXME

    const boa1: OptA<T>! = a;
    const boa2: OptA<T>! = optA;
    const boa3: OptA<T>! = bangA;
    const boa4: OptA<T>! = bangOptA;
    const boa5: OptA<T>! = strictA;
    const boa6: OptA<T>! = strictOptA;

    const sa1: StrictMembers<A<T>> = a;
    const sa2: StrictMembers<A<T>> = optA;
    const sa3: StrictMembers<A<T>> = bangA;
    const sa4: StrictMembers<A<T>> = bangOptA;
    const sa5: StrictMembers<A<T>> = strictA;
    const sa6: StrictMembers<A<T>> = strictOptA;  // FIXME

    const soa1: StrictMembers<OptA<T>> = a;
    const soa2: StrictMembers<OptA<T>> = optA;
    const soa3: StrictMembers<OptA<T>> = bangA;
    const soa4: StrictMembers<OptA<T>> = bangOptA;
    const soa5: StrictMembers<OptA<T>> = strictA;
    const soa6: StrictMembers<OptA<T>> = strictOptA;
}

function isNonNull<T>(x: T): x is T! {
    return x !== null;
}

function test<
    A extends number | null,
    B extends { x: string } | null,
    C extends { x: boolean | null } | null
>(a: A!, b: B!, c: C, cBang: C!) {
    const d: number = a;
    const e: { x: string } = b;
    const f: { x?: string } = b;
    const g: { x: number } = b;

    if (isNonNull(c)) {
        c;
        c.x;
        if (isNonNull(c.x)) {
            c.x;
        }
        if (c.x !== null) {
            c.x;
        }
    }

    if (isNonNull(cBang)) {
        cBang;
    }

    a = 3;
}

function f11<T>(x: A<T>!) {
    x.a;
}


//// [nonNull.js]
var a;
var b;
var c;
infer1(null);
infer2(null);
infer2(null);
var res2 = infer2(null);
infer3(null); // FIXME
infer3(null); // FIXME
var res3 = infer3(null);
infer4(5, null);
infer4(5, 5);
infer4(null, 5); // FIXME      // should be number
infer5(null);
infer5(undefined);
infer5(null);
infer5(null);
infer5(null);
infer5(null);
infer5(null);
infer5(null);
infer6({ x: 1, y: 2 }); // FIXME
infer6({ x: 1, y: 'string' }); // FIXME
function assignability(x, y) {
    var a = y;
    var b = x;
    var c = y;
}
function assignability2(x, y) {
    var a = y;
    var b = x;
    var c = y;
    var d = x;
    var e = y;
}
function mappedAssignability(x, y, z) {
    var a = y;
    var b = z; // FIXME
    var c = y;
    var d = z; // FIXME
    var e = x;
    var f = y;
    var g = z;
    var h = x;
    var i = y;
    var j = z;
    var k = x;
    var l = y;
    var m = z;
    var n = x;
    var o = y;
    var p = z;
    var q = x;
    var r = y;
    var s = z;
    var u = x; // FIXME
    var v = y;
    var w = z;
}
function comparability(x, y, z, w) {
    x === y;
    x === z;
    x === w; // FIXME
    y === y;
    y === z; // FIXME
    y === w; // FIXME
    z === z;
    z === w;
    w === w;
}
function flags(x, y) {
    if (x === y) {
        // should be A!
        x; // FIXME
    }
}
function signatures(f1, f2, f3, f4, f5, f6, f7, f8) {
    var g12 = f2; // FIXME
    var g21 = f1; // FIXME
    var g34 = f4; // FIXME
    var g37 = f7; // FIXME
    var g38 = f8; // FIXME
    var g41 = f1; // FIXME
    var g42 = f2; // FIXME
    var g43 = f3; // FIXME
    var g47 = f7;
    var g48 = f8; // FIXME
    var g51 = f1;
    var g52 = f2;
    var g53 = f3;
    var g54 = f4;
    var g56 = f6;
    var g57 = f7;
    var g58 = f8;
    var g61 = f1; // FIXME
    var g62 = f2;
    var g63 = f3; // FIXME
    var g64 = f4;
    var g65 = f5; // FIXME
    var g67 = f7; // FIXME
    var g68 = f8;
    var g71 = f1; // FIXME
    var g72 = f2;
    var g73 = f3;
    var g74 = f4;
    var g75 = f5;
    var g76 = f6;
    var g78 = f8; // FIXME
    var g81 = f1; // FIXME
    var g82 = f2;
    var g83 = f3;
    var g84 = f4;
    var g85 = f5;
    var g86 = f6;
    var g87 = f7; // FIXME
}
function knownTypes(a, optA, bangA, bangOptA, strictA, strictOptA) {
    var a1 = a;
    var a2 = optA;
    var a3 = bangA;
    var a4 = bangOptA;
    var a5 = strictA;
    var a6 = strictOptA;
    var oa1 = a;
    var oa2 = optA;
    var oa3 = bangA;
    var oa4 = bangOptA;
    var oa5 = strictA;
    var oa6 = strictOptA;
    var ba1 = a;
    var ba2 = optA;
    var ba3 = bangA;
    var ba4 = bangOptA;
    var ba5 = strictA;
    var ba6 = strictOptA;
    var boa1 = a;
    var boa2 = optA;
    var boa3 = bangA;
    var boa4 = bangOptA;
    var boa5 = strictA;
    var boa6 = strictOptA;
    var sa1 = a;
    var sa2 = optA;
    var sa3 = bangA;
    var sa4 = bangOptA;
    var sa5 = strictA;
    var sa6 = strictOptA;
    var soa1 = a;
    var soa2 = optA;
    var soa3 = bangA;
    var soa4 = bangOptA;
    var soa5 = strictA;
    var soa6 = strictOptA;
}
function unknownTypes(a, optA, bangA, bangOptA, strictA, strictOptA) {
    var a1 = a;
    var a2 = optA;
    var a3 = bangA;
    var a4 = bangOptA;
    var a5 = strictA;
    var a6 = strictOptA; // FIXME
    var oa1 = a;
    var oa2 = optA;
    var oa3 = bangA;
    var oa4 = bangOptA;
    var oa5 = strictA;
    var oa6 = strictOptA;
    var ba1 = a;
    var ba2 = optA;
    var ba3 = bangA;
    var ba4 = bangOptA;
    var ba5 = strictA;
    var ba6 = strictOptA; // FIXME
    var boa1 = a;
    var boa2 = optA;
    var boa3 = bangA;
    var boa4 = bangOptA;
    var boa5 = strictA;
    var boa6 = strictOptA;
    var sa1 = a;
    var sa2 = optA;
    var sa3 = bangA;
    var sa4 = bangOptA;
    var sa5 = strictA;
    var sa6 = strictOptA; // FIXME
    var soa1 = a;
    var soa2 = optA;
    var soa3 = bangA;
    var soa4 = bangOptA;
    var soa5 = strictA;
    var soa6 = strictOptA;
}
function extendsTypes(a, optA, bangA, bangOptA, strictA, strictOptA) {
    var a1 = a;
    var a2 = optA;
    var a3 = bangA;
    var a4 = bangOptA;
    var a5 = strictA;
    var a6 = strictOptA; // FIXME
    var oa1 = a;
    var oa2 = optA;
    var oa3 = bangA;
    var oa4 = bangOptA;
    var oa5 = strictA;
    var oa6 = strictOptA;
    var ba1 = a;
    var ba2 = optA;
    var ba3 = bangA;
    var ba4 = bangOptA;
    var ba5 = strictA;
    var ba6 = strictOptA; // FIXME
    var boa1 = a;
    var boa2 = optA;
    var boa3 = bangA;
    var boa4 = bangOptA;
    var boa5 = strictA;
    var boa6 = strictOptA;
    var sa1 = a;
    var sa2 = optA;
    var sa3 = bangA;
    var sa4 = bangOptA;
    var sa5 = strictA;
    var sa6 = strictOptA; // FIXME
    var soa1 = a;
    var soa2 = optA;
    var soa3 = bangA;
    var soa4 = bangOptA;
    var soa5 = strictA;
    var soa6 = strictOptA;
}
function isNonNull(x) {
    return x !== null;
}
function test(a, b, c, cBang) {
    var d = a;
    var e = b;
    var f = b;
    var g = b;
    if (isNonNull(c)) {
        c;
        c.x;
        if (isNonNull(c.x)) {
            c.x;
        }
        if (c.x !== null) {
            c.x;
        }
    }
    if (isNonNull(cBang)) {
        cBang;
    }
    a = 3;
}
function f11(x) {
    x.a;
}


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
declare type Error1<T, K extends keyof T!> = T[K];
declare type StupidButOK<T> = {
    [K in keyof T]: T![K];
};
declare type StupidButOK2<T> = {
    [K in keyof T]: T![K!];
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
declare let a: string | undefined | null | never;
declare let b: typeof a!;
declare type Assert<T> = T!;
declare let c: Assert<typeof a>;
declare function infer1<T>(x: T): T!;
declare function infer2<T>(x: {
    a: T;
}): T!;
declare const res2: number | undefined;
declare function infer3<T>(x: {
    a: T!;
}): T;
declare const res3: number | undefined;
declare function infer4<T>(x: T, y: T!): void;
declare function infer5<T>(x: T!): T;
declare function infer6<T>(x: Record<'x' | 'y', T!>): void;
declare function assignability<T>(x: T, y: T!): void;
declare function assignability2<T extends number | null>(x: T, y: T!): void;
declare type IdMapped<T> = {
    [K in keyof T]: T[K];
};
declare function mappedAssignability<T>(x: T, y: StrictMembers<T>, z: StrictMembers<T!>): void;
declare function comparability<T>(x: T, y: T!, z: StrictMembers<T>, w: StrictMembers<T!>): void;
declare function flags<A, B>(x: A | B | undefined, y: A!): void;
declare function signatures(f1: <T>() => T, f2: <T>() => T!, f3: <T>() => IdMapped<T>, f4: <T>() => IdMapped<T!>, f5: <T>() => Partial<T>, f6: <T>() => Partial<T!>, f7: <T>() => StrictMembers<T>, f8: <T>() => StrictMembers<T!>): void;
declare type A<T> = {
    a: T;
};
declare type OptA<T> = {
    a: T | null;
};
declare function knownTypes(a: A<number>, optA: OptA<number>, bangA: A<number>!, bangOptA: OptA<number>!, strictA: StrictMembers<A<number>>, strictOptA: StrictMembers<OptA<number>>): void;
declare function unknownTypes<T>(a: A<T>, optA: OptA<T>, bangA: A<T>!, bangOptA: OptA<T>!, strictA: StrictMembers<A<T>>, strictOptA: StrictMembers<OptA<T>>): void;
declare function extendsTypes<T extends number>(a: A<T>, optA: OptA<T>, bangA: A<T>!, bangOptA: OptA<T>!, strictA: StrictMembers<A<T>>, strictOptA: StrictMembers<OptA<T>>): void;
declare function isNonNull<T>(x: T): x is T!;
declare function test<A extends number | null, B extends {
    x: string;
} | null, C extends {
    x: boolean | null;
} | null>(a: A!, b: B!, c: C, cBang: C!): void;
declare function f11<T>(x: A<T>!): void;
