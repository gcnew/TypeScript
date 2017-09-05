// @strictNullChecks: true
// @noimplicitany: true
// @declaration: true

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

type A    = { a: number }
type OptA = { a: number | null }

function knownTypes(a: A, optA: OptA, bangA: A!, bangOptA: OptA!, strictA: StrictMembers<A>, strictOptA: StrictMembers<OptA>) {
    const a1: A = a;
    const a2: A = optA;
    const a3: A = bangA;
    const a4: A = bangOptA;
    const a5: A = strictA;
    const a6: A = strictOptA;

    const oa1: OptA = a;
    const oa2: OptA = optA;
    const oa3: OptA = bangA;
    const oa4: OptA = bangOptA;
    const oa5: OptA = strictA;
    const oa6: OptA = strictOptA;

    const ba1: A! = a;
    const ba2: A! = optA;
    const ba3: A! = bangA;
    const ba4: A! = bangOptA;
    const ba5: A! = strictA;
    const ba6: A! = strictOptA;

    const boa1: OptA! = a;
    const boa2: OptA! = optA;
    const boa3: OptA! = bangA;
    const boa4: OptA! = bangOptA;
    const boa5: OptA! = strictA;
    const boa6: OptA! = strictOptA;

    const sa1: StrictMembers<A> = a;
    const sa2: StrictMembers<A> = optA;
    const sa3: StrictMembers<A> = bangA;
    const sa4: StrictMembers<A> = bangOptA;
    const sa5: StrictMembers<A> = strictA;
    const sa6: StrictMembers<A> = strictOptA;

    const soa1: StrictMembers<OptA> = a;
    const soa2: StrictMembers<OptA> = optA;
    const soa3: StrictMembers<OptA> = bangA;
    const soa4: StrictMembers<OptA> = bangOptA;
    const soa5: StrictMembers<OptA> = strictA;
    const soa6: StrictMembers<OptA> = strictOptA;
}
