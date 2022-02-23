"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
var Genre;
(function (Genre) {
    Genre["Horror"] = "Horror";
    Genre["Fantastic"] = "Fantastic";
    Genre["Thriller"] = "Thriller";
    Genre["Romance"] = "Romance";
    Genre["Fiction"] = "Fiction";
})(Genre = exports.Genre || (exports.Genre = {}));
class Media {
    constructor(_name, _description, _pictureLocation, _genre, identifier) {
        this._name = _name;
        this._description = _description;
        this._pictureLocation = _pictureLocation;
        this._genre = _genre;
        this._identifier = (identifier) ?
            identifier :
            Math.random().toString(36).substr(2, 9);
    }
    get identifier() {
        return this._identifier;
    }
    set identifier(identifier) {
        this._identifier = identifier;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get description() {
        return this._description;
    }
    set description(description) {
        this._description = description;
    }
    get pictureLocation() {
        return this._pictureLocation;
    }
    set pictureLocation(pictureLocation) {
        this._pictureLocation = pictureLocation;
    }
    get genre() {
        return this._genre;
    }
    set genre(genre) {
        this._genre = genre;
    }
}
__decorate([
    class_transformer_1.Expose()
], Media.prototype, "identifier", null);
__decorate([
    class_transformer_1.Expose()
], Media.prototype, "name", null);
__decorate([
    class_transformer_1.Expose()
], Media.prototype, "description", null);
__decorate([
    class_transformer_1.Expose()
], Media.prototype, "pictureLocation", null);
__decorate([
    class_transformer_1.Expose()
], Media.prototype, "genre", null);
exports.Media = Media;
class Book extends Media {
    constructor(name, description, pictureLocation, genre, author, numberOfPages, identifier) {
        super(name, description, pictureLocation, genre, identifier);
        this._author = author;
        this._numberOfPages = numberOfPages;
    }
    get author() {
        return this._author;
    }
    set author(author) {
        this._author = author;
    }
    get numberOfPages() {
        return this._numberOfPages;
    }
    set numberOfPages(numberOfPages) {
        this._numberOfPages = numberOfPages;
    }
}
__decorate([
    class_transformer_1.Expose()
], Book.prototype, "author", null);
__decorate([
    class_transformer_1.Expose()
], Book.prototype, "numberOfPages", null);
exports.Book = Book;
class Movie extends Media {
    constructor(name, description, pictureLocation, genre, duration, director, identifier) {
        super(name, description, pictureLocation, genre, identifier);
        this._duration = duration;
        this._director = director;
    }
    get duration() {
        return this._duration;
    }
    set duration(duration) {
        this._duration = duration;
    }
    get director() {
        return this._director;
    }
    set director(director) {
        this._director = director;
    }
}
__decorate([
    class_transformer_1.Expose()
], Movie.prototype, "duration", null);
__decorate([
    class_transformer_1.Expose()
], Movie.prototype, "director", null);
exports.Movie = Movie;
class MediaCollection {
    constructor(type, name, identifier) {
        this._name = '';
        this._collection = [];
        this._type = type;
        if (name)
            this._name = name;
        this._identifier = (identifier) ?
            identifier :
            Math.random().toString(36).substr(2, 9);
    }
    get identifier() {
        return this._identifier;
    }
    set identifier(identifier) {
        this._identifier = identifier;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get collection() {
        return this._collection;
    }
    set collection(collection) {
        this._collection = collection;
    }
    addMedia(media) {
        if (!media)
            return;
        this._collection = this._collection.concat(media);
    }
    removeMedia(itemId) {
        if (!itemId)
            return;
        this._collection = this._collection.filter(item => {
            return item.identifier !== itemId;
        });
    }
}
__decorate([
    class_transformer_1.Expose()
], MediaCollection.prototype, "identifier", null);
__decorate([
    class_transformer_1.Expose()
], MediaCollection.prototype, "name", null);
__decorate([
    class_transformer_1.Expose(),
    class_transformer_1.Type(options => {
        debugger;
        console.log(options);
        if (options) {
            return options.newObject._type;
        }
        else {
            throw new Error('Cannot determine the type because the options object is null or undefined');
        }
    })
], MediaCollection.prototype, "collection", null);
exports.MediaCollection = MediaCollection;
