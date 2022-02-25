import {Media, MediaCollection} from "../domain/domain";

export interface MediaService {
	addCollection(collection: MediaCollection<Media>): void;
	removeCollection(collection: MediaCollection<Media>): void;
	addMedia(collectionIdentifier: string, media: Media): void;
	removeMedia(collectionIdentifier: string, media: Media): void;
	getMediaCollections(): ReadonlyArray<MediaCollection<Media>>;
}