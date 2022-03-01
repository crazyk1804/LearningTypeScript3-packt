import {Book, Genre, MediaCollection} from "../domain/domain";
import {Checker, Viewty} from "../common/utils";
import {MediaFormView} from "./MediaFormView";

export class BookFormView extends MediaFormView<Book> {
	constructor(readonly mediaCollection: MediaCollection<Book>) {
		super(mediaCollection);

		Viewty.appendNext(`tboxName-${mediaCollection.identifier}`, Viewty.dom([
			`<input id="tboxAuthor-${ mediaCollection.identifier }"`,
			'name="author" type="text" placeholder="Author" required>'].join('')));

		Viewty.appendNext(`cboxGenre-${mediaCollection.identifier}`, Viewty.dom([
			`<input id="nboxPages-${ mediaCollection.identifier }`,
			'name="pages" type="number" required>'].join('')));
	}

	getMedia(): Book {
		const identifier = this.mediaCollection.identifier;
		const frm = document.getElementById(`mediaForm-${identifier}`) as HTMLFormElement;
		Checker.element(frm, `mediaForm-${identifier}`);

		const genre = Checker.elementValue(`cboxGenre-${identifier}`, 'Book Genre');
		const pages = Checker.elementValue(`nboxPages-${identifier}`, 'Total Pages')
		let book = new Book(
			Checker.elementValue(`tboxName-${identifier}`, 'Book Name'),
			Checker.elementValue(`taDescription-${identifier}`, 'Book Description'),
			Genre[genre as keyof typeof Genre],
			Checker.elementValue(`urlPictureLocation-${identifier}`, 'Book Image Url'),
			Checker.elementValue(`tboxAuthor-${identifier}`, 'Book Author'),
			Number(pages)
		);
		return book;
	}
}