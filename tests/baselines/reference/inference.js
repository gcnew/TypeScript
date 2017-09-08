//// [inference.ts]
declare function infer1<T>(x: T): T!;
infer1(null! as (number | undefined));

declare function infer2<T>(x: { a: T }): T!;
infer2(null! as { a: number | null });
infer2(null! as { a: null });
const res2: number|undefined = infer2(null! as { a: number });

declare function infer3<T>(x: { a: T! }): T;
infer3(null! as { a: number });
infer3(null! as { a: null });
const res3: number|undefined = infer3(null! as { a: number });

declare function infer4<T>(x: T, y: T!): void;
infer4(5, null);
infer4(5 as (number|null), 5);
infer4(null, 5);

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


//// [inference.js]
infer1(null);
infer2(null);
infer2(null);
var res2 = infer2(null);
infer3(null);
infer3(null);
var res3 = infer3(null);
infer4(5, null);
infer4(5, 5);
infer4(null, 5);
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
