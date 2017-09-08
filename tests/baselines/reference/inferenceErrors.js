//// [inferenceErrors.ts]
declare function infer3<T>(x: { a: T! }): T;
infer3(null! as { a: null });


declare function infer4<T>(x: T, y: T!): void;
infer4(5, null);

declare function infer5<T>(x: T!): T;
infer5(null);
infer5(undefined);
infer5<null>(null);
infer5<undefined>(null);
infer5<never>(null);

declare function infer6<T>(x: Record<'x'|'y', T!>): void;
infer6({ x: 1, y: 'string' });


//// [inferenceErrors.js]
infer3(null);
infer4(5, null);
infer5(null);
infer5(undefined);
infer5(null);
infer5(null);
infer5(null);
infer6({ x: 1, y: 'string' });
