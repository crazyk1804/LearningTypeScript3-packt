import { classToPlain, plainToClassFromExist, Expose, Type } from 'class-transformer';

export enum Genre {
    Horror = 'Horror',
    Fantastic = 'Fantastic',
    Thriller = 'Thriller',
    Romance = 'Romance',
    Fiction = 'Fiction'
}

export abstract class Media {
    private _identifier: string;

    protected constructor(
        private _name: string,
        private _description: string,
        private _pictureLocation: string,
        private _genre: Genre,
        identifier?: string
    ) {
        this._identifier = (identifier) ? 
            identifier : 
            Math.random().toString(36).substr(2, 9);
    }

    get identifier(): string {
        return this._identifier;
    }

    set identifier(identifier: string) {
        this._identifier = identifier;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    get pictureLocation(): string {
        return this._pictureLocation;
    }

    set pictureLocation(pictureLocation: string) {
        this._pictureLocation = pictureLocation;
    }

    get genre(): Genre {
        return this._genre;
    }

    set genre(genre: Genre) {
        this._genre = genre;
    }
}

export class Book extends Media {
    private _duration: string;
    private _director: string;

    constructor(
        name: string,
        description: string,
        pictureLocation: string,
        genre: Genre,
        duration: string,
        director: string,
        identifier?: string
    ) {
        super(name, description, pictureLocation, genre, identifier);
        this._duration = duration;
        this._director = director;
    }

    get director(): string {
        return this._director;
    }

    set director(director: string) {
        this._director = director;
    }

    get duration(): string {
        return this._duration;
    }

    set duration(duration: string) {
        this._duration = duration;
    }
}

export class MediaCollection<T extends Media> {
    private _identifier: string;
    private _name: string = '';
    private _collection: ReadonlyArray<T> = [];
    private readonly _type: Function;

    constructor (
        type: Function,
        name?: string,
        identifier?: string
    ) {
        this._type = type;
        if(name) this._name = name;
        this._identifier = (identifier) ?
            identifier :
            Math.random().toString(36).substr(2, 9);
    }

    @Expose()
    get identifier(): string {
        return this._identifier;
    }
    set identifier(identifier: string) {
        this._identifier = identifier;
    }

    @Expose()
    get name(): string {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }

    @Expose()
    @Type(options => { 
        console.log(options);
        if(options) {
            return (options.newObject as MediaCollection<T>)._type;
        } else {
            throw new Error(
                'Cannot determine the type because the options object is null or undefined'
            );
        }
    })
    get collection(): ReadonlyArray<T> {
        return this._collection;
    }
    set collection(collection: ReadonlyArray<T>) {
        this._collection = collection;
    }

    addMedia(media: Readonly<T>): void {
        if(!media) return;
        this._collection = this._collection.concat(media);
    }

    removeMedia(itemId: string) {
        if(!itemId) return;
        this._collection = this._collection.filter(item => {
            return item.identifier !== itemId;
        });
    }
}