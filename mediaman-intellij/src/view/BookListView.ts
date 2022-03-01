import {Book, Media} from "../domain/domain";
import {MediaListView} from "./MediaListView";

export class BookListView extends MediaListView {
	constructor(collectionIdentifier: string) {
		super(collectionIdentifier);
	}

	protected getCustomFields(): string {
		return '<td>Author</td><td>Pages</td>';
	}

	protected getMediaSpecificValues(media: Media): string {
		const book = media as Book;
		return `<td>${book.author}</td><td>${book.totalPage}</td>`;
	}
}