import {Foo} from "./notindex"

export class Baz extends Foo {
	doThing(): number {
		return 3;
	}
}