import { Generator } from "../cmm/utils";
import {Media} from "./Media";

export class MediaCollection<T extends Media> {
	private _identifier: string;
	private _collection: ReadonlyArray<T>;

	constructor(
		private _type: Function,
		private _name: string,
		identifier?: string
	) {
		this._collection = [];
		this._identifier = (identifier) ? identifier : Generator.newId();
	}

	get type(): Function {
		return this._type;
	}

	set type(value: Function) {
		this._type = value;
	}

	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get collection(): T[] {
		return this._collection.concat() as T[];
	}

	get identifier(): string {
		return this._identifier;
	}

	set identifier(value: string) {
		this._identifier = value;
	}

	addMedia(media: T): void {
		this._collection = this._collection.concat(media);
	}

	removeMedia(media: T): void {
		this._collection = this._collection.filter(exists => exists.identifier !== media.identifier);
	}
}