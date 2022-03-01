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
console.log('asdf');



console.log(Object.keys(Genre));

Object.keys(Genre).forEach(key => {
	console.log(Genre[key as keyof typeof Genre]);
});



function identity<T>(arg: T) {
	return arg;
}

let myIdentity: <T>(arg:T) => T = identity;

console.log(myIdentity<string>('a'));

let fn = <T extends Media>(_type: T) => {
	console.log(_type. == Media);
}

fn(Media);