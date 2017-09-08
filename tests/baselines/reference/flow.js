//// [flow.ts]
function isNonNull<T>(x: T): x is T! {
    return x !== null;
}

function test<
    C extends { x: boolean | null } | null
>(c: C, cBang: C!) {
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
}

function f11<T>(x: { a: T }!) {
    x.a;
}

function flags<A, B>(x: A|B|undefined, y: A!) {
    if (x === y) {
        x;  // FIXME: should be A!
    } else {
        x;  // FIXME: should be B | undefined
    }
}


//// [flow.js]
function isNonNull(x) {
    return x !== null;
}
function test(c, cBang) {
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
}
function f11(x) {
    x.a;
}
function flags(x, y) {
    if (x === y) {
        x; // FIXME: should be A!
    }
    else {
        x; // FIXME: should be B | undefined
    }
}
