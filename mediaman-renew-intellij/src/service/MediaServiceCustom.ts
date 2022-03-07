import LocalForage from "localforage";
import {MediaCollection} from "../domain/MediaCollection";
import {Media} from "../domain/Media";
import {instanceToPlain, plainToClassFromExist, plainToInstance} from "class-transformer";
import 'reflect-metadata';
import {MediaService} from "./service";

export class MediaServiceCustom<T extends Media> implements MediaService<T> {
	private readonly _mediaType: Function;
	private _storage: LocalForage;

	constructor(mediaType: Function) {
		this._mediaType = mediaType;
		this._storage = LocalForage.createInstance({
			name: 'mediaCollections',
			storeName: 'Media Collection Storage'
		});
	}

	public saveMediaCollection(mediaCollection: MediaCollection<T>): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			const serialized = instanceToPlain(mediaCollection, {
				excludePrefixes: ['_']
			});
			this._storage
				.setItem(mediaCollection.identifier, serialized)
				.then(value => {
					console.log(`Media Collection saved as value of this: ${ value }`);
					resolve();
				})
				.catch(error => {
					reject(error);
				});
		});
	}

	public loadMediaCollection(identifier: string): Promise<MediaCollection<T>> {
		return new Promise<MediaCollection<T>>((resolve, reject) => {
			this._storage
				.getItem(identifier)
				.then(value => {
					const mediaCollection: MediaCollection<T> = plainToClassFromExist<MediaCollection<T>, any>(
						new MediaCollection<T>(this._mediaType, 'a'), value
					);
					resolve(mediaCollection);
				})
				.catch(error => {
					reject(error);
				});
		});
	}

	public getCollections(): Promise<MediaCollection<T>[]> {
		const collections: MediaCollection<T>[] = [];
		const storage = this._storage;
		return new Promise<MediaCollection<T>[]>((resolve, reject) => {
			storage.keys(keys => {
				debugger;
				console.log(keys);
				// keys.forEach(async key => {
				// 	await this.loadMediaCollection(key)
				// 		.then(collection => {
				// 			collections.push(collection);
				// 		});
				// });
			});
		});
	}

	public getIdentifiers(): Promise<string[]> {
		return new Promise<string[]>((resolve, reject) => {
			this._storage.keys(keys => {
				console.log(keys);
				resolve(keys);
			})
		})
	}

	getMediaCollectionIdentifiersList(): Promise<string[]> {
		return Promise.resolve([]);
	}

	removeMediaCollection(identifier: string): Promise<void> {
		return Promise.resolve(undefined);
	}


}