export class Foo {
    constructor() {
		this.doThing();
	}
	doThing(): number {
		return 2;
	}
}

export class Bar extends Foo {
	doThing(): number {
		return 4;
	}
}

export * from "./submodule";