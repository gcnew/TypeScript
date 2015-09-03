import {Foo, Bar, Baz} from "./test_module";

export class Test extends Baz {
	public foo: Foo;
	public bar: Bar;
	constructor() {
		super();
		this.bar = new Bar();
		this.foo = new Foo();
	}
}