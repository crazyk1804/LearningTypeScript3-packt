"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const localforage_1 = __importDefault(require("localforage"));
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
class MediaServiceImpl {
    constructor(_type) {
        this._type = _type;
        console.log(`initializing media service for ${_type.name}`);
        // each instance of the media service has its own data store:
        // https://github.com/localForage/localForage
        // the initialization options are described here:
        // https://localforage.github.io/localForage/#settings-api-config
        this._store = localforage_1.default.createInstance({
            name: 'mediaMan',
            version: 1.0,
            storeName: `media-man-${_type.name}`,
            description: 'MediaMan data store'
        });
    }
    loadMediaCollection(identifier) {
        console.log(`Trying to load media collection with the following identifier: ${identifier}`);
        return new Promise((resolve, reject) => {
            this._store.getItem(identifier)
                .then(value => {
                console.log('Found the collection: ', value);
                debugger;
                const retrievedCollection = class_transformer_1.plainToClassFromExist(new model_1.MediaCollection(this._type), value);
                resolve(retrievedCollection);
            })
                .catch(err => {
                reject(err); // let the error through
            });
        });
    }
    saveMediaCollection(collection) {
        return new Promise((resolve, reject) => {
            if (!collection) {
                reject(new Error('The list cannot be  null of undefined!'));
            }
            console.log(`Saving media collection with the following name ${collection.name}`);
            const serializedVersion = class_transformer_1.instanceToPlain(collection, {
                excludePrefixes: ['_']
            });
            console.log('Serialized version: ', serializedVersion);
            this._store.setItem(collection.identifier, serializedVersion)
                .then(value => {
                console.log(`Saved the ${collection.name} collection successfully! Saved value: ${value}`);
                resolve();
            })
                .catch(err => {
                console.error(`Failed to save the ${collection.name} collection with identifier ${collection.identifier}. Error: ${err}`);
                reject(err);
            });
        });
    }
    getMediaCollectionIdentifiersList() {
        return new Promise((resolve, reject) => {
            console.log('Retrieving the list of media collection identifiers');
            this._store.keys()
                .then(keys => {
                console.log(`Retrieved the of media collection identifiers: ${keys}`);
                resolve(keys);
            })
                .catch(err => {
                console.error(`Failed to retrieve the list of media collection identifiers. Error: ${err}`);
                reject(err);
            });
        });
    }
    removeMediaCollection(identifier) {
        return new Promise((resolve, reject) => {
            if (!identifier || '' === identifier.trim()) {
                reject(new Error('The identifier must be provided!'));
            }
            console.log(`Removing media collection with the following identifier ${identifier}`);
            this._store.removeItem(identifier)
                .then(() => {
                console.log(`Removed the ${identifier} collection successfully`);
                resolve();
            })
                .catch(err => {
                console.error(`Failed to removed the ${identifier} collection`);
                reject(err);
            });
        });
    }
}
exports.MediaServiceImpl = MediaServiceImpl;
