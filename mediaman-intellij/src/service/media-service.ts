import {MediaService} from "./media-service.intf";
import {Media, MediaCollection} from "../domain/domain";
import * as localForage from 'localforage';
import {Checker} from "../common/utils";

export class MediaServiceImpl implements MediaService {
	private _mediaCollections: ReadonlyArray<MediaCollection<Media>>;

	constructor() {
		this._mediaCollections = [];
	}

	addCollection(collection: MediaCollection<Media>): void {
		this._mediaCollections = this._mediaCollections.concat(collection);
		localForage.setItem(collection.identifier, collection);
	}

	addMedia(collectionIdentifier: string, media: Media): void {
		Checker.param(collectionIdentifier, 'collection identifier');
		localForage.getItem(collectionIdentifier)
			.then((value) => {
				const mediaCollection: MediaCollection<Media> = value as MediaCollection<Media>;
				mediaCollection.add(media);
			}).catch(error => {
				console.error([
					'error occured while finding collection of ',
					collectionIdentifier,
					'. error: [', error, ']'
				].join(''));
			});
	}

	getMediaCollections(): ReadonlyArray<MediaCollection<Media>> {
		return this._mediaCollections;
	}

	removeCollection(collection: MediaCollection<Media>): void {
		this._mediaCollections = this._mediaCollections.filter(
			mediaCollection => mediaCollection.identifier !== collection.identifier
		);
	}

	removeMedia(collectionIdentifier: string, media: Media): void {
		Checker.param(collectionIdentifier, 'collection identifier');
		localForage.getItem(collectionIdentifier).then(value => {
			const mediaCollection: MediaCollection<Media> = value as MediaCollection<Media>;
			mediaCollection.remove(media);
		}).catch(error => {
			console.error([
				'error occured while finding collection of ',
				collectionIdentifier,
				'. error: [', error, ']'
			].join(''));
		});
	}

}