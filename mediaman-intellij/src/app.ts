import {Book, Genre, Media} from "./domain/domain";

console.log('app starts...');

interface NewType {
	name: string,
	age: number
}

let newType = {
	name: 'ck', age: 4
}

class GClass<T extends Media> {
	private _prop: string = null as unknown as string;

	get prop(): string { return this._prop; }
	set prop(prop: string) { this._prop = prop; }
}

let gc = new GClass<Book>();
console.log(GClass === GClass);

console.log(GClass.)