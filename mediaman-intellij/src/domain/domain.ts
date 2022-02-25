import {Checker, Generator} from "../common/utils";

export enum Genre {
    Horror = 'Horror',
    SiFi = 'Si-Fi',
    Fantasy = 'Fantasy',
    Fiction = 'Fiction',
    Romance = 'Romance',
    Thrille = 'Thriller'
}

export abstract class Media {
    private readonly _identifier: string;

    protected constructor(
        private _name: string,
        private _description: string,
        private _pictureLocation: string,
        private _genre: Genre,
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

    get pictureLocation(): string {
        return this._pictureLocation;
    }

    set pictureLocation(value: string) {
        this._pictureLocation = value;
    }

    get genre(): Genre {
        return this._genre;
    }

    set genre(value: Genre) {
        this._genre = value;
    }

    get identifier(): string { return this._identifier; }
}

export class Book extends Media {
    constructor(
        name: string,
        description: string,
        genre: Genre,
        pictureLocation: string,
        private _author: string,
        private _totalPage: number,
        identifier?: string
    ) {
        super(name, description, pictureLocation, genre, identifier);
    }

    get author(): string {
        return this._author;
    }

    set author(value: string) {
        this._author = value;
    }

    get totalPage(): number {
        return this._totalPage;
    }

    set totalPage(value: number) {
        this._totalPage = value;
    }
}

export class Movie extends Media {
    constructor(
        name: string,
        description: string,
        pictureLocation: string,
        genre: Genre,
        private _director: string,
        private _runningTime: number,
        identifier?: string
    ) {
        super(name, description, pictureLocation, genre, identifier);
    }

    get director(): string {
        return this._director;
    }

    set director(value: string) {
        this._director = value;
    }

    get runningTime(): number {
        return this._runningTime;
    }

    set runningTime(value: number) {
        this._runningTime = value;
    }
}

export class MediaCollection<T extends Media> {
    private readonly _identifier: string;
    private _collection: ReadonlyArray<T> = [];

    constructor(
        private _type: Function,
        private _name: string,
        identifier?: string
    ) {
        Checker.param(_name, 'name');
        this._identifier = (identifier) ? identifier : Generator.newId();
    }

    get identifier(): string {
        return this._identifier;
    }

    get collection(): ReadonlyArray<T> {
        return this._collection;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    add(media: T): void {
        this._collection = this._collection.concat(media);
    }

    remove(media: T): void {
        this._collection = this._collection.filter(
            item => item.identifier !== media.identifier
        );
    }
}