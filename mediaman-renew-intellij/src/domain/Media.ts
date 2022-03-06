import {Generator} from "../cmm/utils";

export enum Genre {
	Horror = 'Horror',
	SiFi = 'Si-Fi',
	Fantasy = 'Fantasy',
	Fiction = 'Fiction',
	Romance = 'Romance',
	Comedy = 'Comedy',
	Thriller = 'Thriller'
}

export class Media {
	protected _identifier: string;

	constructor(
		protected _name: string,
		protected _description: string,
		protected _genre: Genre,
		protected _pictureLocation: string,
		identifier?: string
	) {
		this._identifier = (identifier) ? identifier : Generator.newId();
	}


	get name(): string {
		return this._name;
	}

	set name(value: string) {
		this._name = value;
	}

	get description(): string {
		return this._description;
	}

	set description(value: string) {
		this._description = value;
	}

	get genre(): Genre {
		return this._genre;
	}

	set genre(value: Genre) {
		this._genre = value;
	}

	get identifier(): string {
		return this._identifier;
	}

	set identifier(value: string) {
		this._identifier = value;
	}
}

export class Book extends Media {
	constructor(
		name: string,
		description: string,
		genre: Genre,
		pictureLocation: string,
		protected _author: string,
		protected _pages: number,
		identifier?: string
	) {
		super(name, description, genre, pictureLocation, identifier);
	}


	get author(): string {
		return this._author;
	}

	set author(value: string) {
		this._author = value;
	}

	get pages(): number {
		return this._pages;
	}

	set pages(value: number) {
		this._pages = value;
	}
}

export class Movie extends Media {
	constructor(
		name: string,
		description: string,
		genre: Genre,
		pictureLocation: string,
		private _director: string,
		private _length: number,
		identifier?: string
	) {
		super(name, description, genre, pictureLocation, identifier);
	}

	get director(): string {
		return this._director;
	}

	set director(value: string) {
		this._director = value;
	}

	get length(): number {
		return this._length;
	}

	set length(value: number) {
		this._length = value;
	}
}