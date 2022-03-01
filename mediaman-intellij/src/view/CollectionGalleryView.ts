import {MediaCollectionView} from "./MediaCollectionView";
import {Book, Media, MediaCollection, Movie} from "../domain/domain";
import {BookCollectionView} from "./BookCollectionView";
import {MovieCollectionView} from "./MovieCollectionView";

export class CollectionGalleryView {
	private _element = document.createElement('div');
	private _bookCollections: MediaCollectionView<Book>[] = [];
	private _movieCollections: MediaCollectionView<Movie>[] = [];

	constructor() {
		this._element.id = '';
	}

	addMediaCollection(_type: Function, mediaCollection: MediaCollection<Media>) {
		if(_type === BookCollectionView)
			this._bookCollections.push(new BookCollectionView(mediaCollection as MediaCollection<Book>));
		else
			this._movieCollections.push(new MovieCollectionView(mediaCollection as MediaCollection<Movie>));
	}
}
