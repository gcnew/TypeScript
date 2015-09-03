/// <reference path="bar.ts" />
/// <reference no-emit path="baz.ts" />

namespace Test {
	export class Foo {
		public x: Bar;
		public y: Baz;
		constructor() {
			this.x = new Bar();
			this.y = new Baz();
		}
	}
}