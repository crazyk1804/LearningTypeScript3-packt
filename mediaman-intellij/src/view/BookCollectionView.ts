import {MediaCollectionView} from "./MediaCollectionView";
import {Book, MediaCollection} from "../domain/domain";
import {MediaFormView} from "./MediaFormView";
import {MediaListView} from "./MediaListView";
import {BookFormView} from "./BookFormView";
import {BookListView} from "./BookListView";

export class BookCollectionView extends MediaCollectionView<Book> {
	constructor(private readonly mediaCollection: MediaCollection<Book>) {
		super(mediaCollection);
	}

	createFormView(): MediaFormView<Book> {
		return new BookFormView(this._mediaCollection);
	}

	createListView(): MediaListView {
		return new BookListView(this._mediaCollection.identifier)
	}
}